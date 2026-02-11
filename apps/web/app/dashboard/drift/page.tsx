
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, ArrowRight, GitCommit, Search, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const driftEvents = [
    { id: 1, table: "products", type: "COLUMN_MODIFIED", severity: "HIGH", desc: "Column 'price' changed from DECIMAL(10,2) to TEXT", date: "Today, 10:42 AM" },
    { id: 2, table: "users", type: "COLUMN_ADDED", severity: "LOW", desc: "New column 'last_login_ip' added", date: "Yesterday, 2:15 PM" },
    { id: 3, table: "orders", type: "CONSTRAINT_DROPPED", severity: "MEDIUM", desc: "Foreign key fk_user_id dropped", date: "Feb 09, 2026" },
    { id: 4, table: "analytics", type: "TABLE_DROPPED", severity: "CRITICAL", desc: "Table 'daily_stats' was removed", date: "Feb 08, 2026" },
]

export default function DriftPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Drift Detection</h2>
                    <p className="text-muted-foreground">Monitor and resolve schema changes detected by Bastion Agents.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Timeline Column */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Drift Event Log</CardTitle>
                        <CardDescription>Recent schema deviations detected against the baseline.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {driftEvents.map((event) => (
                                <div key={event.id} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 bg-background
                                    ${event.severity === 'CRITICAL' || event.severity === 'HIGH' ? 'border-destructive text-destructive' : 'border-primary text-primary'}
                                `}>
                                            <AlertTriangle className="w-4 h-4" />
                                        </div>
                                        <div className="h-full w-[2px] bg-border -my-2" />
                                    </div>
                                    <div className="pb-8">
                                        <span className="text-sm text-muted-foreground">{event.date}</span>
                                        <h4 className="text-base font-semibold mt-1 flex items-center gap-2">
                                            {event.table}
                                            <Badge variant="outline" className="text-xs">{event.type}</Badge>
                                        </h4>
                                        <p className="text-sm mt-1">{event.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 bg-muted border-muted text-muted-foreground">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">Feb 01, 2026</span>
                                    <h4 className="text-base font-semibold mt-1">Baseline Established</h4>
                                    <p className="text-sm mt-1 text-muted-foreground">Initial schema snapshot v1.0.0 locked.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Severity Count */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Drift by Severity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> Critical</span>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500" /> High</span>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /> Medium</span>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /> Low</span>
                                    <span className="font-bold">5</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-primary">Resolve Drift</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">You have 3 unstacknowledged drift events that may impact downstream data products.</p>
                            <Button className="w-full">Review Changes <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
