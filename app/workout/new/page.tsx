"use client";

import { DeleteAlertDialog } from "@/components/delete-alert-dialog";
import { ExerciseDialogForm } from "@/components/exercise-dialog-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { WorkoutAccordion } from "@/components/workout-accordion";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import { useWorkouts } from "@/hooks/use-workouts";
import { Exercise, ExerciseData, WorkoutData } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const defaultWorkout = { name: "" };

export default function NewWorkout() {
  const [openWorkoutForm, setOpenWorkoutForm] = useState(false);
  const [openExerciseForm, setOpenExerciseForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutData>(defaultWorkout);
  const [workoutId, setWorkoutId] = useState<number>(-1);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const {
    getWorkouts,
    saveWorkout,
    updateWorkout,
    deleteWorkout,
    getExercisesByWorkoutId,
    saveExercise,
    updateExercise,
    deleteExercise,
  } = useWorkouts();

  const workouts = getWorkouts();

  const loadExercises = (workoutId: number) => {
    const e = getExercisesByWorkoutId(workoutId);
    setExercises(e);
  };

  const openWorkout = (workout: WorkoutData) => {
    setOpenWorkoutForm(true);
    setSelectedWorkout(workout);
  };

  const openExercise = (workoutId: number) => {
    setOpenExerciseForm(true);
    setWorkoutId(workoutId);
  };

  const submitWorkout = (workout: WorkoutData) => {
    workout.id === undefined ? saveWorkout(workout) : updateWorkout(workout.id, workout);
  };

  const deleteWorkoutHandler = (workout: WorkoutData) => {
    if (workout.id === undefined) {
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error deleting the workout.",
      });
    }

    setOpenAlert(true);
    setWorkoutId(workout.id);
  };

  const confirmDeleteWorkout = () => {
    deleteWorkout(workoutId);
  };

  const submitExercise = (exercise: ExerciseData) => {
    exercise.id === undefined ? saveExercise(exercise) : updateExercise(exercise.id, exercise);
    loadExercises(exercise.workoutId);
  };

  const deleteExerciseHandler = (exercise: Exercise) => {
    deleteExercise(exercise.id);
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

        <WorkoutAccordion
          workouts={workouts}
          openWorkout={openWorkout}
          deleteWorkout={deleteWorkoutHandler}
          exercises={exercises}
          loadExercises={loadExercises}
          openExercise={openExercise}
          submitExercise={submitExercise}
          deleteExercise={deleteExerciseHandler}
        />

        <Button onClick={() => openWorkout(defaultWorkout)} className="mt-10">
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
        <DeleteAlertDialog open={openAlert} setOpen={setOpenAlert} onConfirm={confirmDeleteWorkout} />
      </main>
    </>
  );
}
