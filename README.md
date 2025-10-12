## 📞 Contact

- **Name**: Priyanshu patnayak
- **Email**: patnayakpriyanshu@gmail.com
- **Phone**: 6263675331

## 📤 Submission

- **Google Drive Link**: https://drive.google.com/file/d/1NE9Lf5CRRs3qIZHTA5dXbsuv4ugltsLQ/view?usp=drive_link
- **Frontend URL**:https://kube-credential-self.vercel.app/
- **Backend URLs**:https://github.com/Trafalgar-D-water/Kube-Credential/tree/main/Backend

# Kube Credential

A modern, microservice-based digital credential issuance and verification system built with Node.js, React, PostgreSQL, and Kubernetes.

## 🏗️ Architecture

- **Backend**: Two microservices (Issuance & Verification) with shared PostgreSQL database
- **Frontend**: Modern React app with professional UI and beautiful success cards
- **Database**: PostgreSQL for reliable, scalable data persistence
- **Deployment**: Hybrid approach - Render (PaaS) + Vercel (Frontend) + Local Kubernetes

## 📁 Project Structure

```
kube-credential/
├── Backend/
│   ├── issuance-service/     # Credential issuance API (Node.js + PostgreSQL)
│   ├── verification-service/  # Credential verification API (Node.js + PostgreSQL)
│   └── data/                  # Legacy SQLite (replaced with PostgreSQL)
├── frontend/                  # Modern React TypeScript app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Issue and Verify pages
│   │   └── services/         # API service layer
├── k8s/                       # Kubernetes manifests
└── SETUP.md                   # Detailed setup guide
```

## 🎨 Frontend Features

### Professional UI Components
- **SuccessCard**: Beautiful cards for success/error responses with icons and details
- **LoadingSpinner**: Professional loading indicators
- **Modern Forms**: Clean, responsive forms with validation
- **Professional Navigation**: Tab-style navigation with active states

### Pages
- **Issue Page**: Professional credential issuance form with 2-column layout
- **Verify Page**: Clean verification form with detailed results
- **Responsive Design**: Works perfectly on all screen sizes

## 🗄️ Database Migration

**From SQLite to PostgreSQL**
- ✅ Migrated both services from SQLite to PostgreSQL
- ✅ Updated all database queries to use parameterized SQL
- ✅ Added proper error handling for PostgreSQL constraints
- ✅ Environment-based configuration for local vs production

## 🚀 Deployment Strategy

### Option 1: Render + Vercel (No Credit Card Required)

**Backend Services on Render:**
1. Create free PostgreSQL database on Render
2. Deploy both microservices as Docker containers
3. Connect services to shared PostgreSQL database

**Frontend on Vercel:**
1. Deploy React app to Vercel
2. Configure environment variables for API URLs
3. Get public URL for submission

**Kubernetes (Local):**
1. Use Minikube for local Kubernetes testing
2. Test YAML manifests locally
3. Document the setup process

### Option 2: Full AWS Deployment
- EKS cluster with EFS storage
- ALB Ingress for load balancing
- ECR for container registry

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL (local or Docker)
- npm/yarn

### Backend Setup

```bash
# Install dependencies
cd Backend/issuance-service
npm install
cd ../verification-service
npm install

# Set environment variables
export DATABASE_URL=postgres://postgres:postgres@localhost:5432/kubecred
export PGSSLMODE=disable

# Start services
cd Backend/issuance-service
npm run dev  # Port 8080

cd Backend/verification-service  
npm run dev  # Port 8081
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev  # Port 5173
```

### Database Setup (Local)

```bash
# Using Docker
docker run --name kube-cred-pg \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=kubecred \
  -p 5432:5432 \
  -d postgres:16

# Or install locally
brew install postgresql
brew services start postgresql
createdb kubecred
```

## 🌐 Production Deployment

### Render Deployment (Backend)

