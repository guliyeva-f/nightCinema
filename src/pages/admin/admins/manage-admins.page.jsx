import MakeButton from "@/components/shadcn-studio/table/make-button"
import ManageAdminsTable from "@/components/shadcn-studio/table/manage-admins-table"
import { UserPlusIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const admins = [{ src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png', fallback: 'CP', name: 'Cristofer Press', mail: 'cristoferpress@gmail.com' }, { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png', fallback: 'Ck', name: 'Carla Korsgaard', mail: 'carlakorsgaard@gmail.com' }, { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png', fallback: 'HB', name: 'Hanna Baptista', mail: 'hannabaptista@gmail.com' }, { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png', fallback: 'ZD', name: 'Zord Dorwart', mail: 'zorddorwart@gmail.com' }, { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png', fallback: 'CB', name: 'Corey Bergson', mail: 'coreybergson@gmail.com' }, { src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png', fallback: 'JL', name: 'James Lubin', mail: 'jameslubin@gmail.com' }]

function ManageAdminsPage() {
    return (
        <>
            <div className="absolute top-8 right-15">
                <Dialog>
                    <DialogTrigger asChild>
                        <MakeButton />
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-lg'>
                        <DialogHeader className='text-center'>
                            <DialogTitle className='text-xl'>Make New Admin</DialogTitle>
                        </DialogHeader>
                        <p className='mt-2'>Current Admins</p>
                        <ul className='space-y-4'>
                            {admins.map((item, index) => (
                                <li key={index} className='flex items-center justify-between gap-3'>
                                    <div className='flex items-center gap-3 max-[420px]:w-50'>
                                        <Avatar className='size-10'>
                                            <AvatarImage src={item.src} alt={item.name} />
                                            <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-1 flex-col overflow-hidden'>
                                            <span>{item.name}</span>
                                            <span className='text-muted-foreground truncate text-sm'>{item.mail}</span>
                                        </div>
                                    </div>
                                    <Button
                                        size='sm'
                                        className='bg-sky-600 text-white hover:bg-sky-600 focus-visible:ring-sky-600 dark:bg-sky-400 dark:hover:bg-sky-400 dark:focus-visible:ring-sky-400'>
                                        <UserPlusIcon />
                                        Make admin
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='p-[20px_30px]'>
                <ManageAdminsTable />
            </div>
        </>
    )
}

export default ManageAdminsPage