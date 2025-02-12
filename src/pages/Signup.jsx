"use client";

import { useEffect, useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "../service/user.service";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../service/static/alert";
import { useSelector } from "react-redux";

export function Signup() {
  const token = useSelector((state) => state?.user?.token);
  const expiration = useSelector((state) => state?.user?.expiration);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Register Successful!", "success");
      navigate("/login");
    } else if (error) {
      console.log("Error: ", error);
      showAlert("Oops", error.data?.error || "An error occurred", "error");
      // showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showAlert("Oops", error || "Please fill in all fields", "error");
      return;
    }

    const data = { name, email, password };

    try {
      await rtkMutation(registerUser, data);
    } catch (err) {
      console.error(err);
      showAlert("Oops", "An error occurred", "error");
    }
  };

  if (token && expiration) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout title="Sign Up" description="Create an account to get started.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
