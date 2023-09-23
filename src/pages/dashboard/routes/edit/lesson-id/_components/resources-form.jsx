/* eslint-disable react/prop-types */
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useController, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link, Loader2, Pencil, Plus } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { BASE_URL } from "@/config/api-base-config";
import { Icons } from "@/components/icons";
import Editor from "@/components/editor";
import ResourceTile from "./tiles/resource-tile";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import ResourceIcon from "./resource-icon";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { ResourceList } from "./resources-list";

const formSchema = z.object({
  resource_title: z.string().min(1, {
    message: "Title is required",
  }),
  resource_link: z.string().min(1, {
    message: "Link is required",
  }),
});

export const ResourcesForm = ({ initialData, lessonId }) => {
  const [isAdding, setIsAdding] = useState(false);

  const toggleAdd = () => setIsAdding((current) => !current);

  // const { courseContent, loading, fetchCourseContent } =
  //   useCourseContentStore();

  // state
  const [resourcesState, setResourcesState] = useState(initialData);
  // loading
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // for select resource type
  const [type, setType] = useState("pdf");
  const handleSelectChange = (value) => {
    // const { value } = event.target;
    setType(value); // Convert the string value to a boolean
  };

  const { isSubmitting, isValid } = form.formState;

  //   rehydrate our items
  useEffect(() => {
    setResourcesState(initialData);
  }, [initialData]);

  //   On submit create a resource
  const onSubmit = async (values) => {
    try {
      const token = JSON.parse(localStorage.getItem("bxAuthToken"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post(`${BASE_URL}/resources`, {
        lesson_id: lessonId,
        resource_order:
          resourcesState?.length != 0
            ? resourcesState[resourcesState.length - 1]?.resource_order + 1
            : 0,
        resource_type: type,
        resource_title: values.resource_title,
        resource_link: values.resource_link,
      });
      toast.success("Resource Added!");
      toggleAdd();
      // fetch the new data after success
      // setResourcesState(response.data);
      // Add the new resources to the resourceState
      setResourcesState((prevLessons) => [...prevLessons, response.data]);
      console.log("response.data", response.data);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Reorder resources
  // on reorder function -> reorder modules
  const onReorder = async (updateData) => {
    console.log("updateData", updateData);

    try {
      setIsUpdating(true);

      const token = JSON.parse(localStorage.getItem("bxAuthToken")); // Retrieve the token from local storage

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await axios.put(`${BASE_URL}/reorder/resources`, {
        list: updateData,
      });

      toast.success("Resources reordered");

      // update the state instead of fetching the data
      // setResourcesState(res.data);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  console.log("resourcesState", resourcesState);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        const { active, over } = e;

        if (active.id !== over?.id) {
          setResourcesState((items) => {
            const activeIndex = items.findIndex(
              (item) => item.id === active.id
            );
            const overIndex = items.findIndex((item) => item.id === over?.id);

            const updatedResources = arrayMove(items, activeIndex, overIndex);
            onReorder(
              updatedResources.map((resource, index) => ({
                id: resource.id,
                resource_order: index,
              }))
            );

            return updatedResources;
          });
        }
      }}
    >
      <div className="relative mt-6 border bg-slate-100 dark:bg-[#1a1a1a] rounded-md p-4">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        )}
        <div className="font-medium flex items-center justify-between">
          Add resources
          <Button onClick={toggleAdd} variant="ghost">
            {!isAdding && (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </>
            )}

            {isAdding && <>Cancel</>}
          </Button>
        </div>
        {!isAdding && !resourcesState?.length && (
          <p className="text-muted-foreground italic">No resources</p>
        )}
        {!isAdding && (
          <>
            {/* Fetch resources */}
            <div className="flex flex-col space-y-2 mt-2">
              <ResourceList resources={resourcesState} />
            </div>
          </>
        )}
        {isAdding && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <div className="flex flex-row items-center space-x-3">
                {/* TITLE */}
                <FormField
                  control={form.control}
                  name="resource_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* Resource title */}
                        <div className="grid gap-0 w-full">
                          <Label htmlFor="resource_title" className="mb-1">
                            Title
                          </Label>
                          <Input
                            id="resource_title"
                            disabled={isSubmitting}
                            placeholder="eg: Worksheet"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* LINK */}
                <FormField
                  control={form.control}
                  name="resource_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* Resource title */}
                        <div className="grid gap-0 w-full">
                          <Label htmlFor="resource_link" className="mb-1">
                            Link
                          </Label>
                          <Input
                            id="resource_link"
                            disabled={isSubmitting}
                            placeholder="https://drive.google.com/file"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* TYPE */}
                {/* Select Input */}
                <div className="grid gap-0 w-full">
                  <Label htmlFor="resource_type" className="mb-1">
                    Resource Type
                  </Label>
                  <Select
                    id="resource_type"
                    defaultValue={type} // Convert the boolean to a string for the select value
                    value={type}
                    onValueChange={handleSelectChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="resource_type" className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        <ResourceIcon
                          icon={
                            <span className="text-white font-medium text-[10px]">
                              PDF
                            </span>
                          }
                          color={"bg-red"}
                          label={"PDF File"}
                        />
                      </SelectItem>
                      <SelectItem value="xls">
                        <ResourceIcon
                          icon={
                            <span className="text-white font-medium text-[10px]">
                              XLS
                            </span>
                          }
                          color={"bg-green"}
                          label={"Excel File"}
                        />
                      </SelectItem>
                      <SelectItem value="link">
                        <ResourceIcon
                          icon={
                            <span className="text-white font-medium text-[10px]">
                              <Link className="w-4 h-4" />
                            </span>
                          }
                          color={"bg-blue-500"}
                          label={"Link"}
                        />{" "}
                      </SelectItem>
                    </SelectContent>
                    {/* Add more options as needed */}
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  {isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </DndContext>
  );
};
