#!/bin/bash

npm run build

NAME=$1
TAG=$2

echo "Building with NAME: ${NAME} and TAG: ${TAG}"

# We need to pass in the version portion of the tag so we can tag both the serve and build containers
docker build -t ${NAME}-build:${TAG} -f ./dockerfiles/build.dockerfile .
result=$?

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

docker build -t ${NAME}:${TAG} -f ./dockerfiles/serve.dockerfile .

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

echo "Success..."
exit 0
