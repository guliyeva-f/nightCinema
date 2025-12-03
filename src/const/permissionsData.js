import { PERMISSION_KEYS } from "./permissionKeys"
import { UserStar, Languages, User, Clapperboard, TvMinimalPlay, Images, Settings2, } from "lucide-react"
export const PERMISSION_GROUPS = [
  {
    title: "Movies",
    icon: Clapperboard,
    items: [
      { key: PERMISSION_KEYS.ADD_MOVIE, label: "Add Movie" },
      { key: PERMISSION_KEYS.DELETE_MOVIE, label: "Delete Movie" },
      { key: PERMISSION_KEYS.UPDATE_MOVIE, label: "Update Movie" },
    ],
  },
  {
    title: "Admin",
    icon: UserStar,
    items: [
      { key: PERMISSION_KEYS.ADD_ADMIN, label: "Make Admin" },
      { key: PERMISSION_KEYS.DELETE_ADMIN, label: "Delete Admin" },
      // { key: PERMISSION_KEYS.UPDATE_ADMIN, label: "Update Admin" },
    ],
  },
  {
    title: "User",
    icon: User,
    items: [
      { key: PERMISSION_KEYS.DELETE_USER, label: "Delete User" },
    ],
  },
  {
    title: "Movie Sessions",
    icon: TvMinimalPlay,
    items: [
      { key: PERMISSION_KEYS.ADD_MOVIE_SESSION, label: "Add Movie Session" },
      { key: PERMISSION_KEYS.DELETE_MOVIE_SESSION, label: "Delete Movie Session" },
      { key: PERMISSION_KEYS.UPDATE_MOVIE_SESSION, label: "Update Movie Session" },
    ],
  },
  {
    title: "Rooms",
    icon: Settings2,
    items: [
      { key: PERMISSION_KEYS.ADD_ROOM, label: "Add Room" },
      { key: PERMISSION_KEYS.DELETE_ROOM, label: "Delete Room" },
    ],
  },
  {
    title: "Languages",
    icon: Languages,
    items: [
      { key: PERMISSION_KEYS.ADD_LANGUAGE, label: "Add Language" },
      { key: PERMISSION_KEYS.REMOVE_LANGUAGE, label: "Remove Language" },
    ],
  },
  {
    title: "Profile Photos",
    icon: Images,
    items: [
      { key: PERMISSION_KEYS.ADD_PROFILE_PHOTO_URL, label: "Add Profile Photo" },
      { key: PERMISSION_KEYS.REMOVE_PROFILE_PHOTO_URL, label: "Remove Profile Photo" },
    ],
  },
]