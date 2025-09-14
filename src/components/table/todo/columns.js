"use client"

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"

export const columns = [
    {
        accessorKey: "title",
        header: "Feladat",
    },
    {
        accessorKey: "description",
        header: "Leírás",
        cell: ({ row }) => {
            const description = row.getValue("description");
            const truncated =
                description && description.length > 25
                    ? description.substring(0, 25) + "..."
                    : description;

            return <div className="text-left">{truncated}</div>;
        }
    },
    {
        accessorKey: "deadline",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Határidő
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const rawDate = row.getValue("deadline");
            const date = new Date(rawDate);
            const formatted = date.toLocaleDateString("hu-HU")

            return <div className="text-left">{formatted}</div>;
        }
    },
    {
        accessorKey: "category",
        header: "Kategória",
        cell: ({ row }) => {
            const category = row.getValue("category");

            const categoryEnum = {
                work: "munka",
                personal: "személyes",
            };


            return <div className="text-left">{categoryEnum[category] ?? category}</div>;
        }
    },
    {
        accessorKey: "status",
        header: "Státusz",
        cell: ({ row }) => {
            const status = row.getValue("status");

            const statusEnum = {
                backlog: "feldolgozásra vár",
                progress: "folyamatban",
                done: "kész",
            };


            return <div className="text-left">{statusEnum[status] ?? status}</div>;
        }
    },
]