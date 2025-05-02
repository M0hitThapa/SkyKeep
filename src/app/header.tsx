import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export function Header() {
  return (
    <div className=' border-b py-4 bg-gray-50'>
        <div className=' items-center container mx-auto justify-between flex'>
         <div className='flex items-center gap-2'>
         <Image src="/logo.svg" height={35} width={35} alt='logo' />
         <h1 className='text-xl font-semibold'>SkyKeep</h1>
         </div>
            <SignedIn>
            <div className='flex gap-2'>
                <OrganizationSwitcher />
            <UserButton />
            </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
            

        </div>
    </div>
  )
}

