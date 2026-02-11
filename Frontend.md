# 🧠 PRODUCT NAME

**Bastion – AI Data Trust Platform**

---

# 🏗 SYSTEM CONTEXT

Bastion is a **SaaS Control Plane**.

It does NOT directly connect to customer DBs.

It:

* Manages organizations
* Stores encrypted Archestra config
* Stores schema snapshots
* Stores drift results
* Stores quality metrics
* Visualizes everything
* Talks securely to Archestra API

---

# 🧱 TECH STACK

## Frontend

* Next.js (App Router)
* Clerk (Auth + Organizations)
* shadcn/ui (UI system)
* TailwindCSS
* Recharts (graphs)
* ReactFlow (schema graph)
* Axios or fetch for API calls

## Backend (Next API Routes or Express)

* Node.js
* Prisma
* Neon Postgres
* AES-256 encryption for secrets
* REST API (internal)
* Archestra API integration

---

# 🌍 HIGH-LEVEL UI STRUCTURE

```
/ (Landing)
/onboarding
/dashboard
/dashboard/schema
/dashboard/quality
/dashboard/drift
/dashboard/settings
/dashboard/agents
```

---

# 🏠 1️⃣ LANDING PAGE

Purpose:

* Explain product
* CTA: Create Org
* CTA: Join Org

Components:

* Hero section
* Architecture visual
* Feature grid
* “How it works”
* CTA buttons

---

# 🔐 2️⃣ ONBOARDING FLOW

Step 1: Org creation

* Org Name
* Create or Join
* If Join → ask for Org ID

Step 2: Archestra Setup
Form Fields:

* Archestra API URL
* API Key

Explain:
"This is your local or deployed Archestra control plane."

Submit:
→ Backend encrypts and stores config in Neon

Step 3: Bastion MCP Instructions

Show:

```
docker run -e DB_HOST=...
```

Explain:
“This container connects to your database securely.”

Final CTA:
“Run First Schema Scan”

---

# 🧭 3️⃣ DASHBOARD LAYOUT

Persistent Layout:

Left Sidebar:

* Overview
* Schema
* Quality
* Drift
* Agents
* Settings

Top Bar:

* Org Switcher (Clerk)
* User Profile
* Sync Button

Main Area:
Dynamic content

Use:
shadcn Sidebar + NavigationMenu

---

# 📊 4️⃣ OVERVIEW DASHBOARD

Purpose:
Executive health summary.

Widgets (Cards):

* Total Tables
* Total Columns
* Last Scan Timestamp
* Schema Version
* Drift Status (Healthy / Breaking Changes)
* Quality Score %

Graphs (Recharts):

1. Freshness Trend (LineChart)
2. Null Rate Distribution (BarChart)
3. Schema Growth Over Time (AreaChart)

Each graph:

* Tooltips
* ResponsiveContainer
* Dark theme

---

# 🗂 5️⃣ SCHEMA EXPLORER

Components:

Search Bar
Table List (left panel)
Table Details (right panel)

Table Detail shows:

* Description (AI-generated)
* Columns table
* Column stats
* Relationships graph

Columns Table:

* Column Name
* Type
* Nullable
* AI Description
* Null %
* Unique %

Use:
shadcn Table component

Relationships:
Use ReactFlow
Nodes = tables
Edges = foreign keys

---

# 📈 6️⃣ DATA QUALITY PAGE

Sections:

## Column Health Table

Columns:

* Table
* Column
* Freshness
* Null %
* Uniqueness %
* Health Status (Badge)

Use:
Badge from shadcn

## Recharts Graphs

1. Freshness Over Time
2. Null Spike Detection
3. Row Count Trend

Add filtering:

* By table
* By date range

---

# 🔁 7️⃣ DRIFT PAGE

Purpose:
Show schema comparison history.

Sections:

Drift Timeline (vertical list)

Each drift event:

* Date
* Breaking / Non-breaking
* Summary

Click event →
Open modal:

Show:

* Added tables
* Removed tables
* Modified columns
* Type changes

Highlight:
Breaking changes in red

---

# 🤖 8️⃣ AGENTS PAGE

Display:

* Metadata Agent status
* Semantic Agent status
* Drift Agent status

