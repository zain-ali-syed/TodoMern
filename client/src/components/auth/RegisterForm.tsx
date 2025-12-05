import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationLoginSchema, type RegistrationLoginSchemaT } from "@/schemas/users";
import { registerUser, loginUser } from "@/api/users/mutations";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registrationLoginSchema), mode: "onBlur" });

  const [registrationForm, setRegistrationForm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (data: RegistrationLoginSchemaT) => {
    try {
      const response = registrationForm ? await registerUser(data) : await loginUser(data);

      if (response.success) {
        login(response.user);
        reset();
        navigate("/todos");
        toast.success(response.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      // This catches the error thrown by registerUser
      if (error instanceof Error) {
        console.log("Error from backend:", error.message); // You'll see your custom message here
        // Display error to user
        toast.error(error.message, {
          position: "top-center",
        });
      } else {
        console.log("Unknown error:", error);
      }
    }
  };
  return (
    <Card className="w-full max-w-sm bg-white border-0 self-center mx-auto">
      <CardHeader>
        <CardTitle>{registrationForm ? "Register an account" : "Login to your account"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="border-gray-200"
                {...register("email")}
              />
              {errors.email && <div className="text-red-800 text-sm">{errors.email.message}</div>}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                className="border-gray-200"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-red-800 text-sm">{errors.password.message}</div>
              )}
            </div>
            <div className="flex-col gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {registrationForm ? "Register" : "Login"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {registrationForm ? (
          <div>
            <p>Already have an account?</p>
            <a
              href="#"
              className="text-blue-800 font-bold"
              onClick={() => setRegistrationForm(false)}
            >
              Login here
            </a>
          </div>
        ) : (
          <div>
            <p>Don't have an account?</p>
            <a
              href="#"
              className="text-blue-800  font-bold"
              onClick={() => setRegistrationForm(true)}
            >
              {" "}
              Register here{" "}
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
