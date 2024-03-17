type Workout = {
  id: number;
  name: string;
};

type WorkoutData = Omit<Workout, "id"> & { id?: number };

type Exercise = {
  id: number;
  workoutId: number;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
};

type ExerciseWithWeight = Exercise & { weight: number };

type ExerciseData = Omit<Exercise, "id"> & { id?: number };

export type { Workout, WorkoutData, Exercise, ExerciseWithWeight, ExerciseData };