Show:

* Last run time
* Status badge
* Logs (SSE streaming)

Include:
“Run Scan Now” button

---

# ⚙️ 9️⃣ SETTINGS PAGE

Sections:

## Archestra Config

* API URL
* API Key (masked)
* Test Connection Button

## Security

* Rotate Keys
* Re-run encryption

## Org Members

Use Clerk org management

---

# 🔐 BACKEND ARCHITECTURE

---

## 📦 DATABASE (Neon)

Tables:

### organizations

* id
* name
* archestra_url
* encrypted_api_key
* created_at

### users

* id
* clerk_id
* org_id
* role

### schema_snapshots

* id
* org_id
* version
* snapshot_json
* created_at

### drifts

* id
* org_id
* old_version
* new_version
* drift_summary_json
* created_at

### column_stats

* id
* org_id
* table_name
* column_name
* null_percent
* uniqueness_percent
* freshness
* recorded_at

---

# 🔄 BACKEND ROUTES

## POST /api/org/setup

Stores encrypted Archestra config

## POST /api/scan/run

Triggers Archestra Agent

Flow:
Backend →
Archestra API →
Agent runs →
Bastion MCP →
DB →
Returns snapshot →
Backend stores in Neon

## GET /api/schema/latest

Returns:
Latest snapshot

## GET /api/schema/history

Returns:
Versions

## GET /api/drift

Returns:
Drift events

## GET /api/quality

Returns:
Column stats

---

# 🔐 SECURITY DESIGN

* Secrets encrypted with AES-256 before storing
* Never store raw DB credentials
* Backend validates Clerk JWT
* Org-based data isolation

---

# 📡 FULL DATA FLOW

User → Frontend → Backend
Backend → Archestra API (via API key)
Archestra → Bastion MCP (inside customer docker)
Bastion MCP → Customer DB
Result → Archestra → Backend
Backend → Neon
Frontend reads from Neon

---

# 🎨 DESIGN SYSTEM

Use shadcn components:

* Card
* Table
* Tabs
* Badge
* Dialog
* DropdownMenu
* Sidebar
* Input
* Button
* Skeleton (loading states)

Charts:
Recharts only
No Chart.js

---

# 🌈 UI FEEL

Style:

