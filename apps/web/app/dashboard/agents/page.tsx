
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Terminal, Play, RefreshCw, CheckCircle2 } from "lucide-react"

const logs = [
    { timestamp: "12:00:01", level: "INFO", message: "Starting metadata ingestion agent..." },
    { timestamp: "12:00:05", level: "INFO", message: "Connecting to database postgres://prod-db..." },
    { timestamp: "12:00:12", level: "INFO", message: "Extracted 42 tables, 350 columns." },
    { timestamp: "12:00:15", level: "INFO", message: "Running semantic interpretation..." },
    { timestamp: "12:00:18", level: "SUCCESS", message: "Schema snapshot stored: v1.4.2" },
]

export default function AgentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Active Agents</h2>
                    <p className="text-muted-foreground">Monitor the status and logs of your Archestra-powered agents.</p>
                </div>
                <Button><Play className="mr-2 h-4 w-4" /> Trigger Metadata Scan</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Metadata Ingestion</CardTitle>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Idle</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Success</div>
                        <p className="text-xs text-muted-foreground">Last run: 2h ago</p>
                        <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '100%' }} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Drift Detection</CardTitle>
                        <Badge variant="outline">Scheduled</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Waiting</div>
                        <p className="text-xs text-muted-foreground">Next run: in 40 mins</p>
                        <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                            {/* Progress bar placeholder */}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Semantic AI</CardTitle>
                        <Badge variant="secondary">Processing</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600 animate-pulse">Running...</div>
                        <p className="text-xs text-muted-foreground">Analyzing column descriptions</p>
                        <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-1/2 animate-pulse" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-black text-white font-mono text-sm border-zinc-800">
                <CardHeader className="border-b border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-white">
                            <Terminal className="h-4 w-4 text-green-500" />
                            Live Agent Logs
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="h-6 text-zinc-400 hover:text-white">
                            <RefreshCw className="h-3 w-3 mr-1" /> Clear
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 h-[300px] overflow-y-auto">
                    <div className="space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-zinc-500 shrink-0">{log.timestamp}</span>
                                <span className={
                                    log.level === 'INFO' ? 'text-blue-400' :
                                        log.level === 'SUCCESS' ? 'text-green-400' : 'text-zinc-300'
                                }>[{log.level}]</span>
                                <span className="text-zinc-300">{log.message}</span>
                            </div>
                        ))}
                        <div className="flex gap-4 animate-pulse">
                            <span className="text-zinc-500 shrink-0">12:00:19</span>
                            <span className="text-blue-400">[INFO]</span>
                            <span className="text-zinc-300">Generating preventing maintenance report..._</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
