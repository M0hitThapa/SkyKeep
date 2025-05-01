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



import { z } from "zod"

const formSchema = z.object({
title: z.string().min(1).max(200),
file: z.custom<FileList>((val) => val instanceof FileList, "Required")
.refine((files) => files.length > 0, "Required"),
})


export default function Home() {
const  organization= useOrganization();
const user = useUser()

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
 title: "",
 file: undefined,
  },
})

const fileRef = form.register("file");

function onSubmit(values: z.infer<typeof formSchema>) {

  console.log(values)
}

let orgId:string | undefined = undefined;
if (organization.isLoaded && user.isLoaded) {
  orgId = organization.organization?.id ?? user.user?.id;
}
const createFile = useMutation(api.files.createFile)
const files = useQuery(api.files.getFile, orgId ? {orgId} : "skip");
  return (
   <main className="container mx-auto pt-12">
    <div className="flex justify-between items-center">
    <h1 className="">Your Files</h1>

    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => {
      if(!orgId) return;
      createFile({
        name:"Hello World",
        orgId,
      })
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
