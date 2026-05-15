"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { regionQuality } from "@/lib/data";

export function RegionChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regionQuality}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e2ee" />
          <XAxis dataKey="region" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="lease" fill="#1d9bf0" radius={[6, 6, 0, 0]} />
          <Bar dataKey="finance" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
