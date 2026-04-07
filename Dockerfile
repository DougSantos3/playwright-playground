# This image already contains Node.js and all browser binaries + OS dependencies.
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

RUN apt-get update && \
    apt-get install -y default-jre && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV CI=true

CMD ["npx", "playwright", "test"]
