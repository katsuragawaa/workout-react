import { Exercise } from "@/types";
import { Beef, Minus, Pencil, Repeat2, X } from "lucide-react";
import { Button } from "./ui/button";

type ExerciseData = Omit<Exercise, "id">;

type ExerciseItemProps = {
  exercise: ExerciseData;
};

const ExerciseDetails = ({ name, muscle, sets, reps }: ExerciseData) => (
  <div className="space-y-2">
    <h3 className="text-lg font-medium leading-5">{name}</h3>
    <div className="flex items-center text-xs">
      <div className="flex flex-row items-center gap-1">
        <Beef className="h-4 w-4" />
        {muscle}
      </div>
      <Minus className="h-4 w-4 rotate-90 transform" />
      <div className="flex flex-row items-center gap-1">
        <Repeat2 className="h-4 w-4" />
        <span>
          {sets}
          <X className="mb-0.5 inline-block h-3 w-3" />
          {reps}
        </span>
      </div>
    </div>
  </div>
);

const EditButton = () => (
  <Button variant="secondary" size="icon" className="w-10 min-w-10">
    <Pencil className="h-4 w-4" />
  </Button>
);

export const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
  return (
    <div className="flex flex-col justify-center rounded-md border p-4">
      <div className="flex items-center justify-between gap-4">
        <ExerciseDetails {...exercise} />
        <EditButton />
      </div>
    </div>
  );
};
