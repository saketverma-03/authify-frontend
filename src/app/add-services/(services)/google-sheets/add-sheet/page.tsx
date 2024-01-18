"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { ArrowLeft, CopyIcon } from "lucide-react";
import NavLink from "next/link";

import { ExampleDialog, SheetInputForm, Steeper } from "@/components";

import image1 from "@/assets/ss/sheet-permission-ss/1.webp";
import image2 from "@/assets/ss/sheet-permission-ss/2.webp";
import image3 from "@/assets/ss/sheet-permission-ss/3.webp";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function FormAddService() {
  const { toast } = useToast();
  return (
    <>
      <div className="my-auto self-center">
        <NavLink href={"/add-services/select-service"}>
          <Button variant={"outline"} className="mb-4">
            <ArrowLeft className="mr-4" /> Back
          </Button>
        </NavLink>
        <Card className="my-auto w-full max-w-lg p-6 shadow-md ">
          <h1 className="mb-4 text-2xl">
            Connect to Google Sheet <br />
            <span className="text-lg text-muted-foreground">
              This Sheet will be used to manage users
            </span>
          </h1>

          <>
            {/* STEP - 1 */}
            <h2 className="text-xl underline decoration-primary underline-offset-2">
              Step 1
            </h2>
            <ExampleDialog title="Give your google sheet access to this email, Click here to learn how ?">
              <div>
                <ul className="space-y-8">
                  <li>
                    <span className="underline decoration-primary">
                      Copy this email
                    </span>
                    <div className="mt-2 flex items-center rounded-lg border bg-card font-light text-card-foreground shadow-sm">
                      <span className="flex-1 pl-2">
                        clanflare@clanflare.iam.gserviceaccount.com
                      </span>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "clanflare@clanflare.iam.gserviceaccount.com",
                          );
                          toast({
                            title: "copied to clipboard",
                            duration: 1000,
                          });
                        }}
                        variant={"ghost"}
                        className="border-l"
                      >
                        <CopyIcon />
                      </Button>
                    </div>
                  </li>
                  <li>
                    1.Open google sheet that contains user data and click on
                    share button and a popup will appear.
                    <Image src={image1} alt="share button image" />
                  </li>

                  <li>
                    2.Paste the email which you copied in {"step 1"} to{" "}
                    <span className="rounded-md bg-muted bg-opacity-60 p-1 px-2 ">
                      {"Add people input"}
                    </span>{" "}
                    as shown in image below.
                    <br /> After that click on done and move to next step done.
                    <Image src={image2} alt="share button image" />
                  </li>
                  <li>
                    3.At last make sure that editor is selected in the button
                    showed in image below. after that click on send.
                    <Image src={image3} alt="share button image" />
                  </li>
                </ul>
              </div>
            </ExampleDialog>

            <div className="mb-8 flex items-center rounded-lg border bg-card text-card-foreground shadow-sm">
              <span className="flex-1 pl-2">
                clanflare@clanflare.iam.gserviceaccount.com
              </span>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "clanflare@clanflare.iam.gserviceaccount.com",
                  );
                  toast({
                    title: "copied to clipboard",
                    duration: 1000,
                  });
                }}
                variant={"ghost"}
                className="border-l"
              >
                <CopyIcon />
              </Button>
            </div>
            <SheetInputForm />
          </>
        </Card>
      </div>
    </>
  );
}
