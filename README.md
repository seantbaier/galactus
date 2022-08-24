# Galactus

## ⚠️ This project is a work in progress

![Galactus Localstack Graphical Interface](https://galactus-assets.s3.amazonaws.com/galactus-img1.jpeg)

GUI wrapper for local development of AWS resources using [Localstack](https://localstak.cloud)

## 🔨 Development

# Run Localstack

Create `.env.localstack` file with the following envs

```bash
LOCALSTACK_API_KEY=<localstack_api_key> # This is if you want Pro account features
EXTRA_CORS_ALLOWED_ORIGINS=http://localhost:5173
```

```shell
docker run --env-file ./.env.localstack \
--rm -d -p 4566:4566 -p 4510-4559:4510-4559 \
--name localstack localstack/localstack
```

# Run Galactus

Create `.env` file. - `cp .env.example .env` and fill in the neccessary credentials
