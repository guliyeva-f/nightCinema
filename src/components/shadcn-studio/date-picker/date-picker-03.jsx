'use client'

import { useState } from 'react'
import { CalendarIcon, ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const DatePickerWithIconDemo = ({ value, onChange }) => {
   const [open, setOpen] = useState(false)

  const formatISODate = (d) => {
    if (!d) return ''
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleSelect = (newDate) => {
    onChange?.(formatISODate(newDate))
    setOpen(false)
  }

  return (
    <div className='w-full mt-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className='w-full justify-between font-normal'>
            <span className='flex items-center'>
              <CalendarIcon className='mr-2 h-4 w-4' />
            {value ? formatISODate(new Date(value)) : 'Pick a date'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar mode='single'
           selected={value ? new Date(value) : null}
          onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerWithIconDemo