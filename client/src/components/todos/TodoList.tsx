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

  const completedTodos = data.filter((todo) => todo.completed).reverse();
  const incompletedTodos = data.filter((todo) => !todo.completed).reverse();

  return (
    <div className="flex-1 flex flex-col gap-3">
      <AnimatePresence>
        {/* Incomplete Todos Section */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {incompletedTodos.map(({ id, title, description, completed }) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 1, height: "auto" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <TodoItem
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  completed={completed}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Completed Todos Section */}
        {completedTodos.length > 0 && (
          <>
            <motion.h1
              className="font-bold text-2xl text-blue-900"
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Completed Tasks
            </motion.h1>

            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {completedTodos.map(({ id, title, description, completed }) => (
                  <motion.div
                    key={id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 },
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.5,
                      },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    <TodoItem
                      key={id}
                      id={id}
                      title={title}
                      description={description}
                      completed={completed}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
