import {Router} from "express";
import{ productManager } from "../managers/products/ProductManagerMongo.js"; 
import {__dirname} from '../utils.js'

const router = Router()


router.get('/', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        console.log(products);
        res.render('home',{products: products})
    } catch (error) {
        throw res.status(500).json({ error }) 
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
        console.log(products);
        //res.status(200).json({message:'Products', products})
        res.render('products',{products: products})
    } catch (error) {
        throw res.status(500).json({error})
    }
})



router.get('/realtimeproducts', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        res.render('realTimeProducts',{products: products})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
    
})




export default router