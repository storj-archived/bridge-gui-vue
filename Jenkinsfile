node('node') {
  try {

    stage 'Checkout'

      checkout scm

    stage 'Test'

      sh """#!/bin/bash -e
        source '/var/lib/jenkins/.nvm/nvm.sh'
        node -v
        git clean -fdx
        npm install
        npm test
      """

    stage 'Build Docker'

      sh "git rev-parse --short HEAD > .git/commit-id"
      def commit_id = readFile('.git/commit-id').trim()
      sh "./dockerfiles/build.sh storjlabs/bridge-gui-vue:${env.BUILD_ID} storjlabs/bridge-gui-vue:${commit_id} storjlabs/bridge-gui-vue:latest"
      sh "./dockerfiles/push.sh storjlabs/bridge-gui-vue:${env.BUILD_ID} storjlabs/bridge-gui-vue:${commit_id} storjlabs/bridge-gui-vue:latest"

    stage 'Deploy'

      echo 'Push to Repo'
      sh "./dockerfiles/deploy.staging.sh bridge-gui-vue storjlabs/bridge-gui-vue:${env.BUILD_ID}"

    stage 'Cleanup'

      echo 'prune and cleanup'
      sh """#!/bin/bash -e
        source '/var/lib/jenkins/.nvm/nvm.sh'
        rm node_modules -rf
      """
  }

  catch (err) {
    currentBuild.result = "FAILURE"
  }
}
