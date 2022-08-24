#! /bin/bash


docker run --env-file ./.env.localstack \
    --rm -d -p 4566:4566 -p 4510-4559:4510-4559 \
    --name localstack localstack/localstack