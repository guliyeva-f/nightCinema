import AdminLayout from "@/layouts/admin.layout";
import AuthLayout from "@/layouts/auth.layout";
import GlobalLayout from "@/layouts/global.layout";
import MainLayout from "@/layouts/main.layout";
import AddAdminPage from "@/pages/admin/admins/add-admin.page";
import DeleteAdminPage from "@/pages/admin/admins/delete-lang.page";
import EditAdminPage from "@/pages/admin/admins/edit-lang.page";
import DashboardPage from "@/pages/admin/dashboard.page";
import AddLangPage from "@/pages/admin/languages/add-lang.page";
import DeleteLangPage from "@/pages/admin/languages/delete-lang.page";
import AddMoviePage from "@/pages/admin/movies/add-movie.page";
import EditDeleteMoviePage from "@/pages/admin/movies/edit-delete-movie.page";
import AddPhotoPage from "@/pages/admin/photos/add-photo.page";
import DeletePhotoPage from "@/pages/admin/photos/delete-photo.page";
import AddRoomPage from "@/pages/admin/rooms/add-room.page";
import DeleteRoomPage from "@/pages/admin/rooms/delete-room.page";
import AddSessionPage from "@/pages/admin/sessions/add-session.page";
import DeleteSessionPage from "@/pages/admin/sessions/delete-session.page";
import EditSessionPage from "@/pages/admin/sessions/edit-session.page";
import DeleteUserPage from "@/pages/admin/users/delete-user.page";
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

      <Route path="admin" element={<AdminLayout />}>

        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />

        <Route path="users">
          <Route index element={<Navigate to="delete-user" />} />
          {/* <Route path="add-user" element={<AddUserPage />} /> */}
          {/* <Route path="edit-user" element={<EditUserPage />} /> */}
          <Route path="delete-user" element={<DeleteUserPage />} />
        </Route>

        <Route path="movies">
          <Route index element={<Navigate to="add-movie" />} />
          <Route path="add-movie" element={<AddMoviePage />} />
          <Route path="edit-delete-movie" element={<EditDeleteMoviePage />} />
          {/* <Route path="delete-movie" element={<DeleteMoviePage />} /> */}
        </Route>

        <Route path="sessions">
          <Route index element={<Navigate to="add-session" />} />
          <Route path="add-session" element={<AddSessionPage />} />
          <Route path="edit-session" element={<EditSessionPage />} />
          <Route path="delete-session" element={<DeleteSessionPage />} />
        </Route>

        <Route path="admins">
          <Route index element={<Navigate to="add-admin" />} />
          <Route path="add-admin" element={<AddAdminPage />} />
          <Route path="edit-admin" element={<EditAdminPage />} />
          <Route path="delete-admin" element={<DeleteAdminPage />} />
        </Route>

        <Route path="rooms">
          <Route index element={<Navigate to="add-room" />} />
          <Route path="add-room" element={<AddRoomPage />} />
          <Route path="delete-room" element={<DeleteRoomPage />} />
        </Route>

        <Route path="photos">
          <Route index element={<Navigate to="add-photo" />} />
          <Route path="add-photo" element={<AddPhotoPage />} />
          <Route path="delete-photo" element={<DeletePhotoPage />} />
        </Route>

        <Route path="languages">
          <Route index element={<Navigate to="add-language" />} />
          <Route path="add-language" element={<AddLangPage />} />
          <Route path="delete-language" element={<DeleteLangPage />} />
        </Route>
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

    </Route>
  )
)