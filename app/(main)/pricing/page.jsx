'use client'
import PricingModel from '@/components/custom/PricingModel'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import React, { useContext, useState } from 'react'

const Pricing = () => {
const {userDetails, setUserDetails} = useContext(UserDetailsContext)
  return (
    <div className='mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
        <h2 className='font-bold text-5xl'>Pricing</h2>
        <p className='text-gray-400 max-w-xl text-center'>{Lookup.PRICING_DESC}</p>
        
        <div className='p-5 border rounded-xl flex w-full justify-between mt-7 items-center' style={{backgroundColor: Colors.BACKGROUND}}>
            <h2 className='text-lg'><span className='font-bold'>{userDetails?.token}</span> Tokens left</h2>
            <div className=''>
                <h2>Need more token? </h2>
                <p>Upgrade your plan below</p>
            </div>
        </div>
        <PricingModel />
    </div>
  )
}

export default Pricing