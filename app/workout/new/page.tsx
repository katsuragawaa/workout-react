"use client";

import { ExerciseCard } from "@/components/exercise-card";
import { ExerciseItem } from "@/components/exercise-item";
import { MuscleCombobox } from "@/components/muscle-combobox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import { exercises } from "@/lib/workout-mock";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  exercises: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string().min(2).max(20),
      muscle: z.string().min(2).max(20),
      sets: z.number().min(1).max(5),
      reps: z.number().min(1).max(30),
    }),
  ),
});

function ExerciseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      exercises: exercises,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="rounded border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name={`exercises.${0}.name`}
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
            name="exercises.0.muscle"
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
              name={`exercises.${0}.sets`}
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
              name={`exercises.${0}.reps`}
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
        </form>
      </Form>
    </div>
  );
}

export default function NewWorkout() {
  return (
    <>
      <header className="container flex max-w-4xl items-center justify-between pt-14">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </header>

      <main className="container flex max-w-xl flex-col py-10">
        <h1 className="text-4xl font-extrabold">Plano de treino</h1>
        <p className="pb-6 text-sm text-muted-foreground">Planeje seu treco</p>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="pb-4 text-2xl font-bold">Treino A</AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {exercises.map((exercise) => (
                <ExerciseItem key={exercise.id} exercise={exercise} />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="pb-4 text-2xl font-bold">Treino A</AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button variant="outline" className="mt-10 w-full">
          Novo exercício
        </Button>

        <WorkoutDialogForm />
      </main>
    </>
  );
}
