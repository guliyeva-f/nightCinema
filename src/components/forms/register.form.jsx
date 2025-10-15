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

export function RegisterForm({ className, ...props }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast.error("Bütün xanaları doldur!");
      return;
    }

    if (name.trim().length < 3) {
      toast('Ad minimum 3 hərf olmalıdı!', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Şifrə minimum 8 simvol olmalıdı!"); return;
    }
    
    if (!emailRegex.test(email)) {
      toast.error("Düzgün email daxil et!");
      return;
    }

    try {
      const response = await AuthService.register(
        {
          username: name,
          email,
          password,
          phoneNumber: phone,
        });

      console.log("Register response:", response);

      if (response.success) {
        // toast.success("Uğurla qeydiyyatdan keçdiniz!");
        navigate("/auth/login");
      }
    }
    catch (error) {
      console.error("Register error:", error);
      // toast.error("Serverlə əlaqə qurulmadı!");
    }
  };

  return (
    <form onSubmit={handleRegister} className={cn("", className)} {...props}>
      <FieldGroup className={cn("gap-4", className)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Username</FieldLabel>
          <Input id="name"
            type="text"
            placeholder="Fatimə"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email"
            type="email"
            placeholder="guliyeffa2l@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/auth/login">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}