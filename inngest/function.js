import { inngest } from "./client";
import prisma from "@/lib/prisma";

// fonction inngest qui permet de savegarder les utilisateurs dans la base de donnee

export const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-create'},
    {event:"clerk/user-created"},
    async({event})=>{
       await prisma.user.create({
          data:{
            id: data.id,
            email: data.email_addresses[0].email_address,
            name:`${data.first_name} ${data.last_name}`,
            image: data.image_url
          }
       })
    }
)

// fonction inngest qui permet de mettre a jour les utilisateurs dans la base de donnee

export const syncUserUpdation = inngest.createFunction(
    {id:'sync-user-update'},
    {event:"clerk/user-created"},
    async({event})=>{
       await prisma.user.update({
          where:{id:data.id},
          data:{
            email: data.email_addresses[0].email_address,
            name:`${data.first_name} ${data.last_name}`,
            image: data.image_url
          }
       })
      }  
)
// fonction inngest por la suppressiondes utilisateurs 

export const syncUserDeletion = inngest.createFunction(
    {id:'sync-user-delete'},
    {event:"clerk/user-deleted"},
    async({event})=>{
       await prisma.user.delete({
          where:{
            id:data.id
          }
       })
      }  
