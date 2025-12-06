type Todo = {
  title: string;
  description: string;
};

export const addTodo = async (todo: Todo) => {
  const response = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(todo),
  });

  const data = await response.json();

  // Also If backend catches an error and sends 500, response.ok will be false
  // because 500 is not in the 200-299 range
  if (!response.ok) {
    // Use the custom message from backend or fallback to status text
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const completeTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/todos/${id}/complete`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies in the request
  });
  if (!response.ok) throw new Error("Error completing todo");
  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies in the request
  });
  if (!response.ok) throw new Error("Error deleting todo");
  return response.json();
};
