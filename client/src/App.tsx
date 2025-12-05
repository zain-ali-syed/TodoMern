import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AddTodo from "@/components/todos/AddTodo";
import Todos from "@/components/todos";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import RegisterLoginForm from "@/components/auth/RegisterLoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route element={<PublicRoute />}>
                <Route path="/" element={<RegisterLoginForm />} />
              </Route>
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/todos" element={<Todos />} />
                <Route path="/add-todo" element={<AddTodo />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
