"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLoginUserMutation } from "../service/user.service";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../static/alert";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loginUser, { error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate("/dashboard");
    } else if (error) {
      showAlert("Oops", error || "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert("Oops", error || "Please fill in all fields", "error");
      return;
    }

    try {
      await rtkMutation(loginUser, { email, password });
    } catch (err) {
      showAlert("Oops", err || "An error occurred", "error");
    }
  };

  return (
    <AuthLayout
      title="Login"
      description="Welcome back! Please enter your details."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
