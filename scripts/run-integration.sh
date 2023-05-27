#!/usr/bin/env bash

# scripts/run-integration.sh


DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/setenv.sh

docker-compose up -d

echo '🟡 - Waiting for database to be ready...'

$DIR/wait-for-it.sh "${TEST_DATABASE_URL}" -- echo '🟢 - Database is ready!'

npm run migrate:test

if [ "$#" -eq  "0" ]

  then

    dotenv -e .env.test -- vitest -c ./vitest.config.integration.ts

else

    dotenv -e .env.test -- vitest -c ./vitest.config.integration.ts --ui

fi
