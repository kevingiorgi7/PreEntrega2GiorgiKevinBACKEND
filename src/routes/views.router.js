import {
    Router
} from "express";
import {
    productManager
} from "../managers/products/ProductManagerMongo.js";
import {
    __dirname
} from '../utils.js'

const router = Router()


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        console.log(products);
        res.render('home', {
            products: products
        })
    } catch (error) {
        throw res.status(500).json({
            error
        })
    }
})

/* router.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProductsPaginate();
        res.render('products', {products});
    } catch (error) {
        res.status(500).json({ error });
    }
});
 */

router.get('/products', async(req,res)=>{
    const {limit=10,page=1,sort,...query} = req.query
    try {
        console.log(req.query);

        const products = await productManager.paginateRender(limit,page,sort,query)
        const info = products.info
        const payload = info.payload

        res.render('products',{info, payload})
    } catch (error) {
        throw res.status(500).json({error})
    }
})

/* router.get('/products', async (req, res) => {
    try {
        const allprod = await fetch('http://localhost:8080/api/views/products')
        const getProd = await allprod.json()
        const products = getProd.payload
        const productsMap = products.map(e => ({
            _id: e._id,
            title: e.title,
            description: e.description,
            code: e.code,
            price: e.price,
            stock: e.stock,
            category: e.category
        }))
        res.render("products", {
            productsMap
        })
    } catch (error) {
        error
    }
}); */





router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render('realTimeProducts', {
            products: products
        })
    } catch (error) {
        throw res.status(500).json({
            error
        })
    }

})




export default router