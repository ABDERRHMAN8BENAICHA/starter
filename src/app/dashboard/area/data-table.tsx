"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Link from "next/link";
import { MdBorderHorizontal, MdOutlinePostAdd } from "react-icons/md";
import Image from "next/image";
import { RiArrowUpDownFill, RiArrowUpDownLine } from "react-icons/ri";

export type Slide = {
    id: string;
    imgSrc: string;
    altText: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

interface DataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
}

export function DataTable<TData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div>
            <div dir="rtl">
                <Button variant="default">
                    <Link href={`./slides/create`} className='flex w-full justify-between items-center space-x-2'>
                        <div>
                            <h1>إضافة شريحة</h1>
                        </div>
                        <div>
                            <MdOutlinePostAdd className='w-6 h-6' />
                        </div>
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row justify-between items-center space-x-2 p-2">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="تصفية العنوان..."
                            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("title")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm w-[400px] md:w-[600px]"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                الأعمدة
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={table.getHeaderGroups()[0].headers.length} className="h-24 text-center">
                                        لم يتم العثور على نتائج
                                    </TableCell>
                                </TableRow>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    السابق
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    التالي
                </Button>
            </div>
        </div>
    );
}

export const slideColumns: ColumnDef<Slide>[] = [
    {
        accessorKey: "imgSrc",
        header: "الصورة",
        cell: ({ row }) => (
            <Image src={row.getValue("imgSrc")} alt={row.getValue("altText")} className="w-20 h-20 object-cover" />
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                العنوان
                <RiArrowUpDownFill className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "description",
        header: "الوصف",
    },
    {
        accessorKey: "dateandtime",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Date and Time
                <RiArrowUpDownLine className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const createdAt = new Date(row.getValue("dateandtime"))

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
                            <MdBorderHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(slide.id)}
                        >
                            نسخ معرف الشريحة
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`./slides/update/${slide.id}`}>تعديل</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            deleteSlide(slide.id)
                        }}>مسح</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export async function deleteSlide(slideId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides/${slideId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete slide');
        }

        console.log('Slide deleted successfully');

    } catch (error) {
        console.error('Error deleting slide:', error);
    }
}