1. **Create PostgreSQL Database:**
   - Go to [render.com](https://render.com)
   - New → PostgreSQL → Free plan
   - Copy Internal Connection String

2. **Deploy Services:**
   - New → Web Service → Docker
   - Root Directory: `Backend/issuance-service`
   - Environment Variables:
     - `DATABASE_URL`: (your connection string)
     - `PGSSLMODE`: `require`
   - Repeat for verification service

### Vercel Deployment (Frontend)

1. **Deploy to Vercel:**
   - Connect GitHub repository
   - Set environment variables:
     - `VITE_ISSUANCE_API_URL`: https://your-issuance-service.onrender.com
     - `VITE_VERIFICATION_API_URL`: https://your-verification-service.onrender.com

### Local Kubernetes Testing

```bash
# Install Minikube
brew install minikube
minikube start

# Build and load images
minikube image load issuance-service:latest
minikube image load verification-service:latest

# Apply manifests
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/issuance-deployment.yaml
kubectl apply -f k8s/verification-deployment.yaml
```

## 🧪 Testing

### API Testing

```bash
# Issue credential
curl -X POST http://localhost:8080/issue \
  -H 'Content-Type: application/json' \
  -d '{
    "employeeId":"E123",
    "employeeName":"Alice Doe",
    "certificationCode":"AWS-SA",
    "certificationName":"Solutions Architect",
    "issuingManager":"Bob"
  }'

# Verify credential
curl -X POST http://localhost:8081/verify \
  -H 'Content-Type: application/json' \
  -d '{
    "employeeId":"E123",
    "certificationCode":"AWS-SA"
  }'
```

### Frontend Testing
- Open http://localhost:5173
- Test both Issue and Verify pages
- Check professional UI and success cards

## 📊 API Endpoints

### Issuance Service (Port 8080)
- `POST /issue` - Issue new credential
- `GET /health` - Health check

### Verification Service (Port 8081)
- `POST /verify` - Verify credential
- `GET /health` - Health check

## 🔧 Environment Variables

### Backend Services
- `DATABASE_URL`: PostgreSQL connection string
- `PGSSLMODE`: SSL mode (`require` for production, `disable` for local)
- `PORT`: Service port (8080/8081)
- `HOSTNAME`: Worker identifier (auto-set in containers)

### Frontend
- `VITE_ISSUANCE_API_URL`: Issuance service URL
- `VITE_VERIFICATION_API_URL`: Verification service URL

## 🎯 Key Features

### Professional UI
- ✅ Modern, responsive design
- ✅ Beautiful success/error cards
- ✅ Professional loading states
- ✅ Clean form validation
- ✅ Mobile-friendly layout

### Backend Architecture
- ✅ PostgreSQL for reliable data persistence
- ✅ Parameterized SQL queries
- ✅ Proper error handling
- ✅ Docker containerization
- ✅ Health check endpoints

### Deployment Options
- ✅ Render (free tier, no credit card)
- ✅ Vercel (frontend hosting)
- ✅ Local Kubernetes testing
- ✅ AWS EKS (full production)

## 📋 Database Schema

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

## 🚀 Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repository>
   cd kube-credential
   ```

2. **Start local development:**
   ```bash
   # Start PostgreSQL (Docker)
   docker run --name kube-cred-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=kubecred -p 5432:5432 -d postgres:16
   
   # Set environment variables
   export DATABASE_URL=postgres://postgres:postgres@localhost:5432/kubecred
   export PGSSLMODE=disable
   
   # Start backend services
   cd Backend/issuance-service && npm install && npm run dev &
   cd Backend/verification-service && npm install && npm run dev &
   
   # Start frontend
   cd frontend && npm install && npm run dev
   ```

3. **Open http://localhost:5173 and test the application!**

## 📚 Documentation

- **SETUP.md**: Detailed setup guide for all deployment options
- **API Documentation**: See API Endpoints section above
- **Database Schema**: PostgreSQL table structure

## 🎨 UI Screenshots

The application features:
- Professional navigation with logo and tagline
- Modern forms with validation and loading states
- Beautiful success cards showing credential details
- Responsive design for all screen sizes
- Professional error handling

