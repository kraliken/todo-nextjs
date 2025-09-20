'use client'

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
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
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

import { columns } from "./columns"
import { useState } from "react"

const TodoTableBody = ({ data }) => {

    console.log(data);

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
    })

    const statusCol = table.getColumn("status")
    const statusValue = statusCol?.getFilterValue() ?? ""

    const categoryCol = table.getColumn("category")
    const categoryValue = categoryCol?.getFilterValue() ?? ""

    const statusOptions = [
        { value: "backlog", label: "feldolgozásra vár" },
        { value: "progress", label: "folyamatban" },
        { value: "done", label: "kész" },
    ]
    const categoryOptions = [
        { value: "work", label: "munka" },
        { value: "personal", label: "személyes" },
    ]

    return (
        <div className="space-y-4 pb-4">
            <div className="flex gap-4">
                <div className="flex gap-4 items-center">
                    <Select
                        value={statusValue || "all"}
                        onValueChange={(val) =>
                            statusCol?.setFilterValue(val === "all" ? undefined : val)
                        }
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Szűrés státusz szerint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Összes státusz</SelectItem>
                            {statusOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4 items-center">
                    <Select
                        value={categoryValue || "all"}
                        onValueChange={(val) =>
                            categoryCol?.setFilterValue(val === "all" ? undefined : val)
                        }
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Szűrés kategória szerint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Összes kategória</SelectItem>
                            {categoryOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nincs feladat.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TodoTableBody