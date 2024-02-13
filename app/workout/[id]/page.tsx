import ExerciseCard from "@/components/exercise-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exercises, workouts } from "@/lib/workout-mock";
import { CheckSquare, Repeat2, Square, Weight, X } from "lucide-react";

type WorkoutPageProps = {
  params: { id: string };
};

export default function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;
  const workout = workouts.find((workout) => workout.id === Number(id)) || { title: "Workout not found" };

  return (
    <main className="container flex min-h-screen max-w-2xl flex-col">
      <h1 className="pb-10 pt-14 text-5xl font-extrabold">{workout.title}</h1>

      <div className="grid grid-cols-2 gap-3">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </main>
  );
}
