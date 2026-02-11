
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Key, Globe, Shield, User, Lock } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage organization configuration and security preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Archestra Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" /> Orchestrator Connection
                        </CardTitle>
                        <CardDescription>Configure how Bastion connects to your Archestra instance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Archestra API URL</label>
                            <Input placeholder="https://api.archestra.internal:8080" defaultValue="https://api.archestra.prod.internal" />
                            <p className="text-xs text-muted-foreground">The endpoint reachable by the Bastion control plane.</p>
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">API Key</label>
                            <div className="flex gap-2">
                                <Input type="password" value="sk_live_MkQl..." readOnly className="font-mono text-muted-foreground" />
                                <Button variant="outline">Rotate</Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4 bg-muted/50 flex justify-between">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"> ● Connected</Badge>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" /> Security & Encryption
                        </CardTitle>
                        <CardDescription>Manage keys used for encrypting stored schema snapshots.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">At-Rest Encryption</h4>
                                <p className="text-sm text-muted-foreground">AES-256 encryption enabled for all sensitive metadata.</p>
                            </div>
                            <Badge>Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">MCP Execution Sandbox</h4>
                                <p className="text-sm text-muted-foreground">Enforce read-only permissions for all agents.</p>
                            </div>
                            <div className="flex items-center h-6">
                                {/* Toggle Switch Placeholder */}
                                <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
