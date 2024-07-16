### Service for processing images with Jimp

# Install packages
  `npm install`

# Run migrations
Commands:
  `sequelize db:migrate --env localhost`                        Run pending migrations
  `sequelize db:migrate:undo:all --env localhost`               Reverts migrations
  
```
## API Reference

### `GET /product/:id/image`

Retrieve the image associated with a specific product.

### `POST /product/:id/image`

Upload a new image for a specific product.

### `GET /product/:id/thumbnail`

Retrieve the thumbnail image for a specific product.

### `GET /store/:id/watermark`

Retrieve the watermark image associated with a specific store.

### `POST /store/:id/watermark`

Upload or update the watermark image for a specific store.

