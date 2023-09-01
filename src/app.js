import express from "express";
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'

import './db/dbConfig.js'

// Import Routes
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


/* import ProductManager from './managers/products/ProductManagerFile.js';
const manager = new ProductManager("Products.json"); */


/* import { Server } from 'socket.io' */



// Express
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Public
app.use(express.static(__dirname+'/public'))


// Handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')


// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views',viewsRouter)

// Puerto
const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
})





/* const socketServer = new Server(httpServer)

const products = await manager.getProducts()

socketServer.on('connection', async socket=>{
    console.log(`Usuario conectado: ${socket.id}`);
    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })
    socket.on('addProduct', async (newProduct) => {
        const productAdded = await manager.addProducts(newProduct);
        socketServer.emit('productAdded', productAdded);
    });
    socket.on('deleteProduct', async (productId) => {
        const productDeleted = await manager.deleteProduct(Number(productId));
        socketServer.emit('productDeleted', productDeleted)

        const productsUpdated = await manager.getProducts()
        console.log(productsUpdated);
        socketServer.emit('productDeleted', productsUpdated => {
            products = productsUpdated
        }); 
    });
}) 
 */