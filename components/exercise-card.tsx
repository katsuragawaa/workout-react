import { CheckSquare, Repeat2, Square, Weight, X } from "lucide-react";
import { Badge } from "./ui/badge";
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
  done: boolean;
};

export default function ExerciseCard({ exercise, done }: ExerciseCardProps) {
  return (
    <Card className="flex-1">
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
        {done ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
      </CardContent>
    </Card>
  );
}
