import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { workouts } from "@/lib/workout-mock";
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

      <div className="flex flex-row items-center justify-between gap-4">
        <Card className="flex-1">
          <CardHeader>
            <Badge className="w-fit" variant="outline">
              Peitoral
            </Badge>
            <CardTitle>Supino reto</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <Repeat2 className="h-5 w-5" />
              <span>
                3
                <X className="mb-0.5 inline-block h-4 w-4" />
                10
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Weight className="h-5 w-5" />
              <span>20</span>
            </div>
            <Square className="h-5 w-5" />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <Badge className="w-fit" variant="outline">
              Costas
            </Badge>
            <CardTitle>Puxada frente aberta</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <Repeat2 className="h-5 w-5" />
              <span>
                3
                <X className="mb-0.5 inline-block h-4 w-4" />
                10
              </span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Weight className="h-5 w-5" />
              <span>34</span>
            </div>
            <CheckSquare className="h-5 w-5" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
