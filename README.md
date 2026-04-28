# Insighta Labs+ | Intelligence Query Engine (Stage 3)

Insighta Labs+ is a secure, multi-interface profile intelligence platform. It provides a robust API for querying demographic data, a modern web dashboard for analysts, and a CLI for administrative tasks.

**Base URL**: https://backend-wizards-stage3.vercel.app
**API Version**: v1

## 🚀 Key Features

- **Multi-Interface Support**: Web Dashboard, Command Line Interface (CLI), and RESTful API.
- **Secure Authentication**: GitHub OAuth 2.0 integration with enhanced security measures.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Admins and Analysts.
- **Advanced Querying**: Natural language processing and complex filtering for demographic profiles.
- **Data Export**: Secure CSV export for administrative users.

## 🔐 Security & Authentication

Insighta Labs+ implements a multi-layered security architecture:

### 1. OAuth 2.0 with PKCE & State
To prevent authorization code injection and CSRF attacks, we implement:
- **PKCE (Proof Key for Code Exchange)**: Uses a `code_verifier` and `code_challenge` (S256) to ensure that only the client that initiated the login can exchange the code.
- **State Validation**: A unique, non-guessable `state` parameter is generated per session and validated upon callback.

### 2. Token Lifecycle Management
- **Access Tokens**: Short-lived (15 min) JWTs containing user identity and roles.
- **Refresh Tokens**: Long-lived (7 days) opaque tokens stored securely in a PostgreSQL database (`sessions` table).
- **Rotation & Revocation**: Refresh tokens can be revoked upon logout, invalidating the session.

### 3. API Protection
- **Rate Limiting**: Enforced on all endpoints to prevent brute-force and DoS attacks (10 req/min for auth, 100 req/min for API).
- **CSRF Protection**: State-changing requests in the web portal are protected via custom headers and tokens.

## 👥 Role Enforcement (RBAC)

| Role | Permissions |
| :--- | :--- |
| **Admin** | View profiles, Advanced Search, Export Data (CSV), User Management |
| **Analyst** | View profiles, Advanced Search |

Roles are assigned during the first login (first user is Admin) or can be managed via the database.

## 🖥️ Interfaces

### Web Portal
- **URL**: https://backend-wizards-stage3.vercel.app/web (or root)
- Features: Real-time search, profile browsing, role-specific UI elements.

### CLI (Command Line Interface)
- **Location**: `/cli` directory.
- Features: Token persistence, automated search, and administrative exports.

## 🛠️ Tech Stack
- **Backend**: Bun + Hono (TypeScript)
- **Database**: PostgreSQL + Drizzle ORM
- **Infrastructure**: Vercel (Edge/Serverless)
- **CI/CD**: GitHub Actions

## 📖 API Documentation

- `GET /api/v1/auth/github`: Initiate login.
- `POST /api/v1/auth/refresh`: Refresh access token.
- `GET /api/v1/profiles`: List profiles (Auth required).
- `GET /api/v1/profiles/search`: Search profiles via NLP (Auth required).
- `GET /api/v1/profiles/export`: Export data (Admin only).
