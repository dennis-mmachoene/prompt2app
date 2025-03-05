import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'

const Header = () => {
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src={'/logo.webp'} alt='Logo' height={40} width={40}/>
        <div className='flex gap-5'>
            <Button variant='ghost'>Log In</Button>
            <Button className="text-white" style={{backgroundColor: Colors.BLUE}}>Get Started</Button>
        </div>
    </div>
  )
}

export default Header