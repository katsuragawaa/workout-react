type Workout = {
  id: string;
  name: string;
  description?: string;
  exercises?: Exercise[];
};

type Exercise = {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight: number;
};

export type { Workout, Exercise };
