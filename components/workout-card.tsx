import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface WorkoutCardProps {
  title: string;
  description: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  );
};
