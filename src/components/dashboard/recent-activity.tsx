import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const activities = [
  {
    id: "TN123456789",
    status: "Verification Completed",
    time: "25 Nov 2025, 10:25 pm",
  },
  {
    id: "TN987654321",
    status: "Verification Processing",
    time: "25 Nov 2025, 10:15 pm",
  },
  {
    id: "TN555666777",
    status: "Certificate Issued",
    time: "25 Nov 2025, 10:00 pm",
  },
  {
    id: "TN111222333",
    status: "Verification Completed",
    time: "25 Nov 2025, 09:45 pm",
  },
];

export function RecentActivity() {
  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Recent Verification Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{activity.id}</p>
                  <p className="text-sm text-muted-foreground">{activity.status}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
