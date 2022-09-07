### Service for saving and processing images for products

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
  GET /store/${id}/watermark
```