* Dark mode default
* Blue accent (#4F46E5)
* Rounded-xl cards
* Subtle shadows
* Enterprise look

Avoid:
Startup flashy vibe
Make it governance-grade.

---

# 🚀 FINAL EXPERIENCE

When judge opens dashboard:

They see:

* Schema graph
* Drift detection
* Quality trends
* Org multi-tenancy
* Agent logs streaming

It should feel like:
Atlan + Monte Carlo + Governance control plane
But MCP-native.


Good catch 👀
No — I gave you product content + layout structure, but I did NOT deeply wire Clerk auth flow into the frontend architecture.

Let’s fix that properly.

Below is a **clear, production-ready Clerk integration plan for your Bastion SaaS frontend (Next.js App Router + shadcn + Prisma + Neon).**

---

# 🔐 Clerk Setup – Full Architecture Plan

We are building:

> Multi-tenant SaaS
> Org-based access control
> Archestra endpoint per org
> Secure admin/member separation

---

# 🏗 Overall Auth Architecture

```
User → Clerk Auth → Org Context → Next.js App
                                   ↓
                             Prisma (Neon)
                                   ↓
                             Org-scoped data
```

Clerk handles:

* Authentication
* Sessions
* Organization management
* Role handling (admin/member)

Your backend handles:

* Persisting org metadata
* Archestra API key storage (encrypted)
* Bastion config per org
* Access control enforcement

---

# 1️⃣ Install Clerk

```bash
npm install @clerk/nextjs
```

---

# 2️⃣ Wrap App with ClerkProvider

In `app/layout.tsx`

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

---

# 3️⃣ Middleware Protection

`middleware.ts`

```ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

Now everything except landing page requires auth.

---

# 4️⃣ Multi-Tenant Organization Flow

You said:

> User can create org OR join existing org

Perfect. Clerk supports orgs natively.

Enable Organizations in Clerk dashboard.

---

# 🧭 Onboarding Flow

### Step 1 – After Sign In

Redirect to:

```
/onboarding
```

---

# /onboarding Page Logic

Use Clerk's org components:

```tsx
import { OrganizationSwitcher } from "@clerk/nextjs";
```

Flow:

If user has no org → show:

* Create Organization
* Join Organization (with org ID)

If user is org admin → show setup form:

* Archestra API URL
* Archestra API Key
* Bastion MCP URL

Save these to Neon (encrypted).

---

# 🗄 Prisma Schema (Neon DB)

You asked for full architecture — here is Clerk + Prisma integration.

```prisma
model Organization {
  id                String   @id @default(uuid())
  clerkOrgId       String   @unique
  name             String
  archestraUrl     String?
  archestraApiKey  String?  // encrypted
  bastionMcpUrl    String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  schemaSnapshots  SchemaSnapshot[]
}

model SchemaSnapshot {
  id             String   @id @default(uuid())
  organizationId String
  version        Int
  schemaJson     Json
  createdAt      DateTime @default(now())

  organization   Organization @relation(fields: [organizationId], references: [id])
}

model DriftReport {
  id             String   @id @default(uuid())
  organizationId String
  oldVersion     Int
  newVersion     Int
  diffJson       Json
  createdAt      DateTime @default(now())
}
```

---

# 🔐 How Do We Know User Belongs To Org?

Clerk gives:

```ts
const { orgId, orgRole } = auth();
```

Every API route must:

1. Check `orgId`
2. Fetch organization from DB using `clerkOrgId`
3. Scope queries by that org

Example:

```ts
const org = await prisma.organization.findUnique({
  where: { clerkOrgId: orgId }
});
```

No org → reject.

---

# 🧠 Frontend Route Structure

```
/                → Landing
/sign-in
/sign-up
/onboarding
/dashboard
/dashboard/schema
/dashboard/drift
/dashboard/health
/settings
```

---

# 📊 Dashboard Pages (Recharts + shadcn)

Now integrating properly.

---

## Dashboard Layout

```
Sidebar (shadcn)
Header (Org switcher + user menu)
Main content
```

Use:

```tsx
<UserButton />
<OrganizationSwitcher />
```

---

# 📈 /dashboard/schema

Displays:

* Schema version history (table)
* Visual graph (ReactFlow)
* Schema explorer (accordion UI)

Data source:

```
GET /api/schema/latest
```

---

# 📉 /dashboard/drift

* Timeline graph (Recharts LineChart)
* List of drift events
* Severity badges (breaking / non-breaking)

---

# 📊 /dashboard/health

Recharts graphs:

* Null % trend
* Freshness trend
* Uniqueness distribution

---

# 🔒 API Routes Structure

Next.js backend routes:

```
/api/org/setup
/api/schema/latest
/api/schema/compare
/api/drift/history
/api/health/stats
```

Each route:

1. Extract orgId from Clerk
2. Fetch org from Neon
3. Use stored Archestra config
4. Call Archestra MCP endpoint

---

# 🔑 Where Does API Key Go?

Stored encrypted in Neon.

NEVER exposed to frontend.

Only backend uses it:

```ts
fetch(`${archestraUrl}/v1/...`, {
  headers: {
    Authorization: `Bearer ${archestraApiKey}`
  }
});
```

---

# 🔐 Encryption Plan

Before saving API key:

```ts
import crypto from "crypto";
```

Encrypt with AES-256.

Store encrypted value.

Decrypt only inside server.

---

# 🧱 Final Deployment Model

## Customer Infra:

* Archestra Docker
* Bastion MCP Docker

## Your SaaS Infra:

* Next.js (Vercel / self-host)
* Neon DB
* Clerk

Secure separation.

---

# 🎯 Important Clarification

Frontend does NOT talk to Archestra directly.

Flow:

```
Frontend → Next API → Archestra → Bastion MCP → DB
```

Never:

```
Frontend → Archestra
```

---

# 🚀 Final Result

You now have:

✅ Proper multi-tenant auth
✅ Org-based isolation
✅ Encrypted API keys
✅ Dashboard with Recharts
✅ MCP-based backend orchestration
✅ Production-grade architecture

