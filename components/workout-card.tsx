import { ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

interface WorkoutCardProps {
  id: number;
  title: string;
  description: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ id, title, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <Link className={buttonVariants({ variant: "outline", size: "icon" })} href={`/workout/${id}`}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>
    </Card>
  );
};
