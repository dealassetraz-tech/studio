import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "2.1s",
    label: "Average Response Time",
    description: "15% faster than industry average",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    value: "99.9%",
    label: "System Uptime",
    description: "Exceeds SLA requirements",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    value: "97.3%",
    label: "AI Accuracy Rate",
    description: "Continuously improving",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

export function Stats() {
  return (
    <div className="grid gap-8 md:grid-cols-3 mt-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm font-medium text-muted-foreground mt-2">
              {stat.label}
            </p>
            <p className={`text-sm mt-1 text-green-600`}>
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
