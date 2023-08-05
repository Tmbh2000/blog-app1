pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npm start'
                }
            }
        }
    }
}
