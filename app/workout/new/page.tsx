"use client";

import { MuscleCombobox } from "@/components/muscle-combobox";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
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

export default function NewWorkout() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      exercises: [
        {
          name: "",
          muscle: "",
          sets: 0,
          reps: 0,
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <header className="container flex items-center justify-between">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </header>

      <main className="container flex min-h-screen max-w-xl flex-col pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workout title</FormLabel>
                  <FormControl>
                    <Input placeholder="Treino A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues("exercises").map((exercise, index) => (
              <Fragment key={exercise.id || index}>
                <FormField
                  control={form.control}
                  name={`exercises.${index}.name`}
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
                    name={`exercises.${index}.sets`}
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
                    name={`exercises.${index}.reps`}
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
              </Fragment>
            ))}

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}
