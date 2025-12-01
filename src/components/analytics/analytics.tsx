import { Charts } from "./charts";
import { Stats } from "./stats";

export function Analytics() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold">Analytics Overview</h1>
                <p className="text-muted-foreground mt-1">
                    Track key metrics and performance indicators.
                </p>
            </div>
        </div>
        <Stats />
        <div className="mt-8">
          <Charts />
        </div>
    </div>
  );
}
