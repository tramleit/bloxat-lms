import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { BackButton } from "@/components/back-button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { useCurrentUser } from "@/hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BASE_URL } from "@/config/api-base-config";
import axios from "axios";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import { useNavigate, useParams } from "react-router-dom";
import { PORTAL_URL } from "@/config/url-config";

const formSchema = z.object({
  // label: z.string().min(1),
  brand_logo_light: z.string().min(1),
  brand_logo_dark: z.string().min(1),
});

const BrandingPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  // Get current user hook
  const currentUser = useCurrentUser();

  const [loading, setLoading] = useState(false);
  //   const [brandName, setBrandName] = useState(null);
  const [brandName, setBrandName] = useState(currentUser?.brand_name || "");
  const [logoLightMode, setLogoLightMode] = useState(
    currentUser?.brand_logo_light || ""
  );
  const [logoDarkMode, setLogoDarkMode] = useState(
    currentUser?.brand_logo_dark || ""
  );

  const initialData = {
    brand_name: currentUser?.brand_name,
    brand_slug: currentUser?.brand_slug,
    brand_logo_light: currentUser?.brand_logo_light,
    brand_logo_dark: currentUser?.brand_logo_dark,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      brand_name: brandName,
      brand_slug: currentUser?.brand_slug,
      brand_logo_light: logoLightMode,
      brand_logo_dark: logoDarkMode,
    },
  });

  //  UPDATE LOGOS
  const onSubmit = async () => {
    const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log({
      brand_name: currentUser?.brand_name,
      brand_slug: currentUser?.brand_slug,
      brand_logo_light: logoLightMode,
      brand_logo_dark: logoDarkMode,
    });

    // Ensure that a token exists before making the request
    if (token) {
      var decoded = jwt_decode(token);

      try {
        setLoading(true);

        const response = await axios.put(
          `${BASE_URL}/branding/${decoded.id}`,
          // Body
          {
            brand_name: brandName ? brandName : currentUser?.brand_name,
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
          window.location.reload();
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error) {
        toast.error("Name already exists. Try a new name!");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <BackButton
              onClick={() => {
                navigate(`/${course_id}/settings`);
              }}
            />

            <Heading title="Branding" description="Customize your portal." />
          </div>
          <Button
            // disabled={loading}
            variant="outline"
            className="space-x-2"
            onClick={() => {
              // Open portal of the brand in a new tab
              window.open(`${PORTAL_URL}/${currentUser?.brand_slug}`, "_blank");
            }}
          >
            <ExternalLink className="h-4 w-4" />
            <span>View</span>
          </Button>
        </div>
        <Separator />
        {/* Content */}
        <div className="flex flex-col space-y-8 w-full">
          <div className="grid gap-1">
            <Label htmlFor="brandName" className="mb-1">
              Your brand name
            </Label>
            <Input
              id="brandName"
              placeholder="Seif's School"
              type="name"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading}
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value);
              }}
            />
          </div>
          {/* Logo */}
          {/* Brand Logo Uplaod*/}
          <Card>
            <CardHeader className="text-sm font-semibold">Logo</CardHeader>
            <CardContent>
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
              {/* <Separator className="my-8" />
              <h3 className="text-sm font-semibold ">Preview</h3> */}
            </CardContent>
          </Card>

          <div className="ml-auto">
            <Button
              onClick={() => {
                onSubmit();
              }}
              disabled={loading}
            >
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
          </div>

          {/* <span>eh</span> */}
        </div>
      </div>
    </div>
  );
};

export default BrandingPage;
