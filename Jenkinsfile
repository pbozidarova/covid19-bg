pipeline {
  agent any
  environment {
    DOCKER_HUB_CREDS = credentials('pbozidarova-docker-hub')
    AWS_CREDS = credentials('pbozidarova-aws')
  }
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
        sh 'docker context use default'
        sh 'docker-compose build'
      }
    }
  }

}