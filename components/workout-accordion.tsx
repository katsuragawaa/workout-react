import { Exercise, ExerciseData, Workout } from "@/types";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { ExerciseItem } from "./exercise-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type WorkoutAccordionProps = {
  workouts: Workout[];
  openWorkout: (workout: Workout) => void;
  deleteWorkout: (workout: Workout) => void;
  exercises: Exercise[];
  openExercise: (workoutId: number) => void;
  loadExercises: (workoutId: number) => void;
  submitExercise: (exercise: ExerciseData) => void;
};

export const WorkoutAccordion = ({
  workouts,
  openWorkout,
  deleteWorkout,
  exercises,
  openExercise,
  loadExercises,
  submitExercise,
}: WorkoutAccordionProps) => {
  return (
    <Accordion type="single" collapsible onValueChange={(v) => loadExercises(Number(v))}>
      {workouts.map((workout) => (
        <AccordionItem key={workout.id} value={String(workout.id)}>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <AccordionTrigger className="w-full pb-4 text-start text-2xl font-bold">{workout.name}</AccordionTrigger>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => openWorkout(workout)} className="flex items-center gap-2">
                  <Pencil className="h-3 w-3" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteWorkout(workout)} className="flex items-center gap-2">
                  <Trash2 className="h-3 w-3" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <AccordionContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {exercises.map((exercise) => (
              <ExerciseItem key={exercise.id} exercise={exercise} workoutId={workout.id} onSubmit={submitExercise} />
            ))}

            <Button onClick={() => openExercise(workout.id)} variant="secondary" className="md:col-span-2">
              Novo exercício
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
