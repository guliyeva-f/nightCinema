import { useState } from 'react';
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AuthService } from '@/services/auth/auth.service';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function RegisterForm({ className, ...props }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast.error(t("Please fill all fields!"));
      return;
    }

    if (name.trim().length < 2) {
      toast(t("Name must be at least 2 letters!"), {
        icon: '⚠️'
      });
      return;
    }

    if (password.length < 8) {
      toast.error(t("Password must be at least 8 characters!"));
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error(t("Enter a valid email!"));
      return;
    }

   try {
      toast.loading(t("Registering..."), { id: "register" });
      const response = await AuthService.register({
        username: name,
        email,
        password,
        phoneNumber: phone,
      });

      toast.dismiss("register"); 

      if (response.success) {
        toast.success(t("Registration successful! Please log in."), { id: "register" });
        navigate("/auth/login");
      } else {
        const errorMsg = response?.errorMessage?.toLowerCase();

        if (errorMsg.includes("email")) {
          toast.error(t("This email is already taken."), { id: "register" });
        } else if (errorMsg.includes("username")) {
          toast.error(t("This username is already taken."), { id: "register" });
        } else if (errorMsg.includes("phone")) {
          toast.error(t("This phone number is already used."), { id: "register" });
        } else {
          toast.error(t("Registration failed!"), { id: "register" });
        }
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error(t("Server connection failed!"), { id: "register" });
    }
  };

  return (
    <form style={{ fontFamily: 'Outfit, sans-serif' }} onSubmit={handleRegister} className={cn("", className)} {...props}>
      <FieldGroup className={cn("gap-4", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("registerTitle")}</h1>
          <p className="text-muted-foreground text-sm text-balance w-full">
            {t("registerSubtitle")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">{t("username")}</FieldLabel>
          <Input id="name"
            type="text"
            placeholder="Fatima"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t("Email")}</FieldLabel>
          <Input id="email"
            type="email"
            placeholder={t("example@example.com")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">{t("phoneLabel")}</FieldLabel>
          <PhoneInput
            id="phone"
            defaultCountry="az"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            forceDialCode={true}
            inputStyle={{
              backgroundColor: "#141414",
              color: "#fafafa",
              border: "1px solid #383838",
              borderRadius: "0.5rem",
              padding: "0.25rem 0.75rem",
              height: "2.25rem",
              width: "90%",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("Password")}</FieldLabel>
          <Input id="password"
            type="password"
            placeholder={t("Enter your password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </Field>
        <Field>
          <Button type="submit" className={'cursor-pointer'}>{t("regButton")}</Button>
          <FieldDescription className="px-6 text-center">
            {t("alreadyHaveAccount")} <Link to="/auth/login">{t("signInText")}</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}