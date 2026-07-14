pipeline {
    agent any
    tools {
        jdk 'JAVA_HOME'
        maven 'MAVEN_HOME'
    }
    environment {
        TMPDIR          = "/var/lib/jenkins/trivy-cache"
        TRIVY_CACHE_DIR = "/var/lib/jenkins/trivy-cache"
        
        // EKS Configurations
        AWS_REGION      = "ap-south-1"
        CLUSTER_NAME    = "eks-cluster"
        
        // Docker Hub Images
        BACKEND_IMAGE   = "surendharr/ems-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE  = "surendharr/ems-frontend:${BUILD_NUMBER}"
    }

    stages {
        stage('Cloning Project Repo') {
            steps {
                git branch: 'master', url: 'https://github.com/surendharsundar793-prog/Employee-management-system.git'
            }
        }
        
        stage('Compiling & Testing') {
            steps {
                dir('backend') {
                    sh 'mvn clean test'
                }
            }
        }
        
        stage('Analyzing Src Code (SonarQube)') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('sonarqube') {
                        sh 'mvn sonar:sonar -Dsonar.projectName=Employee-management-system -Dsonar.projectKey=Employee-management-system'
                    }
                }
            }
        }
        
        stage('Deploying Package into Nexus') {
            steps {
                dir('backend') {
                    withMaven(globalMavenSettingsConfig: 'nexus', jdk: 'JAVA_HOME', maven: 'MAVEN_HOME', traceability: true) {
                        sh 'mvn deploy -DskipTests'
                    }
                }
            }
        }
        
        stage('Building Docker Images') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'DOCKER_HOME', url: 'https://index.docker.io/v1') {
                        sh "docker build -t ${BACKEND_IMAGE} ./backend"
                        sh "docker build -t ${FRONTEND_IMAGE} ./frontend"
                    }
                }
            }
        }
        
        stage('Scanning Images (Trivy)') {
            steps {
                sh "trivy image --format table ${BACKEND_IMAGE}"
                sh "trivy image --format table ${FRONTEND_IMAGE}"
            }
        }

        stage('Pushing Images to Docker Hub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker') {
                        sh "docker push ${BACKEND_IMAGE}"
                        sh "docker push ${FRONTEND_IMAGE}"
                    }
                }
            }
        }

        stage('Deploying to AWS EKS') {
            steps {
                withAWS(credentials: 'aws-credentials', region: "${AWS_REGION}") {
                    sh """
                        aws eks --region ${AWS_REGION} update-kubeconfig --name ${CLUSTER_NAME}
                        kubectl apply -f k8s/db-service-prod.yaml
                        kubectl apply -f k8s/backend.yaml
                        kubectl apply -f k8s/frontend.yaml
                    """
                }
            }
        }
    }
}
