import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

export function Header() {
  return (
    <div className=' border-b py-4 bg-gray-50'>
        <div className=' items-center container mx-auto justify-between flex'>
            SkyKeep
            <div className='flex gap-2'>
                <OrganizationSwitcher />
            <UserButton />
            </div>
            

        </div>
    </div>
  )
}

