import { cartsModel } from "../../db/models/carts.model.js";

import { productManager } from "../products/ProductManagerMongo.js"; 

class CartManager {
    async getCarts(){
        try {
            const carts = await cartsModel.find({})
            return carts
        } catch (error) {
            throw error
        }
    }
    async getCartById(id){
        try {
            const cart = await cartsModel.findById(id)  //.populate('products',['title','description'])
            if(!cart){
                return {"ERROR":`El Carrito con ID ${id} no existe o no es un número`}
            } 
            return cart
        } catch (error) {
            throw error
        }
    }
    async createCart(obj){
        try {
            const newCart = await cartsModel.create(obj)
            return newCart
            /* const newCart = new cartsModel();
            await newCart.save();
            return "Cart created"; */
        } catch (error) {
            throw error
        }
    }
    async addProduct(cid, pid, newQuantity){
        try {
            const cart = await this.getCartById(cid)
            const product = cart.products.find(p=>p.product.equals(pid))
            if (product) {
                product.quantity += newQuantity
            } else {
                cart.products.push({ product: pid, quantity: newQuantity })
            }
            await this.save(cart)
            return {"product added to cart": cart}
        } catch (error) {
            throw error
        }
    }


}


export const cartManager = new CartManager() 