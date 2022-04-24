pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKER_HUB_CREDS = credentials('pbozidarova-docker-hub')
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
        sh 'docker-compose push'
      }
    }
  }

}