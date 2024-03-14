"use client";

import { Exercise, Workout } from "@/types";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useLocalStorage("workouts", [] as Workout[]);
  const [exercises, setExercises] = useLocalStorage("exercises", [] as Exercise[]);

  const getWorkouts = () => {
    return workouts;
  };

  const getWorkoutById = (workoutId: number) => {
    return workouts.find((workout) => workout.id === workoutId);
  };

  const saveWorkout = (workout: Omit<Workout, "id">) => {
    setWorkouts([...workouts, { ...workout, id: workouts.length + 1 }]);
  };

  const updateWorkout = (workoutId: number, updatedWorkout: Partial<Workout>) => {
    setWorkouts(workouts.map((workout) => (workout.id === workoutId ? { ...workout, ...updatedWorkout } : workout)));
  };

  const deleteWorkout = (workoutId: number) => {
    setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
  };

  const getExercisesByWorkoutId = (workoutId: number) => {
    return exercises.filter((exercise) => exercise.workoutId === workoutId);
  };

  const saveExercise = (exercise: Omit<Exercise, "id">) => {
    setExercises([...exercises, { ...exercise, id: exercises.length + 1 }]);
  };

  const updateExercise = (exerciseId: number, updatedExercise: Partial<Exercise>) => {
    setExercises(
      exercises.map((exercise) => (exercise.id === exerciseId ? { ...exercise, ...updatedExercise } : exercise)),
    );
  };

  const deleteExercise = (exerciseId: number) => {
    setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
  };

  return {
    getWorkouts,
    getWorkoutById,
    saveWorkout,
    updateWorkout,
    deleteWorkout,
    getExercisesByWorkoutId,
    saveExercise,
    updateExercise,
    deleteExercise,
  };
};
