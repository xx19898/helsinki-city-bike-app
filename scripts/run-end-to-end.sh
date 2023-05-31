#!/usr/bin/env bash

# scripts/run-end-to-end.sh


DIR="$(cd "$(dirname "$0")" && pwd)"

source $DIR/setenv.sh

docker-compose up -d

echo '🟡 - Waiting for database to be ready...'

$DIR/wait-for-it.sh "${TEST_DATABASE_URL}" -- echo '🟢 - Database is ready!'

npm run migrate:test

dotenv -e .env.test -- playwright test --trace on


