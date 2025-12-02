import { UserPen, UserMinus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const TooltipButtonEdit = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='rounded-xl cursor-pointer'
          onClick={onClick}
        >
          <UserPen />
          <span className='sr-only'>Edit Permissions</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='px-2 py-1 text-xs'>Edit Permissions</TooltipContent>
    </Tooltip>
  );
}

export const TooltipButtonDelete = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='rounded-xl cursor-pointer'
          onClick={onClick}
        >
          <UserMinus />
          <span className='sr-only'>Delete Admin</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className='px-2 py-1 text-xs'>Delete Admin</TooltipContent>
    </Tooltip>
  );
}