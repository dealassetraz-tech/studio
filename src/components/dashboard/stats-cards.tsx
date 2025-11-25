import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, CheckCircle, Clock, FileText, Users } from "lucide-react";

const stats = [
  {
    title: "Total Verifications",
    value: "1,250",
    change: "+12%",
    changeType: "increase",
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    iconBg: "bg-blue-100",
  },
  {
    title: "Success Rate",
    value: "97.3%",
    change: "+0.3% improvement",
    changeType: "increase",
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    iconBg: "bg-green-100",
  },
  {
    title: "Avg Processing Time",
    value: "2.1s",
    change: "-0.2s faster",
    changeType: "decrease",
    icon: <Clock className="w-6 h-6 text-yellow-500" />,
    iconBg: "bg-yellow-100",
  },
  {
    title: "Active Users",
    value: "152",
    change: "+8 new today",
    changeType: "increase",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    iconBg: "bg-purple-100",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.changeType === "increase" ? (
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
