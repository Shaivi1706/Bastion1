
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Plus, Filter, ArrowUpDown } from "lucide-react"

const schemaTables = [
    { name: "users", type: "table", columns: 12, rows: "1.2M", updated: "2h ago", status: "Active" },
    { name: "orders", type: "table", columns: 8, rows: "4.5M", updated: "5m ago", status: "Active" },
    { name: "products", type: "table", columns: 15, rows: "50k", updated: "1d ago", status: "Drift" },
    { name: "transactions", type: "table", columns: 22, rows: "8.9M", updated: "1h ago", status: "Active" },
    { name: "audit_logs", type: "table", columns: 6, rows: "12M", updated: "10s ago", status: "Active" },
    { name: "shipping_events", type: "view", columns: 9, rows: "-", updated: "3d ago", status: "Stale" },
]

export default function SchemaPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Schema Explorer</h2>
                    <p className="text-muted-foreground">Version v1.4.2 • Snapshot taken 2h ago</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button><Plus className="mr-2 h-4 w-4" /> New Snapshot</Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Tables & Views</CardTitle>
                        <div className="relative w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search tables..." className="pl-8" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Columns</TableHead>
                                <TableHead>Row Count</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {schemaTables.map((table) => (
                                <TableRow key={table.name} className="cursor-pointer">
                                    <TableCell className="font-medium text-primary">{table.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal">{table.type}</Badge>
                                    </TableCell>
                                    <TableCell>{table.columns}</TableCell>
                                    <TableCell>{table.rows}</TableCell>
                                    <TableCell>{table.updated}</TableCell>
                                    <TableCell>
                                        <Badge variant={table.status === 'Active' ? 'outline' : table.status === 'Drift' ? 'destructive' : 'secondary'} className={table.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                                            {table.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
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
