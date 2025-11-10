import { useEffect, useState } from 'react';
import $axios from '@/api/accessor';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import "./button.css";
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';
import { CircleLoader, ClockLoader } from "react-spinners";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

const DeleteUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await $axios.get($api(API['all-users']));
      console.log(res);

      if (res.data?.data) {
        const mappedUsers = res.data.data.map((user) => ({
          id: user.id,
          username: user.realUsername || "—",
          email: user.email || "—",
          phoneNumber: user.phoneNumber || "—",
          role: user.role || "USER",
          createdAt: new Date(user.createdAt).toLocaleDateString(),
          profilePhotoUrl: user.profilePhotoUrl?.startsWith('http') ? user.profilePhotoUrl : "",
        }));

        setUsers(mappedUsers);
        console.log(mappedUsers);
      } else {
        toast.error("Failed to fetch users");
      }
    }
    catch (err) {
      console.error("Fetch users error:", err);
      toast.error("Server error while fetching users");
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await $axios.delete($api(`${API['delete-user']}/${id}`));
      console.log(res);
      
      if (res.data?.success) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        toast.error(res.data?.message || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error("Server error while deleting user");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent py-5">
              <TableHead className={'font-bold'}>Name</TableHead>
              <TableHead className={'font-bold'}>Email</TableHead>
              <TableHead className={'font-bold'}>Phone Number</TableHead>
              <TableHead className={'font-bold'}>Role</TableHead>
              <TableHead className={'font-bold'}>Created At</TableHead>
              <TableHead className="text-center font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className={'flex justify-center py-20'}>
                    <ClockLoader
                      color="#fff"
                      size={100}
                      speedMultiplier={2}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            user.profilePhotoUrl ||
                            "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                          }
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.username}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="flex justify-center">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="button"
                          disabled={deletingId === user.id}
                        >
                          {deletingId === user.id ? (
                            <CircleLoader color="#fff" size={30} />
                          ) : (
                            <svg viewBox="0 0 448 512" className="svgIcon">
                              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                            </svg>
                          )}
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="flex items-center gap-2">
                            <Trash2 className="size-5 text-destructive" />
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                          </div>
                          <AlertDialogDescription>
                            This will permanently delete the user and all associated information.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className={'cursor-pointer'}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-700 cursor-pointer text-white hover:bg-red-700/90"
                          >Delete User
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeleteUserTable;
