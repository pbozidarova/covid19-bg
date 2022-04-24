pipeline {
  agent any
  stages {
    stage('Tooling versions') {
      steps {
        sh '''
          docker --version
          docker-compose version
        '''
      }
    }
    stage('Build') {
      steps {
        sh 'docker-compose build'
        sh 'docker images'
      }
    }
    stage('Logging into AWS ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 159792149734.dkr.ecr.us-east-1.amazonaws.com
          docker tag covid19databulgaria-docker_client:latest 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19databulgaria-docker_client:latest
          docker push 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19databulgaria-docker_client:latest
        '''
      }
    }
    
  }

}