#!/bin/zsh
cd "${0:A:h}"
if curl -fsS http://127.0.0.1:4173/ | grep -q 'Front Desk Studio'; then
  open http://127.0.0.1:4173/
  exit 0
fi
if ! command -v node >/dev/null; then
  echo '请先安装 Node.js 20 或更新版本，再运行此文件。'
  read
  exit 1
fi
(sleep 1; open http://127.0.0.1:4173/) &
node server.mjs
