import MakeButton from "@/components/shadcn-studio/table/make-button"
import ManageAdminsTable from "@/components/shadcn-studio/table/manage-admins-table"
import { UserStar, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import $axios from "@/api/accessor"
import { $api } from "@/api/api"
import { API } from "@/api/endpoints"
import { CircleLoader, ClockLoader } from "react-spinners"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

function ManageAdminsPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [makingUsername, setMakingUsername] = useState(null);
    const [refreshAdmins, setRefreshAdmins] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoadingUsers(true);
            const res = await $axios.get($api(API['all-users']));

            if (res.data?.data) {
                const mapped = res.data.data.map(u => ({
                    username: u.realUsername,
                    email: u.email || "—",
                    avatar: u.profilePhotoUrl?.startsWith("http") ? u.profilePhotoUrl : "",
                    fallback: u.realUsername?.[0]?.toUpperCase() || "U"
                }));
                setUsers(mapped);
                setFiltered(mapped);
            }
        } catch (err) {
            toast.error("Failed to load users");
            console.log(err);

        } finally {
            setLoadingUsers(false);
        }
    };

    const handleMakeAdmin = async (username) => {
        try {
            setMakingUsername(username);
            const res = await $axios.put($api(API["make-admin"]), null, { params: { username } });
            if (res.data?.success) {
                toast.success("User is now admin");
                setRefreshAdmins(prev => !prev);
                fetchUsers();
                setDialogOpen(false);
            }
            else {
                toast.error(res.data?.message || "Failed to update role");
            }
        } catch (err) {
            toast.error("Server error");
            console.log(err);
        } finally {
            setMakingUsername(null);
        }
    };

    useEffect(() => {
        if (dialogOpen) fetchUsers();
    }, [dialogOpen]);

    useEffect(() => {
        if (!search.trim()) {
            setFiltered(users);
        } else {
            const s = search.toLowerCase();
            setFiltered(
                users.filter(u =>
                    u.username.toLowerCase().startsWith(s) ||
                    u.email.toLowerCase().startsWith(s)
                )
            );
        }
    }, [search, users]);

    return (
        <div className='p-[20px_30px] absolute w-full top-[15px] flex flex-col gap-5 items-end'>
            <div className="mr-5">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <MakeButton />
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-lg'>
                        <DialogHeader className='text-center'>
                            <DialogTitle className='text-xl'>Make New Admin</DialogTitle>
                        </DialogHeader>
                        <div className="w-full space-y-2 mb-2">
                            <div className="relative">
                                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search-input"
                                    placeholder="Search by username or email.."
                                    className="bg-background pl-9"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        {loadingUsers ? (
                            <div className="flex justify-center py-10">
                                <ClockLoader color="#fff" size={60} />
                            </div>
                        ) : (
                            <ScrollArea data-lenis-prevent className='max-h-[50vh] w-full'>
                                <ul className='space-y-4'>
                                    {filtered.map((user, index) => (
                                        <li key={index} className='flex items-center justify-between gap-3'>
                                            <div className='flex items-center gap-3'>
                                                <Avatar className='size-10'>
                                                    <AvatarImage src={user.avatar} alt={user.username} />
                                                    <AvatarFallback className='text-xs'>{user.fallback}</AvatarFallback>
                                                </Avatar>
                                                <div className='flex flex-col overflow-hidden'>
                                                    <span>{user.username}</span>
                                                    <span className='text-muted-foreground text-sm truncate'>
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button size='sm' className='bg-red-700 mr-3 text-white hover:bg-red-600 cursor-pointer'
                                                disabled={makingUsername === user.username}
                                                onClick={() => handleMakeAdmin(user.username)}
                                            >{makingUsername === user.username ? (
                                                <CircleLoader color="#fff" size={20} />
                                            ) : (<>
                                                <UserStar className="size-4" />
                                                Make Admin</>
                                            )}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <ManageAdminsTable refresh={refreshAdmins} />
        </div>
    );
}

export default ManageAdminsPage;