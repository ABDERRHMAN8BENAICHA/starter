"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar1Icon, LucideSend } from 'lucide-react';
// import { useRouter } from 'next/navigation';

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, getDay } from "date-fns"
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AddBus({ }) {
    const [loading, setLoading] = useState<boolean>(false);
    // const { push } = useRouter();
    const [date, setDate] = useState<Date>()
    const route = useRouter();
    const FormSchema = z.object({
        name: z
            .string()
            .min(3, {
                message: "الاسم يجب أن يتكون من 3 أحرف على الأقل."
            })
            .max(250, {
                message: "الاسم يجب ألا يتجاوز 250 حرفًا."
            }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    });
    function getDateObject(date: Date, area: string) {
        
        const dayIndex = getDay(date);
        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        const day = days[dayIndex];
        
        const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
    
        return {
            timestamp,
            area,
            day,
        };
    }
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(getDateObject(date,data.name));
        setLoading(false)

        ///https://0849-154-245-173-235.ngrok-free.app/api/getBysData/api/get/x/x/x
        // setLoading(true);
        try {
            const res = await fetch(`https://0849-154-245-173-235.ngrok-free.app/api/get/${getDateObject(date,data.name).timestamp}/${getDateObject(date,data.name).area}/${getDateObject(date,data.name).day}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const newData = await res.json();
            console.log(newData);
            route.push("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='container flex justify-center items-center w-full p-4' dir="rtl">
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-center'>Add </CardTitle>
                </CardHeader>
                <div className="px-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Area</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Area"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <Calendar1Icon />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <CardFooter>
                                <Button disabled={loading} type='submit' className='flex justify-center items-center space-x-2 w-full'>
                                    <h1>إرسال</h1>
                                    <LucideSend className='w-5 h-5' />
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </div>
            </Card>
        </div>
    );
};