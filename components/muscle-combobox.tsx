import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { exerciseFormSchema } from "./exercise-dialog-form";
import { ScrollArea } from "./ui/scroll-area";
import { muscles } from "@/lib/muscles";

type MuscleComboboxProps = {
  value: string;
  setValue: UseFormSetValue<z.infer<typeof exerciseFormSchema>>;
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
            {value ? muscles.find((muscle) => muscle.value === value)?.label : "Selecione um músculo"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0">
        <ScrollArea className="h-64">
          <Command>
            <CommandInput placeholder="Busque por um grupo muscular..." />
            <CommandEmpty>Não achei.</CommandEmpty>
            <CommandGroup>
              {muscles.map((muscle) => (
                <CommandItem value={muscle.label} key={muscle.value} onSelect={() => setValue("muscle", muscle.value)}>
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
