def git_url = 'https://github.com/initedit/speed-test.git'
def git_branch = 'master'

pipeline
{
    agent {
        label 'web1'
    }
    stages
    {
        stage('Git-checkout')
        {
            steps
            {
                git credentialsId: 'github', url: git_url , branch: git_branch
            }
        }
        
        stage('Sonarqube-anaylysis')
        {
            steps
            {
                sh '''
                echo "sonarqube analysis"
                '''
            }
        }
        
        stage('Build')
        {
            steps
            {
                sh '''
                echo "build"
                '''
            }
        }
        
        stage('Deploy')
        {
            steps
            {
                sh '''
                rm -rf /home/admin/web/speed.initedit.com/public_html/*
                cp -a $WORKSPACE/* /home/admin/web/speed.initedit.com/public_html/
                chown -R admin:admin /home/admin/web/speed.initedit.com/public_html/*
                '''
            }
        }
        
        stage('Smoke-test')
        {
            steps
            {
                sh '''
                ab -n 4 -c 2 https://speed.initedit.com/
                echo "somke-test"
                '''
            }
        }
    }
}

