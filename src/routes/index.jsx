import AuthLayout from "@/layouts/auth.layout";
import GlobalLayout from "@/layouts/global.layout";
import MainLayout from "@/layouts/main.layout";
import LoginPage from "@/pages/auth/login.page";
import RegisterPage from "@/pages/auth/register.page";
import ContactPage from "@/pages/main/contact.page";
import HomePage from "@/pages/main/home.page";
import ProfilePage from "@/pages/main/profile.page";
import PrAccount from "@/pages/main/profPages/prAccount";
import PrRewards from "@/pages/main/profPages/prRewards";
import PrTickets from "@/pages/main/profPages/prTickets";
import TheatersPage from "@/pages/main/theaters.page";
import { createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="theaters" element={<TheatersPage />} />

        <Route path="profile" element={<ProfilePage />} >
          <Route index element={<Navigate to="moviesTickets" />} />
          <Route path="moviesTickets" element={<PrTickets />} />
          <Route path="settingsAccount" element={<PrAccount />} />
          <Route path="badgeRewards" element={<PrRewards />} />
        </Route>

      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Route>
  )
);
