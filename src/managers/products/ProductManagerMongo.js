import { productsModel } from "../../db/models/products.model.js";

class ProductManager {
    async getProducts(){
        try {
            const products = await productsModel.find({})
            return products
        } catch (error) {
            throw error
        }
    }
    async createProduct(obj){
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct
        } catch (error) {
            throw error
        }
    }
    async getProductById(id){
        try {
            const product = await productsModel.findById(id)
            if(!product){return {"ERROR":`El Producto con ID ${id} no existe o no es un número`}}
            return product
        } catch (error) {
            throw error
        }
    }
    async updateOne(id,obj){
        try {
            const UpdateProduct = await productsModel.updateOne({_id:id},{...obj})
            return UpdateProduct
        } catch (error) {
            throw error
        }
    }
    async deleteProduct(id){
        try {
            const deleteProduct = await productsModel.findByIdAndDelete(id)
            return deleteProduct
        } catch (error) {
            throw error
        }
    }
 
    async findOne(obj){
        try {
            const product = await productsModel.findOne(obj).explain('executionStats')
            return product
        } catch (error) {
            throw error
        }
    }


    async paginateFun(obj){
        const  {limit,page,sort,...query} = obj
        try {
            console.log(limit,page,query,sort);
            const result = await productsModel.paginate({query},{limit,page,sort})
            const info = {
                count: result.totalDocs,
                pages: result.totalPages,
                next: result.hasNextPage
                ? `http://localhost:8080/api/products?page=${result.nextPage}`
                : null,
                prev: result.hasPrevPage
                ? `http://localhost:8080/api/products?page=${result.prevPage}`
                : null,
            }
            return {info, /* results: result.docs */}
        } catch (error) {
            throw error 
        }
    }
}

export const productManager = new ProductManager() 