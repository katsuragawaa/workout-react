type Workout = {
  id?: number;
  name: string;
  description?: string; // TODO: remove this
};

type Exercise = {
  id: number;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight: number;
  workoutId?: number;
};

export type { Workout, Exercise };
