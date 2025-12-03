import { useEffect, useRef, useState } from 'react';
import $axios from '@/api/accessor';
import toast from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import "./button.css";
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';
import { CircleLoader, ClockLoader, FadeLoader } from "react-spinners";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { TooltipButtonDelete, TooltipButtonEdit } from '../button/tooltip-buttons';
import EditPermissionsForm from '@/components/edit-permissions'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, } from '@/components/ui/sheet'

const ManageAdminsTable = ({ refresh }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const formRef = useRef();
  const [savingPermissions, setSavingPermissions] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await $axios.get($api(API['all-admins']));

      if (res.data?.data) {
        const mappedAdmins = res.data.data.map((admin) => ({
          id: admin.id,
          username: admin.realUsername || "—",
          email: admin.email || "—",
          phoneNumber: admin.phoneE164 || "—",
          role: admin.role || "—",
          createdAt: new Date(admin.createdAt).toLocaleDateString(),
          profilePhotoUrl: admin.profilePhotoUrl?.startsWith('http') ? admin.profilePhotoUrl : "",
        }));

        setAdmins(mappedAdmins);
      } else {
        toast.error("Failed to fetch admins");
      }
    }
    catch (err) {
      console.error("Fetch admins error:", err);
      toast.error("Server error while fetching admins");
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (username) => {
    try {
      setDeletingId(username);

      const res = await $axios.put(
        $api(API["degrade-admin"]),
        {}, { params: { username } }
      );

      if (res.data?.success) {
        toast.success("Role changed successfully");
        fetchAdmins();
      } else {
        toast.error(res.data?.message || "Failed to change role");
      }
    }
    catch (err) {
      console.error("Role change error:", err);
      toast.error("Server error while changing role");
    }
    finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refresh]);

  useEffect(() => {
    if (!sheetOpen || !selectedAdmin) return;
    const fetchPermissions = async () => {
      try {
        setLoadingPermissions(true);

        const res = await $axios.get(
          $api(API["get-permissions"]),
          { params: { username: selectedAdmin } }
        );

        if (res.data?.data) {
          setPermissions(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load permissions");
        console.log(err);
      } finally {
        setLoadingPermissions(false);
      }
    };

    fetchPermissions();
  }, [sheetOpen, selectedAdmin]);

  const handleSavePermissions = async (updatedPermissions) => {
    try {
      setSavingPermissions(true);
      const res = await $axios.put(
        $api(API["change-permission"]),
        {
          username: selectedAdmin,
          permissions: updatedPermissions,
        }
      );
      if (res.data?.success) {
        toast.success("Permissions updated successfully");
        fetchAdmins();
        setSheetOpen(false);
      } else {
        toast.error("Failed to update permissions");
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setSavingPermissions(false);
    }
  };

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
                    <ClockLoader color="#fff" size={100} speedMultiplier={2} />
                  </div>
                </TableCell>
              </TableRow>
            ) : admins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">No admins found</TableCell>
              </TableRow>
            ) : (admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={admin.profilePhotoUrl || "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"} alt={admin.username} />
                      <AvatarFallback>{admin.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{admin.username}</div>
                  </div>
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phoneNumber}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>{admin.createdAt}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <TooltipButtonEdit
                    onClick={() => {
                      setSelectedAdmin(admin.username);
                      setSheetOpen(true);
                    }}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div>
                        {deletingId === admin.id ? (
                          <CircleLoader color="#fff" size={30} />
                        ) : (
                          <TooltipButtonDelete />
                        )}
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <div className="flex items-center gap-2">
                          <Trash2 className="size-5 text-destructive" />
                          <AlertDialogTitle>Remove Admin Role</AlertDialogTitle>
                        </div>
                        <AlertDialogDescription>
                          This action will remove admin privileges from this user and change their role to "User".
                          This change can be reverted later if needed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(admin.username)}
                          className="bg-red-700 cursor-pointer text-white hover:bg-red-700/90"
                        >Confirm Role Change
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>)))}
          </TableBody>
        </Table>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent>
            <ScrollArea data-lenis-prevent className='h-full'>
              <SheetHeader>
                <SheetTitle>Edit Admin Permissions</SheetTitle>
                <SheetDescription> Adjust the permissions for this admin account.</SheetDescription>
              </SheetHeader>
              <div className='px-5 mb-3'>
                {loadingPermissions ? (
                  <div className="flex justify-center py-10">
                    <FadeLoader color="#fff" />
                  </div>
                ) : (
                  <EditPermissionsForm
                    initial={permissions}
                    onSubmit={(updated) => handleSavePermissions(updated)}
                    formRef={formRef}
                  />
                )}
              </div>
              {!loadingPermissions && (
                <SheetFooter className="flex flex-row gap-2">
                  <SheetClose asChild>
                    <Button variant='outline' className={'w-1/2'}>Cancel</Button>
                  </SheetClose>
                  <Button className="w-1/2" onClick={() => formRef.current?.requestSubmit()} disabled={savingPermissions}>
                    {savingPermissions ? (
                      <CircleLoader size={20} />
                    ) : (
                      "Accept"
                    )}
                  </Button>
                </SheetFooter>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ManageAdminsTable;