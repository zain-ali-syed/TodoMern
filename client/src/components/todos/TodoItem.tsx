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
import { completeTodo } from "@/api/todos/mutations";
import { type Todo } from "@/api/todos/types";

const TodoItem = ({ id, title, description, completed }: Todo) => {
  //   const [isCompleted, setIsCompleted] = useState(completed);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => completeTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (err) => console.log("some error ", err.message),
  });

  const handleToggle = () => {
    mutateAsync();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Trash size={16} strokeWidth={1.75} />
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
