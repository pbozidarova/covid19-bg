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
    
  }

}