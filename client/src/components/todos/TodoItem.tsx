import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeTodo, deleteTodo } from "@/api/todos/mutations";
import { type Todo } from "@/api/todos/types";
import { toast } from "sonner";

const TodoItem = ({ id, title, description, completed }: Todo) => {
  const queryClient = useQueryClient();

  const completeFn = useMutation({
    mutationFn: () => completeTodo(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(data.message, {
        position: "top-center",
      });
    },
    onError: (err) => console.log("some error ", err.message),
  });

  const deleteFn = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success(data.message, {
        position: "top-center",
      });
    },
    onError: (err) => console.log("some error ", err.message),
  });

  const handleToggle = () => {
    completeFn.mutateAsync();
  };

  const handleDelete = () => {
    deleteFn.mutateAsync();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Trash size={16} strokeWidth={1.75} onClick={handleDelete} className="cursor-pointer" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-3">
          <Checkbox
            id="todo"
            checked={completed}
            onCheckedChange={handleToggle}
            disabled={completed}
          />
          <Label htmlFor="todo">Mark Done</Label>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
