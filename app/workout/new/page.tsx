"use client";

import { ExerciseDialogForm } from "@/components/exercise-dialog-form";
import { ExerciseItem } from "@/components/exercise-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import { exercises, workouts } from "@/lib/workout-mock";
import { ArrowLeft, PenBox } from "lucide-react";
import Link from "next/link";

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
          {workouts.map((workout) => (
            <AccordionItem key={workout.id || workout.name} value={workout.name}>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <AccordionTrigger className="w-full pb-4 text-start text-2xl font-bold">
                    {workout.name}
                  </AccordionTrigger>
                </div>
                <WorkoutDialogForm workout={workout}>
                  <Button variant="ghost" size="icon">
                    <PenBox className="h-4 w-4" />
                  </Button>
                </WorkoutDialogForm>
              </div>
              <AccordionContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {exercises.map((exercise) => (
                  <ExerciseItem key={exercise.id} exercise={exercise} />
                ))}

                <ExerciseDialogForm>
                  <Button variant="secondary" className="md:col-span-2">
                    Novo exercício
                  </Button>
                </ExerciseDialogForm>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <WorkoutDialogForm>
          <Button className="w-fll mt-10">Novo workout</Button>
        </WorkoutDialogForm>
      </main>
    </>
  );
}
