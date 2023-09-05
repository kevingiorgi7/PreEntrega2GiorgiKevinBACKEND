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

router.get('/realtimeproducts', async (req,res)=>{
    try {
        const products = await productManager.getProducts()
        res.render('realTimeProducts',{products: products})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
    
})




export default router