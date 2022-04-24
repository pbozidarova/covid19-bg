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
    stage('Deploy client') {
      steps {
        sh '''
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 159792149734.dkr.ecr.us-east-1.amazonaws.com
          docker tag covid19explorebulgarianstatistics-build_client:latest 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_client:latest
          docker push 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19databulgaria-docker_client:latest
        '''
      }
    }
    stage('Deploy worker') {
      steps {
        sh '''
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 159792149734.dkr.ecr.us-east-1.amazonaws.com
          docker tag covid19explorebulgarianstatistics-build_worker:latest 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_worker:latest
          docker push 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_worker:latest
        '''
      }
    }
    stage('Deploy API') {
      steps {
        sh '''
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 159792149734.dkr.ecr.us-east-1.amazonaws.com
          docker tag covid19explorebulgarianstatistics-build_api:latest 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_api:latest
          docker push 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_api:latest
        '''
      }
    }
    stage('Deploy nginx') {
      steps {
        sh '''
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 159792149734.dkr.ecr.us-east-1.amazonaws.com
          docker tag covid19explorebulgarianstatistics-build_nginx:latest 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_nginx:latest
          docker push 159792149734.dkr.ecr.us-east-1.amazonaws.com/covid19explorebulgarianstatistics_nginx:latest
        '''
      }
    }    
  }

}