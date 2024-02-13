"use client";
import { NavbarAvatar, ThemeToggle } from "@/components";
import CardSkeleton from "@/components/shared/skeletons/SkeletonCard";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { getServices } from "@/utils/backend/user/user";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Card } from "./components/Card";

export default function DashBoard() {
  const { api } = useAxiosApi();

  const query = useQuery({
    queryKey: ["get-serv"],
    queryFn: async () => {
      const res = await getServices(api);
      return res.data.data;
    },
  });

  return (
    <main className="flex min-h-full flex-col items-center">
      {/* NAV section */}
      <nav className="sticky top-0 z-[10] flex w-full items-center border-b bg-card  px-4 py-2 backdrop-blur-md ">
        <Link href="/dashboard" className="mr-auto">
          Clanflare
        </Link>

        <ul className="flex list-none space-x-4">
          <ThemeToggle />
          <NavbarAvatar />
        </ul>
      </nav>
      {/* Body */}
      <div className="w-full max-w-[90rem]  p-4 text-sm">
        <div>
          <h1 className="mb-2 mr-auto text-2xl sm:mb-0">All servers</h1>

          <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
            {query.isLoading ? (
              <CardSkeleton />
            ) : (
              <>
                {// @ts-ignore
                query.data?.map((item) => (
                  <Card
                    key={item._id}
                    data={item}
                    varient={item.isCustom ? "custom" : "default"}
                  />
                ))}
                <Link
                  className="cols-span-1 flex h-full w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-card py-6  hover:bg-primary/10 dark:hover:bg-purple-950/10 "
                  href={"/add-services"}
                  title="Add new service"
                >
                  <div className="rounded-full border  p-4 dark:bg-black/20">
                    <Plus className="opacity-60" />
                  </div>
                </Link>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
