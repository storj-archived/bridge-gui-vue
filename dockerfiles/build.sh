#!/bin/bash

#npm run build

NAME=$1
TAG=$2

echo "Building with NAME: ${NAME} and TAG: ${TAG}"

# We need to pass in the version portion of the tag so we can tag both the serve and build containers
BUILD_OUTPUT=$(docker build -t ${NAME}-build:${TAG} -f ./dockerfiles/build.dockerfile .)
result=$?

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

#BUILD_ID=$(docker images -q ${NAME}-build:${TAG})

echo "Build ID is $BUILD_ID"

# CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"

echo "Starting build container"
CONTAINER_ID=$(docker run -d ${NAME}-build:${TAG})

echo "Running build in container with id $CONTAINER_ID"
docker exec -t $CONTAINER_ID npm run build
echo "Build done."

echo "Copying statically built files to local dist directory"
docker cp $CONTAINER_ID:/opt/bridge-gui-vue/dist/ .

echo "Creating server container from static files"
docker build -t ${NAME}:${TAG} -f ./dockerfiles/serve.dockerfile .
echo "Server container creation done."

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

echo "Success..."
exit 0
