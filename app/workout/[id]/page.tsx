import { ExerciseCard } from "@/components/exercise-card";
import { TimerDrawer } from "@/components/timer-drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exercises, workouts } from "@/lib/workout-mock";
import { ArrowLeft, Timer } from "lucide-react";
import Link from "next/link";

type WorkoutPageProps = {
  params: { id: string };
};

export default function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;
  const workout = workouts.find((workout) => workout.id === Number(id)) || { title: "Workout not found" };

  const Trigger = <Button className="mt-14 w-48 self-center">Descansar</Button>;
  const IconTrigger = (
    <Button size="icon">
      <Timer className="h-4 w-4" />
    </Button>
  );

  return (
    <>
      <nav className="container flex max-w-4xl items-center justify-between pt-14">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <TimerDrawer trigger={IconTrigger} />
      </nav>

      <main className="container flex min-h-screen max-w-2xl flex-col py-14">
        <h1 className="text-5xl font-extrabold">{workout.title}</h1>

        <div className="grid grid-cols-1 gap-3 pt-10 md:grid-cols-2">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>

        <TimerDrawer trigger={Trigger} />

        <Link className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-48 self-center")} href={`/workout/${id}`}>
          <span>Editar treino</span>
        </Link>
      </main>
    </>
  );
}
