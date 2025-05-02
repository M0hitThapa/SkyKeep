'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {  useOrganization, useUser} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"




import { z } from "zod"
import { useState } from "react"

const formSchema = z.object({
title: z.string().min(1).max(200),
file: z.custom<FileList>((val) => val instanceof FileList, "Required")
.refine((files) => files.length > 0, "Required"),
})


export default function Home() {
const  organization= useOrganization();
const user = useUser()
const generatedUploadUrl = useMutation(api.files.generateUploadUrl)

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
 title: "",
 file: undefined,
  },
})

const fileRef = form.register("file");

async function onSubmit(values: z.infer<typeof formSchema>) {

  console.log(values)
  console.log(values.file);
  if (!orgId) return;



  const postUrl = await generatedUploadUrl();


  const result = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type":values.file[0].type },
    body: values.file[0],
  });

  const { storageId } = await result.json();

  try {
    await createFile({
      name:values.title,
      fileId: storageId,
      orgId,
    })

    form.reset();
    setIsFileDailogOpen(false)
  
    toast.custom((t) => (
      <div
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
        onClick={() => toast.dismiss(t)}
      >
        ✅ Success: Uploaded File
      </div>
    ));
  } catch (err) {
    console.log(err)
    toast.custom((t) => (
      <div
        className="bg-red-600 text-white px-4 py-2 rounded shadow"
        onClick={() => toast.dismiss(t)}
      >
        ❌ Error: Something went wrong!
      </div>
    ));
  }
 

 

}

let orgId:string | undefined = undefined;
if (organization.isLoaded && user.isLoaded) {
  orgId = organization.organization?.id ?? user.user?.id;
}

const [isFileDialogueOpen, setIsFileDailogOpen] = useState(false)
const createFile = useMutation(api.files.createFile)
const files = useQuery(api.files.getFile, orgId ? {orgId} : "skip");
  return (
   <main className="container mx-auto pt-12">
    <div className="flex justify-between items-center">
    <h1 className="">Your Files</h1>

    <Dialog open={isFileDialogueOpen} onOpenChange={(isOpen) => {setIsFileDailogOpen(isOpen)
      form.reset();
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => {
   
    }}>CLick Me</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your File Here</DialogTitle>
          <DialogDescription>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input  type="file" {...fileRef}  />
              </FormControl>
         
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>



    
    </div>
  

    {files?.map(file => {
      return <div key={file._id}>{file.name}</div>
    })}
    
   
  
   </main>
    
   
  );
}
