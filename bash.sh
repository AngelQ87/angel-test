#!/bin/sh

docker build -t hello-test -f Dockerfile .
docker tag angel-test:latest angelq87/angel-test
docker login -u angelq87 -p dckr_pat_iluI3n-BNuLDrLQ7hgimWxXOQHg
docker push angelq87/angel-test
docker run -p 8082:8080 angel-test:latest
kubectl apply -f service.yml
kubectl apply -f deployment.yml