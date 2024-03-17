import { Exercise, ExerciseData } from "@/types";
import { Beef, Minus, MoreVertical, Pencil, Repeat2, Trash2, X } from "lucide-react";
import { useState } from "react";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { ExerciseDialogForm } from "./exercise-dialog-form";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type ExerciseItemProps = {
  exercise: Exercise;
  workoutId: number;
  onSubmit: (exercise: ExerciseData) => void;
  onDelete: () => void;
};

const ExerciseDetails = ({ name, muscle, sets, reps }: ExerciseData) => (
  <div className="space-y-2">
    <h3 className="text-lg font-medium leading-5">{name}</h3>
    <div className="flex items-center text-xs">
      <div className="flex flex-row items-center gap-1">
        <Beef className="h-4 w-4" />
        {muscle}
      </div>
      <Minus className="h-4 w-4 rotate-90 transform" />
      <div className="flex flex-row items-center gap-1">
        <Repeat2 className="h-4 w-4" />
        <span>
          {sets}
          <X className="mb-0.5 inline-block h-3 w-3" />
          {reps}
        </span>
      </div>
    </div>
  </div>
);

export const ExerciseItem = ({ exercise, workoutId, onSubmit, onDelete }: ExerciseItemProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex flex-col justify-center rounded-md border p-4">
      <div className="flex items-center justify-between gap-4">
        <ExerciseDetails {...exercise} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="min-w-10">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setOpenForm(true)} className="flex items-center gap-2">
              <Pencil className="h-3 w-3" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)} className="flex items-center gap-2">
              <Trash2 className="h-3 w-3" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ExerciseDialogForm
          open={openForm}
          setOpen={setOpenForm}
          onSubmit={onSubmit}
          workoutId={workoutId}
          exercise={exercise}
        />
        <DeleteAlertDialog open={openAlert} setOpen={setOpenAlert} onConfirm={onDelete} />
      </div>
    </div>
  );
};
