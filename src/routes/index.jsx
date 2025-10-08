import AuthLayout from "@/layouts/auth.layout";
import GlobalLayout from "@/layouts/global.layout";
import MainLayout from "@/layouts/main.layout";
import LoginPage from "@/pages/auth/login.page";
import RegisterPage from "@/pages/auth/register.page";
import ContactPage from "@/pages/main/contact.page";
import HomePage from "@/pages/main/home.page";
import MoviesPage from "@/pages/main/movies.page";
import ProfilePage from "@/pages/main/profile.page";
import TheatersPage from "@/pages/main/theaters.page";
import { createRoutesFromElements, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="theaters" element={<TheatersPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Route>
  )
);
