
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel"
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,

    

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreVertical, TrashIcon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  
  } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import {toast} from "sonner"
  
  

function FileCardActions({file}: {file: Doc<"files"> }) {
    const deleteFile = useMutation(api.files.deleteFile);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
return (
    <>
    <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={async() => {
        await deleteFile({fileId:file._id});
         toast.custom((t) => (
              <div
                className="bg-[#9b2c2c] text-white px-8 py-4 rounded shadow"
                onClick={() => toast.dismiss(t)}
              >
                ❌ Delete: File Deleted Successfully!
              </div>
            ));
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    <DropdownMenu>
  <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
  <DropdownMenuContent className=" ">
    <DropdownMenuItem onClick={() => setIsConfirmOpen(true)} className="flex text-red-600 gap-2 items-center justify-center cursor-pointer">
        <TrashIcon size={16} /> Delete
        </DropdownMenuItem>
    
  
  </DropdownMenuContent>
</DropdownMenu>
</>
)
}


export function FileCard({file}: {file: Doc<"files">}) {
    return (
<Card>
  <CardHeader className="relative">
    <CardTitle>{file.name} <div className="absolute top-1 right-1 ">
    <FileCardActions file={file} />
        </div></CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
  
    <Button>Download</Button>
  </CardFooter>
</Card>

    )
}