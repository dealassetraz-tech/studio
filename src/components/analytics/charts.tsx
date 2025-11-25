import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

export function Charts() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Verification Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
            <BarChart className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              Interactive Chart Placeholder
            </p>
            <p className="text-sm text-muted-foreground/70">
              Demo: Verification trends over time
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Success Rate Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
            <PieChart className="w-12 h-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Pie Chart Placeholder</p>
            <p className="text-sm text-muted-foreground/70">
              Demo: Success rate breakdown
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
