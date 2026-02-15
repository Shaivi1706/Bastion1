
"use client"

import * as React from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Shield, TrendingDown, Layers, Database, Activity } from "lucide-react"

const healthData = [
  { name: 'Mon', score: 98 },
  { name: 'Tue', score: 98 },
  { name: 'Wed', score: 97 },
  { name: 'Thu', score: 92 },
  { name: 'Fri', score: 88 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 90 },
];

const nullData = [
  { name: 'Table A', nulls: 5 },
  { name: 'Table B', nulls: 2 },
  { name: 'Table C', nulls: 15 },
  { name: 'Table D', nulls: 8 },
  { name: 'Table E', nulls: 0 },
];

export default function DashboardOverview() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Last scan: 2 mins ago</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schema Version</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v1.4.2</div>
            <p className="text-xs text-muted-foreground">Updated 2h ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drift Status</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2 Critical</div>
            <p className="text-xs text-muted-foreground">Breaking changes detected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">88%</div>
            <p className="text-xs text-muted-foreground">-4% since yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Data Health Trend</CardTitle>
            <CardDescription>Daily quality score over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "8px" }}
                    itemStyle={{ color: "#F9FAFB" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "#ffffff" }} activeDot={{ r: 6, fill: "#ffffff" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Null Rate By Table</CardTitle>
            <CardDescription>Top tables with missing values.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nullData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} width={80} />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted)/0.2)" }}
                    contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "8px" }}
                    itemStyle={{ color: "#F9FAFB" }}
                    labelStyle={{ color: "#F9FAFB" }}
                  />
                  <Bar dataKey="nulls" fill="#ffffff" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}