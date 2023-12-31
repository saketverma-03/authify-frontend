"use client";
import { useUserStore } from "@/store";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const token = useUserStore((state) => state.token);

  const getUrl = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/oauth-link`,
      {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      },
    );
    const newURL = res.data?.data.oauthLink as string;
    redirect(newURL);
  };

  useEffect(() => {
    if (!token) {
      if (process.env.NEXT_PUBLIC_AUTH_URL) {
        redirect(process.env.NEXT_PUBLIC_AUTH_URL);
      } else {
        getUrl();
      }
    } else {
      redirect("/dashboard");
    }
  }, [token]);
  return <>redirecting</>;
}
