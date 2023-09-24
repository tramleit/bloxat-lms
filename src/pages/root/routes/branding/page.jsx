import * as z from "zod";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { BASE_URL } from "@/config/api-base-config";
import { toast } from "react-hot-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import jwt_decode from "jwt-decode";
import { Button } from "@/components/ui/button";
import SetupHeader from "../../_components/setup-header";
import ImageUpload from "@/components/ui/image-upload";
import Bottom from "../../_components/bottom";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/loading/loading";
import { LazyLoadImage } from "react-lazy-load-image-component";

const formSchema = z.object({
  // label: z.string().min(1),
  brand_logo_light: z.string().min(1),
  brand_logo_dark: z.string().min(1),
});

const Branding = () => {
  const navigate = useNavigate();

  // Get current user hook
  const currentUser = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [logoLightMode, setLogoLightMode] = useState(null);
  const [logoDarkMode, setLogoDarkMode] = useState(null);

  const initialData = {
    brand_name: currentUser?.brand_name,
    brand_slug: currentUser?.brand_slug,
    brand_logo_light: currentUser?.brand_logo_light,
    brand_logo_dark: currentUser?.brand_logo_dark,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      brand_name: "",
      brand_slug: "",
      brand_logo_light: "",
      brand_logo_dark: "",
    },
  });

  console.log("currently", currentUser?.user_id);

  const onSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log({
      brand_name: currentUser?.brand_name,
      brand_slug: currentUser?.brand_slug,
      brand_logo_light: logoLightMode,
      brand_logo_dark: logoDarkMode,
    });

    // validate
    if (!logoLightMode || !logoDarkMode) {
      toast.error("Please upload your logos, or skip for now");
      return;
    }

    // Ensure that a token exists before making the request
    if (token) {
      var decoded = jwt_decode(token);

      try {
        setLoading(true);

        const response = await axios.put(
          `${BASE_URL}/branding/${decoded.id}`,
          // Body
          {
            brand_name: currentUser?.brand_name,
            brand_slug: currentUser?.brand_slug,
            brand_logo_light: logoLightMode,
            brand_logo_dark: logoDarkMode,
            trial_end: currentUser?.trial_end,
          },
          // Headers
          {
            Authorization: `Bearer ${token}`,
          }
        );

        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);

        if (response.status === 200) {
          toast.success("Uploaded!");
          window.location.href = "/create-first-course";
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        toast.error("Something went wrong.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        {/* Header */}
        <SetupHeader />
        {/* End Header */}
        {/* Content */}
        <div className="flex flex-row items-center h-full overflow-y-clip">
          {/* Left Side */}
          <div className="flex flex-col flex-1 items-center justify-center h-full space-y-2 text-center">
            <h1 className="text-3xl font-bold">Upload your logo</h1>
            <p className="text-muted-foreground">
              Customize your Bloxat portal with your brand logo.
            </p>
            <div className="h-4"></div>
            {/* Brand Logo Uplaod*/}

            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row items-center justify-center space-x-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="brand_logo_light"
                  render={({ field }) => (
                    // Light Mode Logo
                    <FormItem>
                      <FormLabel>Logo (Light mode)</FormLabel>
                      <FormControl>
                        <ImageUpload
                          className="bg-white rounded-md"
                          value={field.value ? [field.value] : []}
                          disabled={loading}
                          // onChange={(url) => field.onChange(url)}
                          onChange={(url) => {
                            field.onChange(url);
                            setLogoLightMode(url);
                          }}
                          // onRemove={() => field.onChange("")}
                          onRemove={() => {
                            field.onChange("");
                            setLogoLightMode(null);
                          }}
                          folder={`/branding/${currentUser?.user_id}/logo-light`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator orientation="vertical" />

                <FormField
                  control={form.control}
                  name="brand_logo_dark"
                  render={({ field }) => (
                    // Light Mode Logo
                    <FormItem>
                      <FormLabel>Logo (Dark mode)</FormLabel>
                      <FormControl>
                        <ImageUpload
                          className="bg-black rounded-md"
                          value={field.value ? [field.value] : []}
                          disabled={loading}
                          // onChange={(url) => field.onChange(url)}
                          onChange={(url) => {
                            field.onChange(url);
                            setLogoDarkMode(url);
                          }}
                          // onRemove={() => field.onChange("")}
                          onRemove={() => {
                            field.onChange("");
                            setLogoDarkMode(null);
                          }}
                          folder={`/branding/${currentUser?.user_id}/logo-dark`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Button disabled={loading} className="ml-auto" type="submit">
                  Send
                </Button> */}
              </form>
            </Form>
          </div>

          {/* Right Side */}
          <div className="bg-[#fdfdfd] dark:bg-[#121212] flex flex-col flex-1 items-center justify-center h-full ">
            {/* bg-gray-50 */}

            {/* right [place graphic] */}
            <div className="flex items-center justify-center h-full">
              <LazyLoadImage
                className="object-cover h-full"
                src="https://media.publit.io/file/logo-setup-c.webp"
                effect="blur"
                placeholderSrc="https://media.publit.io/file/logo-setup-c.webp"
                draggable={false}
              />
            </div>
          </div>
        </div>
        {/* End Content */}
        {/* Bottom Part */}
        <Bottom
          onClick={() => {
            onSubmit();
          }}
          enableSkip={true}
          onSkip={() => {
            navigate("/create-first-course");
          }}
          disabled={loading}
        />
        {/* End Bottom */}
      </div>
    </>
  );
};

export default Branding;
