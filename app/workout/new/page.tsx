"use client";

import { DeleteAlertDialog } from "@/components/delete-alert-dialog";
import { ExerciseDialogForm } from "@/components/exercise-dialog-form";
import { ExerciseItem } from "@/components/exercise-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import { exercises, workouts } from "@/lib/workout-mock";
import { Workout } from "@/types";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowLeft, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type WorkoutData = Omit<Workout, "id" | "description">;

const defaultWorkout = { name: "" };

export default function NewWorkout() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData>(defaultWorkout);

  const handleEdit = (workout: WorkoutData) => {
    setOpen(true);
    setSelectedWorkout(workout);
  };

  const handleNew = () => {
    setOpen(true);
    setSelectedWorkout(defaultWorkout);
  };

  const handleDelete = (workout: WorkoutData) => {
    setOpenAlert(true);
  };

  const confirmDelete = () => {
    console.log("delete");
  };

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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEdit(workout)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(workout)}>Deletar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

        <Button onClick={handleNew} className="w-fll mt-10">
          Novo treino
        </Button>

        <WorkoutDialogForm open={open} setOpen={setOpen} workout={selectedWorkout} />
        <DeleteAlertDialog open={openAlert} setOpen={setOpenAlert} onConfirm={confirmDelete} />
      </main>
    </>
  );
}
