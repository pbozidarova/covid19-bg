pipeline {
    agent any
    stages {
        stage("build"){
            steps {
                sh '''
                    docker --version
                    docker-compose --version
                '''
            }
        }
    }
}
