"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { RegisterFormType } from "../schemas/register-schema";
import { SiFacebook, SiGoogle } from "@icons-pack/react-simple-icons";
import { redirect } from "next/navigation";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser, registerForm } = useAuth();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = registerForm;

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await registerUser(data.email, data.password);
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
            Crear cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...registerForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <FormControl>
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <FormControl>
                        <Input
                          id="password-register"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
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

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <FormControl>
                        <Input
                          id="confirm-password-register"
                          type={showConfirm ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:bg-transparent hover:border-transparent dark:hover:bg-transparent cursor-pointer"
                        tabIndex={-1}
                      >
                        {showConfirm ? (
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
                className="w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando cuenta..." : "Registrarse"}
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
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/login" className="hover:underline font-medium">
                    Inicia sesión
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
