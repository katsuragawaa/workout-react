"use client";

import { CheckSquare, Repeat2, Square, Weight, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ExerciseCardProps = {
  exercise: {
    id: number;
    name: string;
    muscle: string;
    sets: number;
    reps: number;
    weight: number;
  };
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [done, setDone] = useState(false);

  const toggleDone = () => {
    setDone(!done);
  };

  return (
    <Card style={{ opacity: done ? 0.5 : 1 }}>
      <CardHeader>
        <Badge className="w-fit" variant="outline">
          {exercise.muscle}
        </Badge>
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <Repeat2 className="h-5 w-5" />
          <span>
            {exercise.sets}
            <X className="mb-0.5 inline-block h-4 w-4" />
            {exercise.reps}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Weight className="h-5 w-5" />
          <span>{exercise.weight}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleDone} className="h-5 w-5">
          {done ? <CheckSquare /> : <Square />}
        </Button>
      </CardContent>
    </Card>
  );
}
