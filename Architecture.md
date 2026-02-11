👉 Bastion (codename)
A multi-tenant AI Data Trust Platform
Frontend SaaS + Customer-hosted AI runtime (Archestra + MCP)

🧠 0. High-Level Architecture
🌍 Your SaaS (Fully Hosted)
Next.js (Frontend)
Next.js API Routes (Backend)
Prisma
Neon (Postgres)
Clerk (Auth + Organizations)
🏢 Customer Side
Archestra (Docker / K8s)
Bastion MCP (Docker)
Customer Database (Postgres/Snowflake/etc.)

🔁 Full Data Flow
User → Frontend (Next.js)
      → Backend (API route)
      → Neon (fetch org config)
      → Archestra (via API key)
      → Agent
      → Bastion MCP
      → Customer DB
      → Agent response
      → Backend
      → Neon (store snapshot/diff)
      → Frontend dashboard

This is enterprise-grade separation.

🏗 1. FRONTEND (Next.js + Clerk)
Pages
/sign-in
/sign-up
/organization-selection
/onboarding
/dashboard
   /overview
   /schema
   /drift
   /runs
   /settings


Clerk Setup
Use:
Clerk auth
Clerk Organizations
Roles: admin / member
Backend always reads:
const { orgId, orgRole, userId } = auth()

Never trust frontend org ID.

🏢 2. Neon + Prisma Architecture
We use:
Neon (Postgres)
Prisma ORM
JSONB for schema snapshots

Prisma Schema
organization (linked to Clerk orgId)
model Organization {
  id                String   @id @default(uuid())
  clerkOrgId        String   @unique
  name              String
  createdAt         DateTime @default(now())

  archestraConnection ArchestraConnection?
  schemaSnapshots     SchemaSnapshot[]
  schemaDiffs         SchemaDiff[]
  agentRuns           AgentRun[]
}


Archestra Connection
model ArchestraConnection {
  id              String   @id @default(uuid())
  organizationId  String   @unique
  organization    Organization @relation(fields: [organizationId], references: [id])

  baseUrl         String
  apiKeyEncrypted String
  createdAt       DateTime @default(now())
}


Schema Snapshot
model SchemaSnapshot {
  id              String   @id @default(uuid())
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])

  schemaJson      Json
  createdAt       DateTime @default(now())
}


Schema Diff
model SchemaDiff {
  id              String   @id @default(uuid())
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])

  oldSnapshotId   String
  newSnapshotId   String

  diffJson        Json
  breakingChanges Json
  createdAt       DateTime @default(now())
}


Agent Runs
model AgentRun {
  id              String   @id @default(uuid())
  organizationId  String
  organization    Organization @relation(fields: [organizationId], references: [id])

  type            String   // ingestion / interpretation / drift
  status          String   // running / success / failed
  logs            Json?
  createdAt       DateTime @default(now())
}


🧠 3. Agents (Inside Archestra)
You have 3 core agents.

1️⃣ Metadata Ingestion Agent
Purpose:
Call Bastion MCP tools
Extract technical schema
Tools used:
get_tables
get_columns
get_column_stats
Output:
Raw technical schema JSON

2️⃣ Semantic Interpretation Agent
Input:
Technical schema
LLM:
Deterministic prompt
Strict output format
Output:
Business-friendly descriptions
Clean structured schema

3️⃣ Drift Detection Agent
Input:
Previous snapshot
Current snapshot
Logic:
Compare tables
Compare columns
Detect breaking changes
Output:
diffJson
breakingChanges
This agent may NOT need LLM.
Better to implement deterministic logic in backend.

🔧 4. Bastion MCP Tools
Inside Bastion container:
No generic SQL.
Tools:

get_tables()
Returns:
[
  { name: "users" },
  { name: "orders" }
]


get_columns(table)
Returns:
[
  { name: "id", type: "uuid" },
  { name: "email", type: "text" }
]


get_column_stats(table, column)
Returns:
{
  null_ratio: 0.02,
  distinct_count: 400,
  sample_values: [...]
}


All tools:
Zod validated
Hardcoded SQL
Read-only
Schema-restricted

🌐 5. Backend Routes (Next.js API)
Now critical part.

🔐 Org Helper
Every route:
const { orgId, orgRole } = auth()

Then fetch:
SELECT * FROM Organization WHERE clerkOrgId = orgId


📡 Core Routes

POST /api/archestra/connect
Admin only.
Encrypt API key
Store baseUrl + encrypted key

GET /api/archestra/status
Return:
{ connected: true/false }


POST /api/analyze
Flow:
Fetch Archestra config
Call Metadata Ingestion Agent
Store snapshot
Trigger Semantic Agent
Compare with previous snapshot
Store diff
Save agent run

GET /api/schema/latest
Returns latest snapshot.

GET /api/drift/latest
Returns latest diff.

GET /api/runs
Returns agent run history.

DELETE /api/archestra
Admin only.
Remove connection.

🔐 6. Encryption Layer
In backend:
AES-256-CBC
ENCRYPTION_SECRET in env
Encrypt before storing API key
Decrypt only during request

🐳 7. Docker Story
Customer runs:
docker run bastion-mcp
docker run archestra

Your SaaS:
Hosted on Vercel / Railway
Neon cloud DB

🔥 8. Production-Grade Design
You have:
✔ SaaS control plane
✔ Customer-hosted AI runtime
✔ Secure DB gateway
✔ Multi-tenant isolation
✔ Versioned schema intelligence
✔ Drift detection
✔ Deterministic tool access
✔ No raw SQL exposure
✔ Encrypted API keys
This is real enterprise architecture.

🧠 Final Clean Architecture Diagram
[Frontend - Next.js + Clerk]
           │
           ▼
[Backend API - Next.js + Prisma]
           │
           ▼
        [Neon]
           │
           ▼
     [Archestra API]
           │
           ▼
   [Metadata Agent]
           │
           ▼
      [Bastion MCP]
           │
           ▼
    [Customer DB]

