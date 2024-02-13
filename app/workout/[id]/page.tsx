import { ExerciseCard } from "@/components/exercise-card";
import { buttonVariants } from "@/components/ui/button";
import { exercises, workouts } from "@/lib/workout-mock";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type WorkoutPageProps = {
  params: { id: string };
};

export default function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;
  const workout = workouts.find((workout) => workout.id === Number(id)) || { title: "Workout not found" };

  return (
    <>
      <nav className="container max-w-4xl pt-14">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </nav>

      <main className="container flex min-h-screen max-w-2xl flex-col py-14">
        <h1 className="pb-10 text-5xl font-extrabold">{workout.title}</h1>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </main>
    </>
  );
}
