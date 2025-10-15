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

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await AuthService.login({
        email,
        password,
      });

      console.log("Login response:", response);

      if (response.success) {
        navigate("/profile");
      }
    }
    catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className={cn("", className)} {...props}>
      <FieldGroup className={cn("gap-8", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("welcomeMessage")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("loginPrompt")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
          <Input id="email" type="email" placeholder={t("emailPlaceholder")} required value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("passwordLabel")}</FieldLabel>
          <Input id="password" type="password" placeholder={t("passwordPlaceholder")} required value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field>
          <Button type="submit">{t("loginButton")}</Button>
          <FieldDescription className="text-center">
            {t("noAccountText")}{" "}
            <Link to="/auth/register" className="underline underline-offset-4">
              {t("signUpText")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}