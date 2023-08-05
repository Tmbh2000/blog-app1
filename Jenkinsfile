pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('client') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npm start'
                }
            }
        }
    }
}
