"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "../service/user.service";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../service/static/alert";
import { useSelector } from "react-redux";

export function Login() {
  const token = useSelector((state) => state?.user?.token);
  const expiration = useSelector((state) => state?.user?.expiration);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loginUser, { error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"],
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate("/");
    } else if (error) {
      console.log("Error: ", error);
      // showAlert("Oops", error || "An error occurred", "error");
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert("Oops", error || "Please fill in all fields", "error");
      return;
    }

    const data = { email, password };

    try {
      await rtkMutation(loginUser, data);
    } catch (err) {
      console.error(err);
      showAlert("Oops", err?.data?.error || "An error occurred", "error");
    }
  };

  if (token && expiration) {
    return <Navigate to="/" />;
  }

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
