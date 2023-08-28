#!/bin/bash

echo "-------- generating build config--------"

cat <<EOT >> ~/.gradle/gradle.properties
KEY_ALIAS=$KEY_ALIAS
KEY_PASSWORD=$KEY_PASSWORD
STORE_FILE=$STORE_FILE
STORE_PASSWORD=$STORE_PASSWORD
EOT
