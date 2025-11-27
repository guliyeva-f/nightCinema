import { UserMinus, UserPen, UserRoundPen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const TooltipButtonEdit = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-[8px] cursor-pointer'>
           <UserPen />
          <span className='sr-only'>Edit Permissions</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='px-2 py-1 text-xs'>Edit Permissions</TooltipContent>
    </Tooltip>
  );
}
export const TooltipButtonDelete = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-[8px] cursor-pointer'>
           <UserMinus />
          <span className='sr-only'>Delete Admin</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='px-2 py-1 text-xs'>Delete Admin</TooltipContent>
    </Tooltip>
  );
}