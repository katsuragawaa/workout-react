import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WorkoutCard } from "@/components/workout-card";
import { workouts } from "@/lib/workout-mock";

export default function Home() {
  return (
    <>
      <nav className="container flex max-w-4xl items-center justify-end pt-14">
        <ThemeToggle />
      </nav>

      <main className="container flex min-h-screen max-w-xl flex-col py-14">
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

        <Button className="mt-10">New Workout</Button>
      </main>
    </>
  );
}
