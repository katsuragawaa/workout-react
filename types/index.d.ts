type Workout = {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
};

type Exercise = {
  id: number;
  name: string;
  muscle: string;
  sets: number;
  reps: number;
  weight: number;
};

export type { Workout, Exercise };
