#!/bin/sh

## NuxtConfigurationServerMiddleware only exists in server-middleware
sed -i 's/\.\/index/server-middleware/' ./node_modules/@nuxt/config-edge/types/render.d.ts
