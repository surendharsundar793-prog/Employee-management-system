# Employee Management System

A cloud-native **Employee Management System** built using **Spring Boot**, **React.js**, and **PostgreSQL**. The application follows a complete **DevSecOps CI/CD pipeline**, including automated build, code quality analysis, artifact management, security scanning, containerization, deployment on **AWS Elastic Kubernetes Service (EKS)**, and monitoring using **Prometheus** and **Grafana**.

---

## Project Overview

This project demonstrates the development and deployment of a full-stack web application using modern DevOps practices. It provides CRUD operations for employee management and showcases an end-to-end CI/CD workflow from source code commit to production deployment on AWS.

---

## Features

- Add new employees
- View all employees
- Update employee information
- Delete employee records
- RESTful API architecture
- Responsive React frontend
- PostgreSQL database integration
- Dockerized application
- Kubernetes deployment on AWS EKS
- Automated CI/CD using Jenkins
- Code quality analysis with SonarQube
- Artifact management with Nexus Repository
- Container vulnerability scanning using Trivy
- Infrastructure monitoring with Prometheus and Grafana

---

# Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Axios

## Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

## Database

- PostgreSQL (Local Development)
- Amazon RDS for PostgreSQL (Production)

## DevOps & Cloud

- Git
- GitHub
- Jenkins
- Maven
- SonarQube
- Nexus Repository
- Docker
- Trivy
- Kubernetes
- AWS Elastic Kubernetes Service (EKS)
- Amazon RDS
- Prometheus
- Grafana

---

# Project Architecture

```
                        GitHub Repository
                               │
                               ▼
                        Jenkins Pipeline
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
      Maven Build        Unit Testing      SonarQube Scan
                               │
                               ▼
                    Nexus Artifact Repository
                               │
                               ▼
                    Docker Image Build
                               │
                               ▼
                    Trivy Security Scan
                               │
                               ▼
                     Push Images to Docker Hub
                               │
                               ▼
                     Deploy to AWS EKS Cluster
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
    React Frontend      Spring Boot Backend     Amazon RDS
          │                    │             PostgreSQL Database
          └────────────────────┼────────────────────┘
                               │
                               ▼
                         Prometheus
                               │
                               ▼
                           Grafana
```

---

# CI/CD Workflow

1. Developer pushes source code to GitHub.
2. GitHub Webhook triggers Jenkins Pipeline.
3. Jenkins checks out the latest source code.
4. Maven compiles the project and executes tests.
5. SonarQube performs static code quality analysis.
6. The build artifact is published to Nexus Repository.
7. Docker images are created for the frontend and backend.
8. Trivy scans Docker images for vulnerabilities.
9. Secure Docker images are pushed to Docker Hub.
10. Jenkins deploys the application to AWS EKS.
11. The backend connects to Amazon RDS PostgreSQL.
12. Prometheus collects application and Kubernetes metrics.
13. Grafana displays dashboards for monitoring and visualization.

---

# REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/search/employees` | Add Employee |
| GET | `/search/alldata` | Get All Employees |
| PUT | `/search/updatedata/{empid}` | Update Employee |
| DELETE | `/search/deletedata/{empid}` | Delete Employee |

---

# Local Setup

## Clone the Repository

```bash
git clone https://github.com/<your-username>/employee-management-system.git

cd employee-management-system
```

---

## Backend Setup

```bash
cd backend
```

Configure PostgreSQL in `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

Run the backend

```bash
mvn clean install
mvn spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend URL

```
http://localhost:3000
```

---

# Deployment

- Dockerized frontend and backend applications
- Docker images pushed to Docker Hub
- Kubernetes manifests deployed on AWS EKS
- Backend connected to Amazon RDS PostgreSQL
- Monitoring enabled using Prometheus and Grafana

---

# Monitoring

Prometheus collects:

- CPU Utilization
- Memory Utilization
- Pod Health
- Node Health
- Container Metrics
- Application Metrics

Grafana provides dashboards for:

- Kubernetes Cluster Monitoring
- Node Monitoring
- Pod Monitoring
- Resource Usage
- Application Performance
- Container Health

---

# Security

- Static Code Analysis using SonarQube
- Artifact Management using Nexus Repository
- Docker Image Vulnerability Scanning using Trivy
- Secure container deployment on Kubernetes

---

# Screenshots
  - Home Page
<img width="2392" height="1080" alt="Screenshot_20260714_160314" src="https://github.com/user-attachments/assets/0df32a1b-0541-4f4c-a10a-8a8d880a726c" />
  - Employee List
<img width="2392" height="1080" alt="Screenshot_20260714_160319" src="https://github.com/user-attachments/assets/813b8df0-81cc-4118-b454-2c1e4cd21c8c" />
  - Add Employee 
<img width="2392" height="1080" alt="Screenshot_20260714_160325" src="https://github.com/user-attachments/assets/a320b284-148f-48c6-8215-da6eb9d1da0b" />

---

# Future Enhancements

- JWT Authentication
- Role-Based Access Control (RBAC)
- Kubernetes Horizontal Pod Autoscaler (HPA)
- Ingress Controller with AWS Load Balancer
- Centralized Logging using ELK Stack or Loki
- Email Notifications
- Automated Backup Strategy

---

# Learning Outcomes

- Built a full-stack Java application using Spring Boot and React.js
- Designed RESTful APIs with Spring Data JPA
- Worked with PostgreSQL locally and Amazon RDS in production
- Automated CI/CD using Jenkins
- Integrated SonarQube for code quality analysis
- Managed build artifacts using Nexus Repository
- Performed container vulnerability scanning with Trivy
- Containerized applications using Docker
- Deployed workloads on AWS EKS
- Monitored infrastructure and applications using Prometheus and Grafana
- Applied DevSecOps best practices throughout the software delivery lifecycle

---

# Author

**Surendhar S**

**Aspiring DevOps Engineer | Java Full Stack Developer**

### Connect with Me

- **LinkedIn:** https://linkedin.com/in/surendhar-s-8a40b6312
- **Email:** surendharsundar793@gmail.com
