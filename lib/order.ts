import { z } from "zod"

export const customerSchema = z.object({
  firstName: z.string().trim().min(2, "Le prénom est requis (min. 2 caractères)"),
  lastName: z.string().trim().min(2, "Le nom est requis (min. 2 caractères)"),
  address: z.string().trim().min(5, "L'adresse est requise (min. 5 caractères)"),
  phone: z
    .string()
    .trim()
    .min(9, "Le numéro de téléphone est requis")
    .regex(/^[\d\s+()-]+$/, "Numéro de téléphone invalide"),
})

export type CustomerInfo = z.infer<typeof customerSchema>

export const emptyCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
}
