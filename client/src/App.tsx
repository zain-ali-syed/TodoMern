import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AddTodo from "@/components/todos/AddTodo";
import Todos from "@/components/todos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import RegisterLoginForm from "@/components/auth/RegisterLoginForm";

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
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <RegisterLoginForm />
                  </PublicRoute>
                }
              />
              <Route
                path="/todos"
                element={
                  <ProtectedRoute>
                    <Todos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-todo"
                element={
                  <ProtectedRoute>
                    <AddTodo />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
