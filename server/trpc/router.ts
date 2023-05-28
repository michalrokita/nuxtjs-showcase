import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { PrismaClient } from '@prisma/client'

const contactSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
})

export const appRouter = router({
  getContacts: publicProcedure
    .input(
      z.object({
        lastName: z.string(),
      }).nullish()
    )
    .query(async ({ input }) => {
      const prisma = new PrismaClient()
      const withSearch = !!input?.lastName
      

      return prisma.contact.findMany({
        ...(withSearch ? { where: {
          lastName: {
            contains: input?.lastName,
            mode: 'insensitive'
          }
        }} : {}),
        orderBy: {
          id: 'desc'
        }
      })
    }),
  getContact: publicProcedure
    .input(z.number())
    .query(async ({ input: contactId }) => {
      const prisma = new PrismaClient()

      return prisma.contact.findUnique({
        where: {
          id: contactId,
        },
      })
    }),
  createContact: publicProcedure
    .input(contactSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      const prisma = new PrismaClient()

      return prisma.contact.create({
        data: input,
      })
    }),
  updateContact: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      const prisma = new PrismaClient()

      return prisma.contact.update({
        where: {
          id: input.id,
        },
        data: input,
      })
    }),
  removeContact: publicProcedure
  .input(z.number())
  .mutation(async ({ input: contactId }) => {
    const prisma = new PrismaClient()

    return prisma.contact.delete({
      where: {
        id: contactId,
      },
    })
  })
})

export type AppRouter = typeof appRouter
