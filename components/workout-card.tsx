import { cn } from "@/lib/utils";
import { Workout } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type WorkoutCardProps = {
  workout: Workout & { description: string };
};

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const { id, name, description } = workout;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1.5">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <Link className={cn(buttonVariants({ variant: "outline", size: "icon" }), "min-w-10")} href={`/workout/${id}`}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>
    </Card>
  );
}
