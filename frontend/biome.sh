#!/bin/bash
export PATH="$HOME/.asdf/shims:$PATH"

valid_extensions=("js" "ts" "jsx" "tsx" "json")
extension="${1##*.}"

if [[ " ${valid_extensions[*]} " == *" ${extension} "* ]]; then
  (cd frontend && yarn biome check --apply-unsafe "$1")
fi
