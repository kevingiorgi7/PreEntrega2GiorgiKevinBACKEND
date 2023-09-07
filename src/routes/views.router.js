import { Router } from "express";
import { productManager } from "../managers/products/ProductManagerMongo.js";
import { __dirname } from "../utils.js";

const router = Router();

// HOME HANDLEBARS
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        console.log(products);
        res.render("home", {
            products: products,
        });
    } catch (error) {
        throw res.status(500).json({
            error,
        });
    }
});

// PRODUCTS HANDLEBARS
router.get("/products", async (req, res) => {
    const {
        limit = 10, page = 1, sort, ...query
    } = req.query;
    try {
        console.log(req.query);

        const products = await productManager.paginateRender(
            limit,
            page,
            sort,
            query
        );
        const info = products.info;
        const payload = info.payload;

        res.render("products", {
            info,
            payload
        });
    } catch (error) {
        throw res.status(500).json({
            error
        });
    }
});


// REAL TIME PRODUCTS HANDELEBARS
router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("realTimeProducts", {
            products: products,
        });
    } catch (error) {
        throw res.status(500).json({
            error,
        });
    }
});

export default router;
