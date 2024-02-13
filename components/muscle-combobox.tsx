import { formSchema } from "@/app/workout/new/page";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";

const muscles = [
  { value: "chest", label: "Peitoral" },
  { value: "back", label: "Costas" },
  { value: "shoulders", label: "Ombro" },
  { value: "biceps", label: "Bíceps" },
  { value: "triceps", label: "Tríceps" },
  { value: "forearms", label: "Antebraço" },
  { value: "abs", label: "Abdômen" },
  { value: "quadriceps", label: "Quadríceps" },
  { value: "hamstrings", label: "Isquiotibiais" },
  { value: "glutes", label: "Glúteos" },
  { value: "adductors", label: "Adutores" },
  { value: "abductors", label: "Abdutores" },
  { value: "calves", label: "Panturrilha" },
  { value: "fullBody", label: "Corpo inteiro" },
  { value: "upperBody", label: "Corpo superior" },
  { value: "lowerBody", label: "Corpo inferior" },
  { value: "cardio", label: "Cardio" },
  { value: "stretching", label: "Alongamento" },
  { value: "other", label: "Outro" },
] as const;

type MuscleComboboxProps = {
  value: string;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
};

export function MuscleCombobox({ value, setValue }: MuscleComboboxProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("w-full justify-between", !value && "text-muted-foreground")}
          >
            {value ? muscles.find((muscle) => muscle.value === value)?.label : "Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <ScrollArea className="h-64">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {muscles.map((muscle) => (
                <CommandItem
                  value={muscle.label}
                  key={muscle.value}
                  onSelect={() => {
                    setValue("exercises.0.muscle", muscle.value);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", muscle.value === value ? "opacity-100" : "opacity-0")} />
                  {muscle.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
