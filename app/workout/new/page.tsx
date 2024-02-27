"use client";

import { DeleteAlertDialog } from "@/components/delete-alert-dialog";
import { ExerciseDialogForm } from "@/components/exercise-dialog-form";
import { ExerciseItem } from "@/components/exercise-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import * as db from "@/lib/db-mock";
import { Exercise, Workout } from "@/types";
import { ArrowLeft, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultWorkout = { name: "" };

export default function NewWorkout() {
  const [openWorkoutForm, setOpenWorkoutForm] = useState(false);
  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [selectedWorkout, setSelectedWorkout] = useState<Workout>(defaultWorkout);
  const [workoutId, setWorkoutId] = useState<number>(-1);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const workouts = db.getWorkouts();

  const loadExercises = (workoutId: number) => {
    const e = db.getExercisesByWorkout(workoutId);
    setExercises(e);
  };

  const openForm = (workout: Workout) => {
    setOpenWorkoutForm(true);
    setSelectedWorkout(workout);
  };

  const submitWorkout = (workout: Workout) => {
    workout.id === undefined ? db.saveWorkout(workout) : db.updateWorkoutById(workout.id, workout);
  };

  const deleteWorkout = (workout: Workout) => {
    if (workout.id === undefined) {
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error deleting the workout.",
      });
    }

    setOpenAlert(true);
    setWorkoutId(workout.id);
  };

  const confirmDelete = () => {
    db.deleteWorkoutById(workoutId);
  };

  const submitExercise = (exercise: Omit<Exercise, "id">) => {
    db.saveExercise(exercise);
    loadExercises(exercise.workoutId);
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

        <Accordion type="single" collapsible onValueChange={(v) => loadExercises(Number(v))}>
          {workouts.map((workout) => (
            <AccordionItem key={workout.id || workout.name} value={String(workout.id)}>
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
                    <DropdownMenuItem onClick={() => openForm(workout)} className="flex items-center gap-2">
                      <Pencil className="h-3 w-3" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteWorkout(workout)} className="flex items-center gap-2">
                      <Trash2 className="h-3 w-3" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AccordionContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {exercises.map((exercise) => (
                  <ExerciseItem key={exercise.id} exercise={exercise} />
                ))}

                <Button
                  onClick={() => {
                    setOpenExerciseForm(true);
                    setWorkoutId(workout.id);
                  }}
                  variant="secondary"
                  className="md:col-span-2"
                >
                  Novo exercício
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button onClick={() => openForm(defaultWorkout)} className="mt-10">
          Novo treino
        </Button>

        <WorkoutDialogForm
          open={openWorkoutForm}
          setOpen={setOpenWorkoutForm}
          workout={selectedWorkout}
          onSubmit={submitWorkout}
        />
        <ExerciseDialogForm
          open={openExerciseForm}
          setOpen={setOpenExerciseForm}
          onSubmit={submitExercise}
          workoutId={workoutId}
        />
        <DeleteAlertDialog open={openAlert} setOpen={setOpenAlert} onConfirm={confirmDelete} />
      </main>
    </>
  );
}
