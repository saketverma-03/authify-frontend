"use client";

import { ExampleDialog } from "@/components";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// images
import explaneLayout from "@/assets/ss/cell-name.webp";
import { useToast } from "@/components/ui/use-toast";
import { useAxiosApi } from "@/hooks/useAxiosApi";
import { useNewServerStore } from "@/store";
import Link from "next/link";

/**Todo
 * form validation me check if row's are same
 */

const formSchema = z.object({
  phoneNumberCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
  emailCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
  discordCell: z
    .string()
    .regex(/^[a-zA-Z]+[0-9]+$/, "invalid input")
    .toUpperCase(),
});

export default function Test() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
  });

  const { api } = useAxiosApi();
  const currentSheet = useNewServerStore((s) => s.googleSheet);
  const updateCells = useNewServerStore((s) => s.replaceCells);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["google-sheet-setup"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await api.get("/validate-sheet-headers", {
        params: {
          spreadSheetUrl: currentSheet.url,
          sheetId: currentSheet.selectedSheet.sheetId,
          sheetName: currentSheet.selectedSheet.title,
          phoneCell: data.phoneNumberCell,
          emailCell: data.emailCell,
          discordIdCell: data.discordCell,
        },
      });
      // return res.data;
      return data;
    },
    onSuccess: (data) => {
      // save data to store
      updateCells({
        userDiscordId: data.discordCell,
        userEmail: data.emailCell,
        userPhone: data.phoneNumberCell,
      });
      router.push(`/add-services/google-sheets/add-bot-role?step=4`);
    },

    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  // handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.discordCell.slice(1) !== values.emailCell.slice(1) ||
      values.discordCell.slice(1) !== values.phoneNumberCell.slice(1)
    ) {
      form.setError("phoneNumberCell", {
        message:
          "All Row's shoudl be Same examle: A3,B3,D3 ,here 3 is Row number",
      });
      form.setError("emailCell", {
        message:
          "All Row's shoudl be Same examle: A3,B3,D3 ,here 3 is Row number",
      });
      form.setError("discordCell", {
        message:
          "All Row's shoudl be Same examle: A3,B3,D3 ,here 3 is Row number",
      });
      return;
    }
    if (values.emailCell === values.phoneNumberCell) {
      form.setError("phoneNumberCell", {
        message: "multiple field's cant have same value",
      });
      form.setError("emailCell", {
        message: "multiple field's cant have same value",
      });
      form.setError("discordCell", {
        message: "multiple field's cant have same value",
      });
      return;
    }
    mutate(values);
  }

  return (
    <>
      <div className="my-auto">
        <Link
          href={"./select-sheet?step=1"}
          className="self-start justify-self-start"
        >
          <Button variant={"outline"} className="mb-4">
            <ArrowLeft className="mr-4" /> Back
          </Button>
        </Link>
        <Card className="h-fit w-fit self-center p-4">
          <h1 className="mb-4 text-3xl"> Enter the cell Details of sheet</h1>
          <ExampleDialog title="For more details click here" className="w-full">
            You can identify the Cell with{" "}
            <span className="underline">first entry</span> of each type as shown
            in image below
            <ul className="list-inside">
              <span className="mb-2 mt-4 block text-lg underline decoration-primary">
                In this Example,
              </span>
              <li>- Email Cell = B3</li>
              <li>- Phone Cell = C3</li>
              <li>- Discord Cell = B3</li>
            </ul>
            <Image src={explaneLayout} alt="column and row understand" />
          </ExampleDialog>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-rows-2 gap-6">
                <FormField
                  control={form.control}
                  name="emailCell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Cell</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="for example. D2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumberCell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number cell</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="for example. A2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discordCell"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discord Id cell
                        <span className="italic">
                          {"here user's discord id will be stored"}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="for example. C2"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex">
                <Button
                  type="submit"
                  className="ml-auto mt-6 w-full md:w-fit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
