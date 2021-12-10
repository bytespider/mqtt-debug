FROM node:16-alpine
RUN apk add --no-cache openssl && \
  mkdir certs && \
  openssl genrsa -out certs/ca-key.pem 2048 && \
  openssl req -new -x509 -days 1826 -key certs/ca-key.pem -subj '/C=AU/ST=Some-State/O=Internet Widgits Pty Ltd' -out certs/ca.pem && \
  openssl genrsa -out certs/key.pem 2048 && \
  openssl req -new -key certs/key.pem -subj '/C=AU/ST=Some-State/O=Internet Widgits Pty Ltd' -out certs/csr.pem && \
  openssl x509 -req -in certs/csr.pem -CA certs/ca.pem -CAkey certs/ca-key.pem -CAcreateserial -days 360 > certs/cert.pem
COPY . .
RUN npm ci
VOLUME [ "/certs" ]
ENTRYPOINT ["node", "bin/mqtt-debug"]