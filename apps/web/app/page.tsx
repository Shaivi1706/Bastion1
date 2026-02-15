"use client"

import Link from "next/link"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Zap, Lock, BarChart3, TrendingUp, AlertTriangle, Layers, ArrowRight, Github, Twitter, Linkedin } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const driftData = [
  { name: 'Mon', drift: 0 },
  { name: 'Tue', drift: 0 },
  { name: 'Wed', drift: 2 },
  { name: 'Thu', drift: 5 },
  { name: 'Fri', drift: 8 },
  { name: 'Sat', drift: 12 },
  { name: 'Sun', drift: 15 },
];

const healthData = [
  { name: 'Week 1', score: 98 },
  { name: 'Week 2', score: 97 },
  { name: 'Week 3', score: 92 },
  { name: 'Week 4', score: 88 }, // Drop due to drift
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground animate-in fade-in duration-500">

      {/* Navbar */}
      <header className="px-6 h-16 flex items-center border-b justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Shield className="h-6 w-6 text-primary" />
          <span>Bastion</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#security" className="hover:text-primary transition-colors">Security</Link>
        </nav>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">Log In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="mr-2">Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="py-24 px-6 md:px-12 lg:px-24 text-center max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-6 py-1 px-4 text-sm border-primary/20 text-primary bg-primary/5">
            🚀 Now in Private Beta
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Bring <span className="text-primary">Deterministic Trust</span> to Your Data Infrastructure
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Bastion is an AI-powered data control plane that monitors schema integrity, detects drift, and generates explainable metadata — securely through MCP-based agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              Create Organization <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Join Existing Organization
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Built for teams running <span className="font-semibold text-foreground">Archestra-powered agents</span> in production.
          </p>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-6 bg-muted/30 border-y">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Modern Data Stacks Move Fast. Trust Breaks Faster.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nobody enforces schema integrity at the control-plane level. Traditional tools detect issues too late.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Layers, title: "Silent Schema Drift", desc: "Columns change types or disappear without warning, breaking downstream dashboards." },
                { icon: AlertTriangle, title: "Broken Observability", desc: "Governance tools only alert you *after* the pipeline has failed." },
                { icon: Lock, title: "No Control Plane", desc: "AI metadata generation is often hallucinated and non-deterministic." }
              ].map((item, i) => (
                <Card key={i} className="bg-background border-none shadow-md hover:shadow-lg transition-all pt-6">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section (Recharts) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Governance You Can See. Integrity You Can Measure.</h2>
            <p className="text-muted-foreground">Real-time visualization of your data health and schema drift.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-background to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Schema Drift Velocity
                </CardTitle>
                <CardDescription>Detected changes over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={driftData}>
                    <defs>
                      <linearGradient id="colorDrift" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "8px" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                    <Area type="monotone" dataKey="drift" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorDrift)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-primary/10 bg-gradient-to-br from-background to-muted/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Data Health Score
                </CardTitle>
                <CardDescription>Impact of drift on quality metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "8px" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4, fill: "#ffffff" }} activeDot={{ r: 6, fill: "#ffffff" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-6 bg-primary/5 border-y">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How Bastion Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Deploy Archestra", desc: "Run Archestra locally or in your Kubernetes cluster." },
                { step: "2", title: "Deploy MCP", desc: "Deploy Bastion MCP container securely inside your infra." },
                { step: "3", title: "Connect SaaS", desc: "Register endpoint. Orchestration happens via MCP." },
                { step: "4", title: "Enforce Integrity", desc: "Bastion analyzes drift and visualizes data health." }
              ].map((item, i) => (
                <div key={i} className="relative pl-8 md:pl-0 md:text-center group">
                  <div className="absolute left-0 top-0 md:relative md:mx-auto h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-5 left-1/2 w-full h-[2px] bg-border -z-10" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Bastion Is Your Schema Integrity Layer</h2>
            <p className="text-muted-foreground">All without exposing database credentials to the SaaS layer.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Schema Versioning", desc: "Full schema snapshots, historical tracking, and visual explorer." },
              { title: "Drift Detection Agent", desc: "Compares snapshots to detect breaking changes and type modifications." },
              { title: "Column-Level Quality", desc: "Null percentage tracking, freshness metrics, and uniqueness checks." },
              { title: "AI Semantic Layer", desc: "Deterministic descriptions. No 'vibes-based' hallucinations." },
              { title: "Secure MCP Execution", desc: "No DB access from SaaS. Queries execute inside your infra." },
              { title: "Governance Ready", desc: "Designed for internal enterprise environments before audits." }
            ].map((feature, i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-6 bg-muted/30 border-y">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Not a Data Catalog. Not Just Observability.</h2>
            <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 p-4 bg-muted/50 font-medium">
                <div>Traditional Tools</div>
                <div className="text-primary">Bastion</div>
              </div>
              {[
                ["Discovery-first", "Integrity-first"],
                ["Late anomaly detection", "Preemptive drift detection"],
                ["SaaS connects to DB", "DB stays inside your infra"],
                ["AI suggestions", "Deterministic AI pipelines"],
                ["Passive metadata", "Enforced control plane"]
              ].map(([trad, bastion], i) => (
                <div key={i} className="grid grid-cols-2 p-4 border-t hover:bg-muted/10 transition-colors">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive/50" /> {trad}
                  </div>
                  <div className="font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" /> {bastion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 text-center bg-gradient-to-b from-background to-primary/5">
          <h2 className="text-4xl font-bold mb-6">Stop Debugging Broken Dashboards.</h2>
          <p className="text-xl text-muted-foreground mb-10">Start Enforcing Data Integrity today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 text-lg">
              Create Organization
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg">
              Join Organization
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted-foreground font-medium">
            Built on Archestra. Powered by MCP. Designed for Production.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-muted/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>Bastion</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Docs</Link>
            <Link href="#" className="hover:text-primary transition-colors">Security</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Bastion Data Inc. All rights reserved.
        </div>
      </footer>
    </div>
  )
}