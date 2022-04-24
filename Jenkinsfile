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
        sh 'docker context use default'
        sh 'docker-compose build'
      }
    }
  }

}