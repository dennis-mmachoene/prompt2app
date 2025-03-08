import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const SideBarFooter = () => {
    const options = [
        {
            name: 'Setting',
            icon: Settings
        },
        {
            name: 'Help Center',
            icon: HelpCircle
        },
        {
            name: 'My Subscription',
            icon: Wallet
        },
        {
            name: 'Sign Out',
            icon: LogOut
        },

    ]
  return (
    <div className='p-2 mb-10'>{
   options.map((option, index) => (
    <Button key={index} variant='ghost' className='flex my-3 justify-start w-full'>
        <option.icon/>
        {option.name}
    </Button>
   )) }</div>
  )
}

export default SideBarFooter