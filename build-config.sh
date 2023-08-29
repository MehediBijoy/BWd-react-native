#!/bin/bash

echo "-------- generating build config--------"

echo -n ${KEYSTORE_FILE} | base64 -d > ./android/app/brettonwoods-gold.keystore
cat <<EOT >> ./android/gradle.properties

KEY_ALIAS=$KEY_ALIAS
KEY_PASSWORD=$KEY_PASSWORD
STORE_FILE=$STORE_FILE
STORE_PASSWORD=$STORE_PASSWORD
EOT
