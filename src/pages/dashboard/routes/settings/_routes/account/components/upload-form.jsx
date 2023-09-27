import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import useUserStore from "@/store/user/user-store";
import AvatarUpload from "./avatar-upload-button";

const formSchema = z.object({
  // label: z.string().min(1),
  avatar_url: z.string().min(1),
});

const UploadForm = ({ currentUser }) => {
  // const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const userStore = useUserStore();

  const onAvatarUrlSave = (url) => {
    // Update the avatar_url property in the user store
    userStore.updateAvatarUrl(currentUser?.user_id, url);
    // console.log(currentUser?.user_id, url);
  };

  const initialData = {
    avatar_url: currentUser?.avatar_url,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      avatar_url: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form className="flex flex-row items-center space-x-5">
          <div className="flex flex-col items-start space-y-2">
            {/* // Avatar URL */}
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                // Light Mode Logo
                <FormItem>
                  <FormControl>
                    <>
                      <AvatarUpload
                        currentUser={currentUser}
                        value={field.value ? [field.value] : []}
                        //   disabled={loading}
                        // onChange={(url) => field.onChange(url)}
                        onChange={(url) => {
                          field.onChange(url);
                          setAvatarUrl(url);
                          onAvatarUrlSave(url); // Call the function to update the user store
                          toast.success("Uploaded");
                        }}
                        // onRemove={() => field.onChange("")}
                        onRemove={() => {
                          field.onChange("");
                          setAvatarUrl(null);
                        }}
                        onSave={() => {}}
                        folder={`/profile-pics/${currentUser?.user_id}`}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <span className="font-medium">
              {currentUser?.first_name} {currentUser?.last_name}
            </span> */}
        </form>
      </Form>
    </>
  );
};

export default UploadForm;
