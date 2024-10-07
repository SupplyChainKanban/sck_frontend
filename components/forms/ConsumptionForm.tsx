"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"



const formSchema = z.object({
    materialID: z.string().min(2).max(20),
    materialUsed: z.string().min(2).max(50),
    usedQuantity: z.number().min(0),
    usageDate: z.string().min(2).max(20),
    // supplierName: z.string().min(2).max(50),
    // paymentMethod: z.string().min(2).max(50),
    costPerUnit: z.number().min(0),
    totalCost: z.number().min(0),
    unitOfMeasure: z.string().min(2).max(10),

})


export const ConsumptionForm = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            materialID: "ACABJANTVE",
            materialUsed: "ACAB- JANTAS VESTIR", // "materialUsed": "ACAB- JANTAS VESTIR",
            usedQuantity: 368.00, //"usedQuantity": 368.00, 
            usageDate: '08/10/2024', // "usageDate": "28/12/2023", 
            // supplierName: '',
            // paymentMethod: '',
            costPerUnit: 3.45,
            totalCost: 1269.60,
            unitOfMeasure: 'UNIDADES',
        },
    })


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const purchase = {
            dataSchemaVersion: 'v1',
            ingestedBy: '456e1234-e89b-12d3-a456-426614174001',
            priority: 'HIGH',
            dataSourceId: '239d98c3-97d4-4116-a91d-0c85c6d456f2',
            dataPayload: {
                ...values,
                materialCategory: values.materialUsed,
            }
        }

        try {

            const response = await fetch(`http://localhost:3000/api/sck-data-ingestion/raw-data`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchase),
            })
            const jsonResponse = await response.json();
            if (!response.ok) throw new Error('Error en el ingreso de un consumo')
            toast.success("Registro se creo correctamente!", {
                position: 'top-right',
                duration: 5000,
                description: `Se creó el registro ${jsonResponse.id}`
            })

        } catch (error) {
            toast.error("Registro no se creo correctamente!", {
                position: 'top-right',
                duration: 5000,
                description: `${error}`
            })
        }
    }


    return (
        <div className="p-4 border border-gray-800 rounded-md bg-gray-700 mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 text-black ">
                    {/* Id del material */}
                    <FormField
                        control={form.control}
                        name="materialID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Id del material</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Nombre del material */}
                    <FormField
                        control={form.control}
                        name="materialUsed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Nombre del material usado</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cantidad comprada*/}
                    <FormField
                        control={form.control}
                        name="usedQuantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Cantidad usada</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Fecha de compra*/}
                    <FormField
                        control={form.control}
                        name="usageDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Fecha de consumo</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Costo unitario */}
                    <FormField
                        control={form.control}
                        name="costPerUnit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Costo unitario</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Costo total */}
                    <FormField
                        control={form.control}
                        name="totalCost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Costo total</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Costo total */}
                    <FormField
                        control={form.control}
                        name="unitOfMeasure"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Unidad</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button type="submit">Aceptar</Button>
                </form>
            </Form>
        </div>
    )
}
