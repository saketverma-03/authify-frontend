"use client";

import { useAxiosApi } from "@/hooks/useAxiosApi";
import { getMangoes } from "@/utils/backend/services/tag-manog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const [selectedMango, setSelectedManog] = useState("");
  const params = useSearchParams();
  const { api } = useAxiosApi();
  const { toast } = useToast();
  const router = useRouter();

  const { data: mangoes } = useQuery({
    queryKey: ["mangoes-tag"],
    queryFn: async () => {
      const id = params.get("id");
      if (!id) {
        router.push("/dashboard");
        return;
      }
      const res = await getMangoes(api, id);
      return res.data.data;
    },
  });

  const { isPending, mutate: handleSubmit } = useMutation({
    mutationKey: ["add-custom-solution"],
    mutationFn: async () => {
      await api.post("customSolutions/gangstaPhilosophy/addCustomSolution", {
        mango: selectedMango,
        serviceId: params.get("id"),
      });
    },
    onSuccess: () => {
      toast({
        title: "Service added Successfully",
      });
      router.push("/service-details/gangsta-philosophy");
    },
    onError: (error: any) => {
      toast({
        title: error.response?.data.message || error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <div className="mb-4 text-2xl ">Select Cource</div>
      <RadioGroup
        defaultValue="option-one"
        className="my-4"
        onValueChange={setSelectedManog}
        value={selectedMango}
      >
        {mangoes?.map((cource) => {
          return (
            <Label
              key={cource._id}
              className="flex items-center gap-4 rounded p-2 hover:bg-red-200 dark:hover:bg-primary/20"
              htmlFor={cource._id}
            >
              <RadioGroupItem value={cource._id} id={cource._id} />
              {cource.title}
            </Label>
          );
        })}
      </RadioGroup>
      <Button
        onClick={() => handleSubmit()}
        className="w-full"
        disabled={selectedMango === ""}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Proceed With Selection"
        )}
      </Button>
    </>
  );
}
