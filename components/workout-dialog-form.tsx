"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Workout } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type WorkoutData = Omit<Workout, "id">;

type WorkoutDialogFormProps = {
  workout?: WorkoutData;
  children: ReactNode;
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const defaultWorkout = {
  name: "",
};

export const WorkoutDialogForm = ({ workout, children }: WorkoutDialogFormProps) => {
  const { name } = workout || defaultWorkout;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpen(false);
  };

  const toggleDialog = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Workout</h3>
                <p className="text-sm text-muted-foreground">Plan your workout.</p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Treino A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
