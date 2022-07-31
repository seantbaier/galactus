# Galactus

## ⚠️ This project is a work in progress

![Galactus Localstack Graphical Interface](https://galactus-assets.s3.amazonaws.com/galactus-img1.jpeg)

GUI wrapper for local development of AWS resources using [Localstack](https://localstak.cloud)

## 🔨 Development

# Localstack Development

Validate `docker-compose.yml` file

```shell
localstack config validate --file=docker-compose.yml
```

# Run Localstack

```shell
docker-compose up --build -d localstack
```
