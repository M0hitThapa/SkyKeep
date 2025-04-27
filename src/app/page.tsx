'use client'

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/nextjs";


export default function Home() {


  return (
   <main className="flex min-h-screen flex-col items-center justify-center">
    <SignedIn>
    <SignOutButton><Button>Sign Out</Button></SignOutButton>
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal">
      <Button>Sign In</Button></SignInButton> 
    </SignedOut>
   
  
   </main>
    
   
  );
}
