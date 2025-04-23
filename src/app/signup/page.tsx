"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MoveRightIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="w-full max-w-md pt-8">
      <h1 className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1.5 mt-8 text-center sm:text-left">
        {" "}
        Create an Notes.Ai account
      </h1>
      <p className="text-base text-slate-300 font-normal mb-8 text-center sm:text-left">
        Already have an account?
        <Link href="/signin" className="pl-1 text-blue-500">
          Sign in
        </Link>
        .
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-5 w-full mt-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input placeholder="demo@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="cursor-pointer font-semibold inline-flex items-center justify-center border select-none relative cursor-pointer transition ease-in-out duration-200 bg-white text-white text-black border-slate-6 hover:bg-white/90 focus-visible:bg-white/90 focus-visible:bg-black/90 text-sm h-10 pl-4 pr-4 rounded-md gap-1 w-full"
          >
            Continue
            <MoveRightIcon className="h-3 w-3 pt-0.5" />
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-4 text-slate-500 my-6">
        <Separator className="flex-1" />
        <span className="text-sm whitespace-nowrap">OR</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          className="w-full h-10 font-semibold inline-flex items-center justify-center border bg-grey-500 select-none relative cursor-pointer transition ease-in-out duration-200 text-white border-slate-6 hover:bg-gray-100/90 focus-visible:bg-gray-100/90 focus-visible:bg-black/90 text-sm pl-4 pr-4 rounded-md gap-1"
        >
          <FcGoogle className="h-4 w-4" />
          Sign up with Google
        </Button>
      </div>
    </main>
  );
}
