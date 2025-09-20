'use client';

import React, { useActionState, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { createTodo } from '@/lib/actions/todo.actions';
import { toast } from "sonner"

const NewTodoForm = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [data, action, isPending] = useActionState(createTodo, {
        success: false,
        message: '',
        errors: {},
        data: {}
    });

    useEffect(() => {
        console.log("in useeffect");
        if (data.success) {
            toast.success(data.message);
        } else if (!data.success && data.message) {
            toast.error(data.message)
        }
    }, [data]);

    return (
        <form action={action} className="flex flex-col h-full gap-4">
            <div className='space-y-4'>
                <Label htmlFor="title">Feladat</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    // required
                    defaultValue={data?.data?.title || ''}
                    className={data?.errors?.title ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.title && (
                <div className='text-destructive'>{data.errors.title}</div>
            )}
            <div className='space-y-4'>
                <Label htmlFor="description">Leírás</Label>
                <Textarea
                    id="description"
                    name="description"
                    type="text"
                    defaultValue={data?.data?.description || ''}
                    className={data?.errors?.description ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.description && (
                <div className='text-destructive'>{data.errors.description}</div>
            )}
            <div className="space-y-4">
                <Label htmlFor="category">Kategória</Label>
                <Select
                    name="category"
                    defaultValue={data?.data?.category || 'work'}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Válassz kategóriát" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="personal">személyes</SelectItem>
                        <SelectItem value="work">munka</SelectItem>
                    </SelectContent>
                </Select>
                {data?.errors?.category && (
                    <p className="text-sm text-destructive">{data.errors.category}</p>
                )}
            </div>
            <div className="space-y-4">
                <Label htmlFor="deadline">Határidő</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                            )}
                        >
                            {selectedDate ? format(selectedDate, "yyyy.MM.dd") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </PopoverContent>
                </Popover>
                <input
                    type="hidden"
                    name="deadline"
                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ""}
                />
            </div>
            {data && !data.success && data?.message && (
                <p className="text-sm text-destructive">{data.message}</p>
            )}
            <div className='mt-auto w-full flex gap-4'>
                <Button disabled={isPending} variant='default' type="submit">
                    {isPending ? 'Létrehozás...' : 'Létrehozás'}
                </Button>
            </div>
        </form>
    )
}

export default NewTodoForm

// title: str = Field(..., min_length = 3)
// description: Optional[str] = Field(default=None, min_length = 3)
// category: Optional[Category] = None
// deadline: datetime