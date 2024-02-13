import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { WorkoutCard } from "@/components/workout-card";
import { cn } from "@/lib/utils";
import { workouts } from "@/lib/workout-mock";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="container flex items-center justify-end">
        <ThemeToggle />
      </nav>

      <main className="container flex min-h-screen max-w-xl flex-col pt-14">
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
          New workout
        </Link>
      </main>
    </>
  );
}
