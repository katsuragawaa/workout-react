import { WorkoutCard } from "@/components/workout-card";

export default function Home() {
  const workouts = [
    { id: 1, title: "Treino A", description: "Peito, ombros, triceps e abs" },
    { id: 2, title: "Treino B", description: "Costas, lombar e biceps" },
    { id: 3, title: "Treino C", description: "Pernas e glúteos" },
  ];

  return (
    <main className="container flex max-w-xl flex-col">
      <h1 className="pb-10 pt-14 text-5xl font-extrabold">
        Choose
        <br />
        Your
        <br />
        Workout
      </h1>

      <section className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} title={workout.title} description={workout.description} />
        ))}
      </section>
    </main>
  );
}
