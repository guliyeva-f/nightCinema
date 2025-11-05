import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AuthService } from "@/services/auth/auth.service";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t("Enter a valid email!"));
      return;
    }

    if (password.length < 8) {
      toast.error(t("Password must be at least 8 characters!"));
      return;
    }

    try {
      toast.loading(t("Logging in..."), { id: "login" });

      const response = await AuthService.login({ email, password });
      console.log("Login response:", response);
      toast.dismiss("login");

      if (response.success) {
        toast.success(t("Login successful!"));
        navigate("/profile");
      }
      else {
        if (response.errorMessage) {
          switch (response.errorMessage.toLowerCase()) {
            case "email not found":
              toast.error(t("Email not found!"));
              break;
            case "password is incorrect":
              toast.error(t("Password is incorrect!"));
              break;
            case "bad request":
              toast.error(t("Invalid login data!"));
              break;
            default:
              toast.error(t("Login failed. Please try again."));
              break;
          }
        } else {
          toast.error(t("Login failed. Please try again."));
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("Server connection failed!"));
    }
    toast.dismiss("login");
  };

  return (
    <form style={{ fontFamily: 'Outfit, sans-serif' }} onSubmit={handleLogin} className={cn("", className)} {...props}  >
      <FieldGroup className={cn("gap-8", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("Welcome back!")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("Enter your email and password to log in")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">{t("Email")}</FieldLabel>
          <Input id="email" type="email" placeholder={t("example@example.com")} required value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("Password")}</FieldLabel>
          <Input id="password" type="password" placeholder={t("Enter your password")} required value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field>
          <Button type="submit" className={'cursor-pointer'}>{t("Log In")}</Button>
          <FieldDescription className="text-center">
            {t("Don't have an account?")}{" "}
            <Link to="/auth/register" className="underline underline-offset-4">
              {t("signUpText")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}