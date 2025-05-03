
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Doc,  } from "../../convex/_generated/dataModel"
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,

    

    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {  FileText, GanttChart, ImageIcon, MoreVertical, TrashIcon } from "lucide-react"

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
import { ReactNode, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import {toast} from "sonner"
import Image from "next/image"
  
  

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


  

  export function FileCard({ file }: { file: Doc<"files"> }) {
    const fileUrl = useQuery(api.files.getFileUrl, {
      fileId: file.fileId,
    });
  
    const typeIcons: Record<Doc<"files">["type"], ReactNode> = {
      image: <ImageIcon />,
      pdf: <FileText />,
      csv: <GanttChart />,
    };
  
    return (
      <Card>
        <CardHeader className="relative">
          <CardTitle className="flex gap-2">
            <div className="flex justify-center">{typeIcons[file.type]}</div>
            {file.name}
            <div className="absolute top-1 right-1">
              <FileCardActions file={file} />
            </div>
          </CardTitle>
        </CardHeader>
  
        <CardContent className="h-[200px] flex justify-center items-center">
          {file.type === "image" && fileUrl && (
            <Image alt={file.name} width={100} height={100} src={fileUrl} />
          )}
          {file.type === "csv" && <GanttChart className="w-20 h-20" />}
          {file.type === "pdf" && <FileText className="w-20 h-20" />}
        </CardContent>
  
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              if (fileUrl) {
                window.open(fileUrl, "_blank");
              }
            }}
            disabled={!fileUrl}
          >
            Download
          </Button>
        </CardFooter>
      </Card>
    );
  }