"use client";
import { Button, Input } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { LoginFormType } from "../schemas/login-schema";
import { redirect } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginForm } = useAuth();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginForm;

  const onSubmit = async (data: LoginFormType) => {
    try {
      await login(data.email, data.password);
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Bienvenido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <FormControl>
                        <Input
                          id="email-login"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          autoFocus
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Contraseña</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs hover:underline"
                        tabIndex={-1}
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <FormControl>
                        <Input
                          id="password-login"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent hover:border-transparent dark:hover:bg-transparent cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-2 mb-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-gray-500 dark:text-gray-400">
                    O continúa con
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <SiGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <SiFacebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href="/register"
                    className="hover:underline font-medium"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
