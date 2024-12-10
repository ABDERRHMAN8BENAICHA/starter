"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiMapPinAreaFill } from "react-icons/pi"

export type Slide = {
    id: string
    imgSrc: string
    altText: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
}

export const slideColumns: ColumnDef<Slide>[] = [
    {
        accessorKey: "area",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                area
                <PiMapPinAreaFill className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "dayOfWeek",
        header: "Day of Week",
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                تاريخ الانشاء
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const createdAt = new Date(row.getValue("date"))

            const day = createdAt.getDate()
            const month = createdAt.toLocaleString("en-US", { month: "short" })
            const year = createdAt.getFullYear()
            const time = createdAt.toLocaleTimeString("en-US")

            const formattedDate = `${day}, ${month}, ${year}, ${time}`

            return <div className="text-right font-medium m-4" dir="rtl">{formattedDate}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const slide = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>opiration</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(slide.id)}
                        >
                            copy
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            test
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
