import AuthLayout from "@/layouts/auth.layout";
import GlobalLayout from "@/layouts/global.layout";
import MainLayout from "@/layouts/main.layout";
import ContactPage from "@/pages/contact.pages";
import HomePage from "@/pages/home.page";
import MoviesPage from "@/pages/movie.page";
import ProfilePage from "@/pages/profile.page";
import { createRoutesFromElements, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<GlobalLayout />}>
      <Route element={<MainLayout />}>
        <Route   index element={<HomePage />}/>
        <Route  path="contact" element={<ContactPage />}/>
        <Route  path="movies" element={<MoviesPage />}/>
        <Route  path="profile" element={<ProfilePage />}/>
      </Route>
      <Route path="/auth" element={<AuthLayout />}></Route>
    </Route>
  )
);
