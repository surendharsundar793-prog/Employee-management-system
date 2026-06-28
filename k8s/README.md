# Kubernetes Deployment Guide

This directory contains the Kubernetes manifests to deploy the **Employee Management System** on your local Kubernetes cluster (like Docker Desktop Kubernetes, Minikube, or MicroK8s).

No existing project code files have been modified.

---

## Prerequisites

1. Ensure **Docker Desktop** is running and the built-in **Kubernetes** cluster is enabled.
2. Build the local Docker images if you haven't already:
   ```bash
   # Build backend image
   docker build -t employee-management-system-backend:latest ./backend
   
   # Build frontend image
   docker build -t employee-management-system-frontend:latest ./frontend
   ```

---

## Deploying to Kubernetes

Apply the manifest files in order using `kubectl`:

1. **Create the Database Service Connection:**
   This maps the backend container to your host machine's local PostgreSQL database on port 5432:
   ```bash
   kubectl apply -f db-service.yaml
   ```

2. **Deploy the Backend REST API:**
   Spins up 2 replicas of the Spring Boot backend container:
   ```bash
   kubectl apply -f backend.yaml
   ```

3. **Deploy the Frontend UI:**
   Spins up 2 replicas of the Nginx-hosted React frontend and exposes it via a LoadBalancer service:
   ```bash
   kubectl apply -f frontend.yaml
   ```

---

## Verifying Deployment

1. **Check all running Pods:**
   ```bash
   kubectl get pods
   ```
   *(Ensure the pods for both `backend-deployment` and `frontend-deployment` show a status of `Running`)*.

2. **Check Services:**
   ```bash
   kubectl get services
   ```

---

## Accessing the Portal

* Since the frontend service is exposed as a **LoadBalancer**, Docker Desktop automatically maps it to your local port `80`. Open your browser and go to:
  👉 **[http://localhost/](http://localhost/)**

* If you need to access or test the backend API container directly on port `8085`, use Kubernetes port forwarding:
  ```bash
  kubectl port-forward service/backend-service 8085:8085
  ```

---

## Tearing Down Deployment

To stop and remove all Kubernetes resources, run:
```bash
kubectl delete -f db-service.yaml
kubectl delete -f backend.yaml
kubectl delete -f frontend.yaml
```
