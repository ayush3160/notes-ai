"use client";

import React, { useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  async function checkSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error || !data.session) {
      router.push("/signin");
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return <p>Hello Ayush</p>;
}
