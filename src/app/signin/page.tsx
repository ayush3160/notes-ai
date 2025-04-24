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
import { MoveRightIcon, Router } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { AuthProvidersEnum } from "@/lib/auth";
import { supabaseClient } from "@/lib/supabaseClient";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error signing the user", error.message);
      return;
    }

    const session = data.session;

    Cookies.set("notes_session", JSON.stringify(session), {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    router.push("/");
  }

  return (
    <main className="w-full max-w-md pt-8">
      <h1 className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1.5 mt-8 text-center sm:text-left">
        {" "}
        Log in to your Notes.Ai account
      </h1>
      <p className="text-base text-slate-300 font-normal mb-8 text-center sm:text-left">
        Already have an account?
        <Link href="/signup" className="pl-1 text-blue-500">
          Sign up
        </Link>
        .
      </p>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
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
          onClick={() => {
            signIn(AuthProvidersEnum.GOOGLE);
          }}
        >
          <FcGoogle className="h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
    </main>
  );
}
