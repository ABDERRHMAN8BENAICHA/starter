"use client"
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { redirect } from 'next/navigation';


export default function SignInViewPage() {
    const [password, setPassword] = useState<string>("")
    function login() {
        console.log(password)
        redirect("/dashboard")
    }
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/examples/authentication"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute right-4 top-4 hidden md:right-8 md:top-8'
                )}
            >
                Login
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-2xl  font-extrabold">
                SmartBus
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                    </blockquote>
                </div>
            </div>
            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password
                        </p>
                    </div>
                    <div className='w-full space-y-4'>
                        <Input type="password" placeholder="Password..." onChange={(e) => { setPassword(e.target.value) }} />
                        <Button type="submit" className="w-full" onClick={login}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}