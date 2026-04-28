# Insighta Labs+ | Intelligence Query Engine

Insighta Labs+ is a sophisticated demographic intelligence platform built for HNGI14 Stage 3. It provides a robust backend API, a dynamic web portal, and a powerful CLI tool for exploring profile data using natural language queries.

## 🚀 Deployment Links
- **API Base URL**: `https://backend-wizards-stage3.vercel.app/api/v1`
- **Web Portal**: `https://backend-wizards-stage3.vercel.app`
- **GitHub Repository**: `https://github.com/joshuaikechukwuodoh/backend-wizards-stage3`

## 🛠 Tech Stack
- **Runtime**: Node.js / Bun
- **Framework**: Hono (Serverless optimized)
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon.tech)
- **Auth**: GitHub OAuth 2.0 with PKCE & JWT
- **Deployment**: Vercel

## 🔐 Authentication & Security
### GitHub OAuth Flow
We implement a secure OAuth 2.0 flow with PKCE (Proof Key for Code Exchange) to protect against authorization code injection.
1. **Initiate**: `GET /auth/github` -> Redirects to GitHub with `code_challenge`.
2. **Callback**: `GET /auth/callback` -> Exchanges `code` and `code_verifier` for tokens.
3. **Session**: Secure, HttpOnly, SameSite=Lax, Secure cookies are used for persistence.

### JWT Token Lifecycle
- **Access Token**: Short-lived (15 min) JWT.
- **Refresh Token**: Long-lived (7 days) UUID stored in the database.
- **Refresh Flow**: `POST /auth/refresh` to get a new access token.

## 👥 Roles & Permissions (RBAC)
- **Admin**: Full access, including profile exporting.
- **Analyst**: Read-only access to profiles and search.
- **Guest**: Access to login and public API status only.

## 📁 Repository Structure
- `/backend`: Hono API with Drizzle, JWT auth, and RBAC middleware.
- `/web`: Hono-based web portal serving a dynamic dashboard with CSRF protection.
- `/cli`: Bun-based Command Line Interface for remote profile access.
- `/docs`: Detailed documentation on architecture and API endpoints.

## 🤖 Natural Language Query Engine
The engine uses robust pattern matching to parse demographic queries:
- `young males from kenya` -> Filters by age < 30, gender=male, country=Kenya.
- `adult females` -> Filters by age >= 18, gender=female.
- `profiles from nigeria` -> Filters by country=Nigeria.

## 🔄 CI/CD
Fully automated CI/CD pipeline using **GitHub Actions**. Every push to `main` triggers:
- Dependency installation
- Build checks
- Automated deployment to Vercel

## 🛡 API Protection & Rate Limiting
- **Global Rate Limit**: 100 requests / 1 min.
- **Auth Rate Limit**: 10 requests / 1 min (to prevent brute force).
- **CSRF Protection**: Enforced on all state-changing operations in the web portal.
- **Method Enforcement**: All routes strictly enforce correct HTTP methods (e.g., 405 for GET on POST routes).

## 📄 Documentation
For detailed API specifications, visit our [API Documentation](/docs/API_DOCUMENTATION.md).
