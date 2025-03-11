#!/usr/bin/env bash

# Clear old dependencies
rm -rf node_modules package-lock.json
npm install

# Remove bcrypt and reinstall
npm uninstall bcrypt
npm install bcrypt

# Run the build
npm run build
