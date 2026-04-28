# Insighta Labs+ | Secure Access & Multi-Interface Integration

## Project Overview
Insighta Labs+ is a comprehensive profile intelligence system featuring a secure backend, a modern web dashboard, and a robust command-line interface (CLI). It implements secure authentication, role-based access control (RBAC), and natural language processing for data querying.

## Interfaces
1. **API (Backend)**: High-performance Hono API built with Bun/TypeScript, deployed on Vercel.
2. **Web Portal**: A modern, responsive dashboard for viewing and searching profiles.
3. **CLI**: A terminal-based tool for administrative and analytical tasks.

## Authentication & Security
- **GitHub OAuth**: Secure login flow using GitHub as the identity provider.
- **PKCE-like Security**: Uses state tokens and code verifiers to prevent authorization code injection and replay attacks.
- **JWT & Session Management**:
    - **Access Tokens**: Short-lived JWTs (15 minutes) stored in HTTP-only cookies (Web) or memory (CLI).
    - **Refresh Tokens**: Long-lived opaque tokens (7 days) stored securely in the database for session persistence.
- **CSRF Protection**: All state-changing requests (POST, PUT, DELETE) require a valid CSRF token.
- **Rate Limiting**: Protected endpoints are rate-limited to prevent abuse.

## Role-Based Access Control (RBAC)
- **Admin**:
    - Full access to all profiles.
    - Ability to export profile data as CSV.
    - Access to advanced search analytics.
- **Analyst (Default)**:
    - View and search profiles.
    - No access to data export or administrative functions.

## Technical Stack
- **Runtime**: Bun
- **Framework**: Hono
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **Deployment**: Vercel

## Setup Instructions
Each component has its own setup requirements. Please refer to the individual README files in their respective directories:
- [Backend](./backend/README.md)
- [Web Portal](./web/README.md)
- [CLI](./cli/README.md)
