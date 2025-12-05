import { fetchTodos } from "@/api/todos/fetch";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import TodoItem from "./TodoItem";
import type { Todo } from "@/api/todos/types";
import { motion, AnimatePresence } from "framer-motion";

const TodoList = () => {
  const { data, isPending, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isPending) {
    return <LoaderIcon />;
  }

  if (isError) {
    return <div>There has been some error</div>;
  }

  if (!data || data.length === 0) {
    return <div>No todos added as yet</div>;
  }

  const completedTodos = data.filter((todo) => todo.completed);
  const incompletedTodos = data.filter((todo) => !todo.completed);
  return (
    <div className="flex-1 flex flex-col gap-3">
      {incompletedTodos.map(({ id, title, description, completed }) => (
        <TodoItem key={id} id={id} title={title} description={description} completed={completed} />
      ))}
      <h1 className="font-bold text-2xl text-blue-900">Completed Tasks</h1>
      {completedTodos.map(({ id, title, description, completed }) => (
        <TodoItem key={id} id={id} title={title} description={description} completed={completed} />
      ))}
    </div>
  );
};

export default TodoList;
