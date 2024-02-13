type WorkoutPageProps = {
  params: { id: string };
};

export default function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = params;

  return (
    <div>
      <h1>Workout Page ID: {id}</h1>
    </div>
  );
}
