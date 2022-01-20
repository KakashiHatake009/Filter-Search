const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - category
 *       properties:
 *         id:
 *           type: number
 *           description: id of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         category:
 *           type: string
 *           description: category of the prodcut belongs to (books, food, sports, furniture)
 *         rating:
 *           type: number
 *           description: Rating of the product
 *       example:
 *         id: 1
 *         title: Beyond Good and Evil
 *         category: Books
 *         rating: 2
 */

/**
 * @swagger
 * tags:
 *   name: Prodcuts
 *   description: The Prodcuts filter API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all prodcuts or with filters
 *     tags: [prodcuts]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: false
 *         description: id of the product
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Name of the product
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: category of the prodcut belongs to (books, food, sports, furniture)
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *         required: false
 *         description: Rating of the product (will return products with rating =>)
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *
 */

/**
 * Route to get product list based on params proved or not.
 * if params provided are empty, then return all the product list from db
 * if params are provided, return the list absed on parms
 *
 * rating filter return equals or greaterthan the provided input
 *    example: const queryRating = 3
 *             const productList = (queryRating) => {
 *                      products.filter((product) => {
 *                          product[rating] >= queryRating;
 *                      });
 *                      }
 */
router.get("/", (req, res) => {
  const products = req.app.db.get("products");
  const filters = req.query;
  if (filters) {
    const filteredProducts = products.filter((product) => {
      let isValid = true;
      for (key in filters) {
        // console.log(key, product[key], filters[key]);
        // console.log(typeof key);
        if (key === "rating") {
          isValid = isValid && product[key] >= filters[key];
        } else {
          isValid = isValid && product[key] == filters[key];
        }
      }
      return isValid;
    });
    res.send(filteredProducts);
  } else {
    res.send(products);
  }
});

module.exports = router;
