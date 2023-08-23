import * as React from "react";
import { api } from "@/services/api";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { parseISO, getWeek } from "date-fns";

interface CA {
  amount: number;
  period: Date;
  unit: string;
}

interface Productivity {
  amount: number;
  period: Date;
  unit: string;
}

export function Overview() {
  const [CA, setCA] = React.useState<CA[]>([]);
  const [productivity, setProductivity] = React.useState<Productivity[]>([]);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      await api.getCA("2023-01-01", "2023-12-31").then((res) => {
        setCA(res.ca);
      });
      await api.getProductivity("2023-01-01", "2023-12-31").then((res) => {
        setProductivity(res.productivity);
      });
    };
    fetchMetrics();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={CA}>
        <XAxis
          dataKey="period"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `S${getWeek(parseISO(value))}`}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="amount" fill="#007FFF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
