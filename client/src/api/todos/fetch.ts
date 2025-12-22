import type { Todo } from "./types";

type TodoResponse = {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("http://localhost:5000/todos", {
    credentials: "include", // <-- THIS sends your cookie (JWT, session, etc.)
  });
  if (!response.ok) throw new Error("Failed to fetch todos");
  const data: TodoResponse[] = await response.json();
  // Transform MongoDB _id to id for frontend consistency
  return data.map((todo) => ({
    ...todo,
    id: todo._id || todo.id || "",
  })) as Todo[];
};
