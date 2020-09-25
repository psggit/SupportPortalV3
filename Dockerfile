FROM node:14.7.0-stretch
COPY . .

ARG SENTRY_ENV=dev
ARG SENTRY_RELEASE=default
ARG BUILD_ENV=default
ARG BASE_DOMAIN=default

RUN $(npm bin)/webpack --mode production \
  --env.SENTRY_ENV=${SENTRY_ENV} \
  --env.SENTRY_RELEASE=${SENTRY_RELEASE} \
  --env.BUILD_ENV=${BUILD_ENV} \
  --env.BASE_DOMAIN=${BASE_DOMAIN} \
  --env.SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

EXPOSE 8080
ENTRYPOINT ["node", "server.js"]
