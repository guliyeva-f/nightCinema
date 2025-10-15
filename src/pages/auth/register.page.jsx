import { RegisterForm } from "@/components/forms/register.form"
import { GalleryVerticalEnd } from "lucide-react"
import { Link } from "react-router-dom"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex self-center flex-col gap-10">
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="App Logo"
              className="w-[165px] object-contain"
            />
          </Link>
        </div> 
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
     <div className="bg-muted relative hidden lg:block overflow-hidden">
        <img
          src="/img/hero.jpg"
          alt="Login background"
          className="absolute inset-0 size-full object-cover dark:brightness-[0.6] animated-hero"
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
      </div>
    </div>
  )
}
