### Service for processing images with Jimp

# Install packages
  `npm install`

# Run migrations
Commands:
  `sequelize db:migrate --env localhost`                        Run pending migrations
  `sequelize db:migrate:undo:all --env localhost`               Reverts migrations
  

## API Reference

```
  GET /product/${id}/image
  POST /product/${id}/image
  GET /product/${id}/thumbnail
  GET /store/${id}/watermark
  POST /store/${id}/watermark
```
