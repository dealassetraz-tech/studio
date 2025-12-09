
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PriceHistoryItem = {
  date: string;
  price: string;
  type?: string;
  growth?: string;
};

type PricePaidHistoryProps = {
  history: PriceHistoryItem[];
};

export function PricePaidHistory({ history }: PricePaidHistoryProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Price Paid History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell className="text-green-600 font-semibold">{item.growth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 bg-green-50/50 border border-green-200 rounded-lg p-4 flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">Total Appreciation</p>
                <p className="text-2xl font-bold text-green-600">+359.5%</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Since First Sale</p>
                <p className="text-2xl font-bold text-foreground">26 years</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
