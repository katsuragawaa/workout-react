"use client";

import { MuscleCombobox } from "@/components/muscle-combobox";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { exercises } from "@/lib/workout-mock";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
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

export default function NewWorkout() {
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
    <>
      <header className="container flex max-w-4xl items-center justify-between pt-14">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </header>

      <main className="container flex max-w-xl flex-col py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Workout</h3>
                <p className="text-sm text-muted-foreground">Plan your workout.</p>
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Treino A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div>
                <h3 className="text-lg font-medium">Exercises</h3>
                <p className="text-sm text-muted-foreground">Workout activities.</p>
              </div>

              <div className="space-y-2">
                <Separator />
                {exercises.map((exercise, index) => (
                  <Fragment key={exercise.id}>
                    <div key={exercise.id} className="flex flex-row items-center justify-between gap-2 p-0">
                      <div>
                        <p>{exercise.name}</p>
                      </div>
                      <div>
                        <Button className="h-10 w-10 py-3" variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </Fragment>
                ))}
              </div>

              <div className="h-96 border-t">zero ideias de como deve ser esse form T---T</div>

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
            </div>

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
