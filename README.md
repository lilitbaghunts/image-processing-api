### Service for processing images with Jimp

### Description

API designed for efficient image processing tasks using worker threads. It leverages the Jimp library for image manipulation and scales operations across multiple threads to enhance performance. This API supports various image processing operations such as resizing, watermarking, and more.


# Install packages
  `npm install`

## Run Migrations

### Commands

- **`sequelize db:migrate --env localhost`**

- **`sequelize db:migrate:undo:all --env localhost`**

### Explanation

- **`sequelize db:migrate --env localhost`**: Executes pending migrations to apply changes to the database schema based on your Sequelize configurations for the localhost environment.

- **`sequelize db:migrate:undo:all --env localhost`**: Reverts all migrations, undoing changes made to the database schema.

### Notes

- Ensure your Sequelize CLI is properly configured with your environment settings.
- Exercise caution when using `sequelize db:migrate:undo:all --env localhost`, especially in production environments.
  
  
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

