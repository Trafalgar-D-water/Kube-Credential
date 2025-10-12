# PostgreSQL Setup Guide

## Quick Start - Render (No Credit Card Required)

### 1. Create PostgreSQL Database on Render

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click "New +" → "PostgreSQL"
3. Name: `kube-credential-db`
4. Plan: **Free**
5. Click "Create Database"

### 2. Get Your DATABASE_URL

1. Click on your database
2. Go to "Connections" tab
3. Copy the **Internal Connection String**:
   ```
   postgres://user:password@host:5432/database
   ```
4. This is your `DATABASE_URL`

### 3. Deploy Backend Services

**Issuance Service:**
1. New → Web Service
2. Connect GitHub repo
3. Root Directory: `Backend/issuance-service`
4. Environment: **Docker**
5. Instance Type: **Free**
6. Environment Variables:
   - `DATABASE_URL`: (paste your connection string)
   - `PGSSLMODE`: `require`
7. Deploy

**Verification Service:**
1. Repeat same steps
2. Root Directory: `Backend/verification-service`
3. Same environment variables

### 4. Update Frontend

Update your frontend `src/services/api.ts` with the Render URLs:
```typescript
const ISSUANCE_API_URL = 'https://your-issuance-service.onrender.com';
const VERIFICATION_API_URL = 'https://your-verification-service.onrender.com';
```

## Local Development Setup

### 1. Install PostgreSQL

**Option A: Docker**
```bash
docker run --name kube-cred-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=kubecred \
  -p 5432:5432 \
  -d postgres:16
```

**Option B: Local Installation**
```bash
# macOS
brew install postgresql
brew services start postgresql

# Create database
createdb kubecred
```

### 2. Set Environment Variables

Create `.env` files in each service:

**Backend/issuance-service/.env:**
```bash
DATABASE_URL="YOUR_URL"
PGSSLMODE=disable
PORT=8080
```

**Backend/verification-service/.env:**
```bash
DATABASE_URL="YOUR_URL"
PGSSLMODE=disable
PORT=8081
```

### 3. Install Dependencies and Run

```bash
# Install dependencies
cd Backend/issuance-service
npm install
npm run build
npm start

# In another terminal
cd Backend/verification-service
npm install
npm run build
npm start
```

### 4. Test the Services

```bash
# Health checks
curl http://localhost:8080/health
curl http://localhost:8081/health

# Issue credential
curl -X POST http://localhost:8080/issue \
  -H 'Content-Type: application/json' \
  -d '{
    "employeeId":"E1",
    "employeeName":"Alice",
    "certificationCode":"AWS-SA",
    "certificationName":"Solutions Architect",
    "issuingManager":"Bob"
  }'

# Verify credential
curl -X POST http://localhost:8081/verify \
  -H 'Content-Type: application/json' \
  -d '{
    "employeeId":"E1",
    "certificationCode":"AWS-SA"
  }'
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host:5432/db` |
| `PGSSLMODE` | SSL mode for PostgreSQL | `require` (Render) or `disable` (local) |
| `PORT` | Service port | `8080` (issuance), `8081` (verification) |
| `HOSTNAME` | Worker identifier | Auto-set in containers |

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL is correct

2. **SSL errors on local development**
   - Set `PGSSLMODE=disable` for local development

3. **Render deployment fails**
   - Ensure DATABASE_URL is set correctly
   - Check build logs for errors

### Database Schema

The services automatically create this table:
```sql
CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  employeeId TEXT NOT NULL,
  certificationCode TEXT NOT NULL,
  employeeName TEXT NOT NULL,
  certificationName TEXT NOT NULL,
  issuingManager TEXT NOT NULL,
  issuedBy TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  CONSTRAINT unique_employee_cert UNIQUE (employeeId, certificationCode)
);
```
