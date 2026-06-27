#!/bin/sh
set -e

# DNS del sistema (resuelve *.railway.internal en runtime).
RESOLVER=$(awk '/^nameserver/ { print $2; exit }' /etc/resolv.conf)
# nginx exige corchetes para resolvers IPv6.
case "$RESOLVER" in
  *:*) RESOLVER="[$RESOLVER]" ;;
esac
export NGINX_RESOLVER="$RESOLVER"

# Rellenar solo $PORT y $NGINX_RESOLVER; el resto de $vars son de nginx.
envsubst '${PORT} ${NGINX_RESOLVER}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
