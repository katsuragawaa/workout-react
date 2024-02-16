"use client";

import { Beef, Minus, Pencil, Repeat2, X } from "lucide-react";
import { Button } from "./ui/button";

type ExerciseItemProps = {
  exercise: {
    id?: number;
    name: string;
    muscle: string;
    sets: number;
    reps: number;
  };
};

export function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <div className="flex flex-col justify-center rounded-md border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium leading-5">{exercise.name}</h3>

          <div className="flex items-center text-xs">
            <div className="flex flex-row items-center gap-1">
              <Beef className="h-4 w-4" />
              {exercise.muscle}
            </div>
            <Minus className="h-4 w-4 rotate-90 transform" />
            <div className="flex flex-row items-center gap-1">
              <Repeat2 className="h-4 w-4" />
              <span>
                {exercise.sets}
                <X className="mb-0.5 inline-block h-3 w-3" />
                {exercise.reps}
              </span>
            </div>
          </div>
        </div>

        <Button variant="outline" size="icon" className="w-10 min-w-10">
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  // return (
  //   <div className="space-y-3">
  //     <div className="flex flex-row items-center justify-between gap-2 p-0">
  //       <p className="">{exercise.name}</p>
  //       <div>
  //         <Button className="h-10 w-10 py-3" variant="outline" size="icon">
  //           <Pencil className="h-4 w-4" />
  //         </Button>
  //       </div>
  //     </div>
  //     <Separator />
  //   </div>
  // );
}
