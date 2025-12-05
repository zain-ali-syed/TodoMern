import AddTodo from "@/components/todos/AddTodo";
import TodoList from "@/components/todos/TodoList";

const Todos = () => {
  return (
    <div className="flex gap-10 w-full p-4">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Todos;
