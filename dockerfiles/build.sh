#!/bin/bash

npm run build

for TAG in "$@"; do
  TAG_PARAMS+=" -t $TAG"
done

echo "Building with TAG_PARAMS: ${TAG_PARAMS}"

docker build -f ./dockerfiles/build.dockerfile .
result=$?

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

docker build ${TAG_PARAMS} -f ./dockerfiles/serve.dockerfile .

if [[ $result != 0 ]]; then
  echo "Error building docker image"
  exit 1
fi

echo "Success..."
exit 0
