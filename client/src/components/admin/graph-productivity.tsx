import * as React from "react";
import { api } from "@/services/api";
import { LineChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { parseISO, getWeek } from "date-fns";

interface Productivity {
  amount: number;
  period: Date;
  unit: string;
}

export function GraphProductivity() {
  const [productivity, setProductivity] = React.useState<Productivity[]>([]);

  React.useEffect(() => {
    const fetchMetrics = async () => {
      await api.getProductivity("2023-01-01", "2023-12-31").then((res) => {
        setProductivity(res.productivity);
      });
    };
    fetchMetrics();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={productivity}>
      <CartesianGrid strokeDasharray="3 3" />
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
        <Line type="monotone" dataKey="amount" stroke="#FF700F" />
      </LineChart>
    </ResponsiveContainer>
  );
}
