import { buttonVariants } from "@/components/ui/button";
import { WorkoutDialogForm } from "@/components/workout-dialog-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewWorkout() {
  return (
    <>
      <header className="container flex max-w-4xl items-center justify-between pt-14">
        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href="/">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </header>

      <main className="container flex max-w-xl flex-col py-10">
        <h3 className="text-lg font-medium">Workout</h3>
        <p className="pb-6 text-sm text-muted-foreground">Plan your workout.</p>

        <WorkoutDialogForm />
      </main>
    </>
  );
}
