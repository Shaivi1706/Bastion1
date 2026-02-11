
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
    { table: "users", column: "email", metric: "Uniqueness", score: 100, status: "Good" },
    { table: "users", column: "phone", metric: "Nulls", score: 85, status: "Warning" },
    { table: "orders", column: "total", metric: "Validity", score: 99, status: "Good" },
    { table: "products", column: "sku", metric: "Uniqueness", score: 92, status: "Good" },
    { table: "audit_logs", column: "timestamp", metric: "Freshness", score: 100, status: "Good" },
]

const freshnessData = [
    { time: '00:00', latency: 120 },
    { time: '04:00', latency: 130 },
    { time: '08:00', latency: 500 }, // spike
    { time: '12:00', latency: 140 },
    { time: '16:00', latency: 135 },
    { time: '20:00', latency: 125 },
];

export default function QualityPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Data Quality</h2>
                    <p className="text-muted-foreground">Column-level health metrics and freshness tracking.</p>
                </div>
                <Button>Run Quality Scan</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Freshness Anomaly Detection</CardTitle>
                        <CardDescription>Latency in data arrival (ms) over 24h.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={freshnessData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="time" stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px' }}
                                        itemStyle={{ color: '#F9FAFB' }}
                                        labelStyle={{ color: '#F9FAFB' }}
                                    />
                                    <Line type="step" dataKey="latency" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Completeness Overview</CardTitle>
                        <CardDescription>Distribution of null values across key tables.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground">
                            {/* Placeholder for a Bar Chart or similar */}
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: 'Users', val: 95 },
                                    { name: 'Orders', val: 99 },
                                    { name: 'Products', val: 88 },
                                    { name: 'Logs', val: 100 },
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" stroke="#E5E7EB" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px' }}
                                        itemStyle={{ color: '#F9FAFB' }}
                                        labelStyle={{ color: '#F9FAFB' }}
                                    />
                                    <Bar dataKey="val" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Column Health Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Table</TableHead>
                                <TableHead>Column</TableHead>
                                <TableHead>Metric</TableHead>
                                <TableHead>Score</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{s.table}</TableCell>
                                    <TableCell>{s.column}</TableCell>
                                    <TableCell>{s.metric}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${s.score}%` }} />
                                            </div>
                                            <span className="text-xs">{s.score}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={s.status === 'Good' ? 'outline' : 'destructive'} className={s.status === 'Good' ? 'text-green-600 bg-green-50 border-green-200' : ''}>
                                            {s.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
