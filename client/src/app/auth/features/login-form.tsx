"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/use-login";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

const initialValues: LoginInput = { email: "", password: "" };

export function LoginForm() {
    const [values, setValues] = useState<LoginInput>(initialValues);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isPending, error } = useLogin();

    function handleChange<K extends keyof LoginInput>(field: K, value: LoginInput[K]) {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = loginSchema.safeParse(values);
        if (!result.success) {
            const fieldErrors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof LoginInput;
                fieldErrors[field] ??= issue.message;
            }
            setErrors(fieldErrors);
            return;
        }

        mutate(result.data);
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@email.com"
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="h-12 pl-10"
                    />
                </div>
                {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock
                        aria-hidden
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        value={values.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        className="h-12 pl-10 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden />
                        ) : (
                            <Eye className="h-4 w-4" aria-hidden />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p id="password-error" className="text-sm text-destructive">
                        {errors.password}
                    </p>
                )}
            </div>

            {error && (
                <p
                    role="alert"
                    className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                    {error.message}
                </p>
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="h-12 w-full bg-secondary text-base font-semibold text-secondary-foreground hover:bg-secondary/90"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                        Memproses...
                    </>
                ) : (
                    <>
                        Masuk ke Akun
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </>
                )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link href="/auth/register" className="font-semibold text-primary hover:underline">
                    Registrasi di sini
                </Link>
            </p>
        </form>
    );
}