import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { WorkoutCard } from "@/components/workout-card";
import { cn } from "@/lib/utils";
import { workouts } from "@/lib/workout-mock";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="container flex max-w-4xl items-center justify-end pt-14">
        <ThemeToggle />
      </header>

      <main className="container flex max-w-xl flex-col py-10">
        <h1 className="pb-10 text-5xl font-extrabold">
          Choose
          <br />
          Your
          <br />
          Workout
        </h1>

        <section className="flex flex-col gap-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </section>

        <Link href="/workout/new" className={cn(buttonVariants(), "mt-10")}>
          Novo Treino
        </Link>
      </main>
    </>
  );
}
