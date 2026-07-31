#!/usr/bin/env bash
# 네이버(서치어드바이저)·빙 등이 지원하는 IndexNow 프로토콜로
# sitemap.xml에 있는 모든 URL의 즉시 색인 요청을 보냅니다.
# 구글은 IndexNow를 지원하지 않으므로 별도로 서치콘솔에서 제출해야 합니다.
#
# 사용법: 배포(Netlify 반영)가 끝난 뒤 실행
#   ./scripts/indexnow-submit.sh
#
# 필요 값: HOST, KEY, KEY_LOCATION (이 사이트에 맞게 이미 채워져 있음)

set -euo pipefail

HOST="bohumguide.netlify.app"
KEY="9c9a1e7283e235597d59f37b661c8b26"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/sitemap.xml"

if [ ! -f "$SITEMAP" ]; then
  echo "sitemap.xml을 찾을 수 없습니다: $SITEMAP" >&2
  exit 1
fi

# sitemap.xml에서 <loc> URL 전체 추출
URLS=$(grep -o '<loc>[^<]*</loc>' "$SITEMAP" | sed -E 's#</?loc>##g')

if [ -z "$URLS" ]; then
  echo "sitemap.xml에서 URL을 찾지 못했습니다." >&2
  exit 1
fi

# JSON 배열로 변환
URL_LIST_JSON=$(printf '%s\n' "$URLS" | awk '{printf "\"%s\",", $0}' | sed 's/,$//')

BODY=$(cat <<JSON
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [${URL_LIST_JSON}]
}
JSON
)

echo "제출할 URL 개수: $(printf '%s\n' "$URLS" | wc -l)"

# api.indexnow.org 하나에만 제출하면 빙·네이버·얀덱스·Seznam 등
# IndexNow 참여 검색엔진 전체에 자동으로 전파됩니다.
curl -sS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$BODY" \
  -w "\nIndexNow 응답 코드: %{http_code}\n"

echo "완료. 200/202 응답이면 정상 접수된 것입니다."
