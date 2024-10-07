"use client"

import { useState } from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { toast } from "sonner"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    selectItems: string[]
    form: React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    selectItems = [],
    form,
}: Readonly<DataTableProps<TData, TValue>>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [open, setOpen] = useState(false)


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },

    })

    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setOpen(true)
                        // toast.success("Registro creado!", {
                        //     position: 'top-right',
                        //     duration: 5000,
                        //     description: `Edición realizada: ${new Date()}`
                        // })
                    }
                    }
                >
                    Nuevo registro
                </Button>
                <Select
                    value={currentStatus}
                    onValueChange={(value) => {
                        if (value === 'all') {
                            table.getColumn('materialID')?.setFilterValue(undefined);
                            setCurrentStatus(value)
                            return;
                        }
                        setCurrentStatus(value)
                        table.getColumn('materialID')?.setFilterValue(value);
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a material ID" />
                    </SelectTrigger>
                    <SelectContent className="bg-blue-950">
                        <SelectGroup>
                            <SelectLabel>Id de material</SelectLabel>
                            <SelectItem value="all">Todos</SelectItem>
                            {
                                selectItems.map((item) => (
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Sheet open={open} onOpenChange={setOpen} >
                    {/* <SheetTrigger>Open</SheetTrigger> */}
                    <SheetContent className="bg-blue-950">
                        <SheetHeader>
                            <SheetTitle>Nueva entrada</SheetTitle>
                            <SheetDescription>
                                Se ingresan los datos para realizar una entrada manual
                            </SheetDescription>
                        </SheetHeader>
                        {form}
                    </SheetContent>
                </Sheet>

            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-blue-950 text-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-xs text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 py-4 mx-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div >
    )
}
