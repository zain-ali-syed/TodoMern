import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "@/components/auth/RegisterForm";
import Layout from "@/components/Layout";
import AddTodo from "@/components/todos/AddTodo";
import Todos from "@/components/todos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<RegisterForm />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/add-todo" element={<AddTodo />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
