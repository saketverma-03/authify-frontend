"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ExampleDialog, Steeper } from "@/components";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import { cn } from "@/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import RolesSkeleton from "@/components/shared/skeletons/RolesSkeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import image1 from "@/assets/roles-tut/1.webp";
import image2 from "@/assets/roles-tut/2.jpg";
import Image from "next/image";

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

    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        variant: "destructive",
      });
    },
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
          <Card className="mb-6 w-full max-w-xl p-6 shadow-md transition-all">
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
              <ul className="mt-4 flex flex-wrap gap-2">
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
              {getRoles.isLoading ? (
                <>
                  <RolesSkeleton />
                  <RolesSkeleton />
                </>
              ) : (
                <></>
              )}
              {roles?.map(
                (item, index) =>
                  item.enabled && (
                    <RoleCard
                      role={item}
                      index={index}
                      key={index}
                      handlerFn={handleToggle}
                    />
                  ),
              )}
              {roles?.map(
                (item, index) =>
                  !item.enabled && (
                    <RoleCard
                      role={item}
                      index={index}
                      key={index}
                      handlerFn={handleToggle}
                    />
                  ),
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

const RoleCard = ({
  role,
  index,
  handlerFn,
}: {
  role: Role;
  index: number;
  handlerFn: (index: number, isChecked: boolean) => void;
}) => {
  return (
    <>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger>
          <Label
            htmlFor={role.id}
            className={cn(
              "flex cursor-pointer items-center rounded-lg border px-2 py-1",
              {
                "cursor-not-allowed opacity-50": !role.enabled,
              },
            )}
          >
            {role.icon ? (
              <Avatar>
                <AvatarImage
                  className="bottom-2 mr-2 "
                  height={12}
                  width={12}
                  src={role.icon}
                  style={{ borderColor: role.color }}
                ></AvatarImage>
              </Avatar>
            ) : (
              <span
                style={{ borderColor: role.color }}
                className="mr-2 flex h-12 w-12 items-center justify-center rounded-full border-2  bg-muted text-center  text-muted-foreground"
              >
                {role.name[0] + role.name[1]}
              </span>
            )}
            <span className="flex-1">{role.name}</span>
            <Switch
              id={role.id}
              onCheckedChange={(isChecked) => handlerFn(index, isChecked)}
              checked={role.isChecked}
            />
          </Label>
        </HoverCardTrigger>
        <HoverCardContent hidden={role.enabled}>
          Only roles below the Clanflare roles in your discord Channel are
          available to select, please move Clanflare above the roles which you
          want to select
          <ExampleDialog
            className="gap-4 border-yellow-800"
            title="Click Here to learn more about this"
          >
            <span className="flex border-l-2 border-yellow-500  pl-2 italic">
              Only roles below the Clanflare roles in your discord Channel are
              available to select, please move Clanflare above the roles which you
              want to select,
              <br />
              <br />
              Follwoing is an example that explan how to do this ,
            </span>
            <br />
            <span className="my-2 font-bold">
              First open Roles Section in your discord channel settings
            </span>
            <br />
            then follow the instructions as shown in image
            <span className="my-2" />
            <Image src={image1} alt="roles adding tutorial" />
            {/*TODO spelling mistake in image2*/}
            <Image src={image2} alt="roles adding tutorial" />
          </ExampleDialog>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};
