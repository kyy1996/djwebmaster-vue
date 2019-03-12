#!/bin/sh

## NuxtConfigurationServerMiddleware only exists in server-middleware
sed -e 's/\.\/index/.\/server-middleware/' -i '' ./node_modules/@nuxt/config-edge/types/render.d.ts
