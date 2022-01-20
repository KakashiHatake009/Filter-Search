const PORT = process.env.PORT || 4000;

const express = require("express");
const cors = require("cors");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./database/db.json");
const db = low(adapter);

db.defaults({ products: [] }).write();

const productsRouter = require("./routes/products");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A Product Filter API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.db = db;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
