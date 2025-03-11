#!/usr/bin/env bash

# Clear old dependencies
rm -rf node_modules package-lock.json
npm install

# Fix bcrypt for Linux (Render environment)
npm rebuild bcrypt --build-from-source

# Run the build
npm run build
