type Workout = {
  id?: number;
  name: string;
  description?: string; // TODO: remove this
};

type Exercise = {
  id?: number;
  workoutId: number;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight?: number;
};

export type { Workout, Exercise };
