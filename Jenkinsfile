node('node') {
  try {

    stage 'Checkout'

      checkout scm

    stage 'Build Docker'

      sh "git rev-parse --short HEAD > .git/commit-id"
      def commit_id = readFile('.git/commit-id').trim()
      sh "./dockerfiles/build.sh storjlabs/bridge-gui-vue ${env.BUILD_ID}"
      sh "./dockerfiles/build.sh storjlabs/bridge-gui-vue ${commit_id}"
      sh "./dockerfiles/build.sh storjlabs/bridge-gui-vue latest"

    stage 'Test'
      sh "docker run storjlabs/bridge-gui-vue-build:${commit_id} 'npm test'"

    stage 'Push'
      sh "./dockerfiles/push.sh storjlabs/bridge-gui-vue:${commit_id} storjlabs/bridge-gui-vue:latest"

    stage 'Deploy'

      echo 'Push to Repo'
      sh "./dockerfiles/deploy.staging.sh bridge-gui-vue storjlabs/bridge-gui-vue:${commit_id}"

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
