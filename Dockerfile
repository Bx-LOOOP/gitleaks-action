FROM zricethezav/gitleaks:v7.4.0

LABEL "com.github.actions.name"="gitleaks-action"
LABEL "com.github.actions.description"="runs gitleaks on push and pull request events"
LABEL "com.github.actions.icon"="shield"
LABEL "com.github.actions.color"="purple"
LABEL "repository"="https://github.com/zricethezav/gitleaks-action"

RUN apk update && apk add nodejs npm

ADD package.json /package.json
ADD package-lock.json /package-lock.json
ADD merge.js /merge.js
ADD default.toml /default.toml
ADD entrypoint.sh /entrypoint.sh
RUN npm ci

ENTRYPOINT ["/entrypoint.sh"]
