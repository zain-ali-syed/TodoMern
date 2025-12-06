import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, type todoSchemaT } from "@/schemas/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/api/todos/mutations";

const AddTodo = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(todoSchema), mode: "onBlur" });

  const { mutateAsync } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
    },
    onError: (err) => console.log("some error ", err.message),
  });

  const submitForm = async (data: todoSchemaT) => {
    await mutateAsync(data);
  };

  return (
    <Card className="min-w-[300px] self-start">
      <CardHeader>
        <CardTitle>Add Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Title"
                className="border-gray-200"
                {...register("title")}
              />
              {errors.title && <div className="text-red-800 text-sm">{errors.title.message}</div>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Description</Label>
              </div>
              <Textarea placeholder="Type your description here." {...register("description")} />
              {errors.description && (
                <div className="text-red-800 text-sm">{errors.description.message}</div>
              )}
            </div>
            <div className="flex-col gap-2">
              <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                Add Todo
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTodo;
