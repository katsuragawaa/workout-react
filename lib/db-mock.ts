import { Exercise, Workout } from "@/types";

const workouts: Workout[] = [];
const exercises: Exercise[] = [];
let lastWorkoutId = 0;
let lastExerciseId = 0;

const getWorkouts = () => {
  return workouts;
};

const getExercises = () => {
  return exercises;
};

const getExercisesByWorkout = (workoutId: number) => {
  return exercises.filter((exercise) => exercise.workoutId === workoutId);
};

const saveWorkout = (workout: Omit<Workout, "id">) => {
  const newWorkout = { ...workout, id: ++lastWorkoutId };
  workouts.push(newWorkout);
};

const saveExercise = (exercise: Omit<Exercise, "id">) => {
  const newExercise = { ...exercise, id: ++lastExerciseId };
  exercises.push(newExercise);
};

const updateWorkoutById = (workoutId: number, updatedWorkout: Partial<Workout>) => {
  const workoutIndex = workouts.findIndex((workout) => workout.id === workoutId);
  if (workoutIndex !== -1) {
    workouts[workoutIndex] = { ...workouts[workoutIndex], ...updatedWorkout };
  }
};

const updateExerciseById = (exerciseId: number, updatedExercise: Partial<Exercise>) => {
  const exerciseIndex = exercises.findIndex((exercise) => exercise.id === exerciseId);
  if (exerciseIndex !== -1) {
    exercises[exerciseIndex] = { ...exercises[exerciseIndex], ...updatedExercise };
  }
};

const deleteWorkoutById = (workoutId: number) => {
  const index = workouts.findIndex((workout) => workout.id === workoutId);
  if (index !== -1) {
    workouts.splice(index, 1);
  }
};

const deleteExerciseById = (exerciseId: number) => {
  const index = exercises.findIndex((exercise) => exercise.id === exerciseId);
  if (index !== -1) {
    exercises.splice(index, 1);
  }
};

export {
  saveExercise,
  saveWorkout,
  deleteExerciseById,
  deleteWorkoutById,
  getExercises,
  getExercisesByWorkout,
  getWorkouts,
  updateExerciseById,
  updateWorkoutById,
};
