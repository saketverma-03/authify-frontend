"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Steeper } from "@/components";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { serialize } from "v8";

type Role = {
  id: string;
  name: string;
  color: string;
  icon: string;
  isChecked: boolean;
  enabled: boolean;
};
type NewService = {
  name: string;
  spreadSheetUrl: string;
  sheetId: number;
  sheetName: string;
  phoneCell: string;
  discordIdCell: string;
  emailCell: string;
  roleIds: string[];
  guildId: string;
};

const FormSchema = z.object({
  serviceName: z.string().min(1, { message: "Service name is required" }),
});

export default function FormAddService() {
  const router = useRouter();
  const { toast } = useToast();
  const { api } = useAxiosApi();
  const guildId = useNewServerStore((s) => s.server.id);
  const queryClient = useQueryClient();
  const NewServieStoredData = useNewServerStore((state) => state);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onChange",
  });

  const [roles, setRoles] = useState<Role[]>([]);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: { serviceName: string }) => {
      const newSrvice = CreateServiceData(data.serviceName);
      const res = await api.post("/create-service", newSrvice);
      return res.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Service created succefully",
      });
      NewServieStoredData.clean();
      router.push(`/dashboard`);
    },

    onError: (error) => {},
  });

  const getRoles = useQuery({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const res = await api.get("/discord-roles", {
        params: {
          guildId,
        },
      });
      const data = res.data?.data as Role[];
      setRoles(data?.map((item) => ({ ...item, isChecked: false })));
      return res.data?.data as Role;
    },
  });

  function CreateServiceData(serviceName: string) {
    const selectRolIds: string[] = [];

    for (let role in roles) {
      if (roles[role].isChecked) {
        selectRolIds.push(roles[role].id);
      }
    }

    if (!selectRolIds) {
      throw Error("no selected roles");
    }

    const newData: NewService = {
      name: serviceName,
      guildId: NewServieStoredData.server.id,
      spreadSheetUrl: NewServieStoredData.googleSheet.url,
      sheetId: NewServieStoredData.googleSheet.selectedSheet.sheetId,
      sheetName: NewServieStoredData.googleSheet.selectedSheet.title,
      phoneCell: NewServieStoredData.googleSheet.cells.userPhone,
      emailCell: NewServieStoredData.googleSheet.cells.userEmail,
      discordIdCell: NewServieStoredData.googleSheet.cells.userDiscordId,
      roleIds: selectRolIds as string[],
    };
    return newData;
  }

  function handleToggle(index: number, isChecked: boolean) {
    if (!roles[index].enabled) return;
    const newRole = roles.slice();
    newRole[index].isChecked = isChecked;
    setRoles(newRole);
  }

  function handleSubmit(value: z.infer<typeof FormSchema>) {
    const checked = roles.filter((item) => item.isChecked);
    if (checked.length === 0) {
      console.log(checked);
      form.setError("serviceName", {
        message: "please select a role from below",
      });
      return;
    }
    mutate({ serviceName: value.serviceName });
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-between text-sm">
        <Steeper stepNum={4} />
        <div className="my-auto self-center">
          <Link href={"./sheet-linking/add-data-cells"}>
            <Button variant={"outline"} className="mb-4">
              <ArrowLeft className="mr-4" /> Back
            </Button>
          </Link>
          <Card className="mb-6 w-full max-w-xl p-6 shadow-md">
            <h1 className="mb-4 text-2xl">
              Select Roles, <br />
              <span className="text-lg">
                Turn on switches for which roles you want to select{" "}
              </span>
            </h1>
            <Button
              className={cn("gap-2", {
                // "bg-red-700": getRoles.isLoading,
                // "bg-red-300": getRoles.isFetching,
              })}
              variant={"outline"}
              onClick={() => getRoles.refetch()}
            >
              Refresh <RefreshCw className="text-muted-foreground" />{" "}
            </Button>

            <Card className="my-4 p-4 shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name for the service</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            placeholder="ex. My Auth Service"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="my-2 flex justify-end">
                    <Button disabled={roles?.length === 0 && !isLoading}>
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Create Service"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>

              <h2>Selected Roles ( required )</h2>
              <ul className="mt-4 flex flex-wrap justify-between gap-2">
                {roles?.map(
                  (role, i) =>
                    role.isChecked && (
                      <li
                        style={{ borderColor: role.color }}
                        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border px-4 py-2"
                        key={i}
                        onClick={() => handleToggle(i, false)}
                      >
                        {role.name}
                        <X />
                      </li>
                    ),
                )}
              </ul>
            </Card>
            <div className="grid gap-4 lg:grid-cols-2">
              {roles?.map((item, index) => {
                return (
                  <Label
                    key={item.id}
                    htmlFor={item.id}
                    className={cn(
                      "flex cursor-pointer items-center rounded-lg border px-2 py-1",
                      {
                        "cursor-not-allowed opacity-50": !item.enabled,
                      },
                    )}
                  >
                    {item.icon ? (
                      <Avatar>
                        <AvatarImage
                          className="bottom-2 mr-2 "
                          height={12}
                          width={12}
                          src={item.icon}
                          style={{ borderColor: item.color }}
                        ></AvatarImage>
                      </Avatar>
                    ) : (
                      <span
                        style={{ borderColor: item.color }}
                        className="mr-2 flex h-12 w-12 items-center justify-center rounded-full border-2  bg-muted text-center  text-muted-foreground"
                      >
                        {item.name[0] + item.name[1]}
                      </span>
                    )}
                    <span className="flex-1">{item.name}</span>
                    <Switch
                      id={item.id}
                      onCheckedChange={(isChecked) =>
                        handleToggle(index, isChecked)
                      }
                      checked={item.isChecked}
                    />
                  </Label>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
