import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

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
        <Button>Ir</Button>
      </CardHeader>
    </Card>
  );
};
