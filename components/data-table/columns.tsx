"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProcessedData = {
    id: string
    sourceType: string
    materialID: string
    materialCategory: string
    materialName: string
    processedQuantity: number
    processedDate: string
    costPerUnit: number
    totalCost: number
    unitOfMeasure: string
    createdAt: Date
}

export const columns: ColumnDef<ProcessedData>[] = [
    {
        accessorKey: "materialID",
        header: "Material ID",
    },
    {
        accessorKey: "materialName",
        header: "Material Name",
    },
    {
        accessorKey: "processedQuantity",
        header: "Cantidad",
    },
    {
        accessorKey: "unitOfMeasure",
        header: "Unidad",
    },
    {
        accessorKey: "costPerUnit",
        header: "Costo unitario",
    },
    {
        accessorKey: "totalCost",
        // header: "Costo total",
        header: () => <div className="text-center">Costo total</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalCost"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "processedDate",
        header: "Fecha de consumo",
    },
    {
        accessorKey: "createdAt",
        header: "Fecha de procesamiento",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-blue-950">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(payment.id)
                                toast.success("Registro editado!", {
                                    position: 'top-right',
                                    duration: 5000,
                                    description: `Edición realizada: ${new Date()}`
                                })
                            }
                            }                        >
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(payment.id)
                                toast.success("Registro eliminado!", {
                                    position: 'top-right',
                                    duration: 5000,
                                    description: `Eliminación realizada: ${new Date()}`
                                })
                            }
                            }
                        >
                            Eliminar
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
