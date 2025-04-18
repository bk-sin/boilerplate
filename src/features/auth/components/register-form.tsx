"use client";
import React from "react";
import { useAuth } from "../hooks/useAuth";

export const RegisterForm: React.FC = () => {
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login("emilianogalegre3@gmail.com", "EmilianoGalegre1234");
  };
  return <button onClick={handleSubmit}>Submit</button>;
};
