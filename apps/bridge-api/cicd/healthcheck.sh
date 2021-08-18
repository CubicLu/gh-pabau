#!/bin/bash
set -e
if [ "$(curl -s http://localhost:4000/graphql -X POST -H 'content-type: application/json' --data-raw $'{"variables":{"username":"x", "password":""},"query":"mutation login($username: String!, $password: String!) { login(username:$username, password:$password) }"}' | jq -r '.errors[0].message')" == "Incorrect email or password" ]; then (echo PASS && exit 0); else (echo FAIL && exit 1); fi
