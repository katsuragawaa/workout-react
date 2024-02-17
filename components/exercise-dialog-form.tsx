import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Exercise } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MuscleCombobox } from "./muscle-combobox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

type ExerciseData = Omit<Exercise, "id">;

type ExerciseDialogFormProp = {
  exercise?: ExerciseData;
  children: React.ReactNode;
};

export const exerciseFormSchema = z.object({
  name: z.string().min(2).max(50),
  muscle: z.string().min(2).max(50),
  sets: z.number().min(1).max(5),
  reps: z.number().min(1).max(30),
});

const defaultExercise = {
  name: "",
  muscle: "",
  sets: 0,
  reps: 0,
};

export const ExerciseDialogForm = ({ exercise, children }: ExerciseDialogFormProp) => {
  const { name, muscle, sets, reps } = exercise || defaultExercise;

  const form = useForm<z.infer<typeof exerciseFormSchema>>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: { name, muscle, sets, reps },
  });

  const [open, setOpen] = useState(false);

  const toggleOpen = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    console.log("addExercise");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Novo exercício</h3>
                <p className="text-sm text-muted-foreground">Adicione atividades ao seu treino.</p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise name</FormLabel>
                    <FormControl>
                      <Input placeholder="Supino reto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="muscle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Músculo</FormLabel>
                    <div>
                      <MuscleCombobox value={field.value} setValue={form.setValue} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sets</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="3"
                          {...field}
                          onChange={(event) => {
                            field.onChange(Number(event.currentTarget.value));
                          }}
                          onFocus={(event) => {
                            event.currentTarget.select();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10"
                          {...field}
                          onChange={(event) => {
                            field.onChange(Number(event.currentTarget.value));
                          }}
                          onFocus={(event) => {
                            event.currentTarget.select();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
