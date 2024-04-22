const fs = require('fs');
const ProductManager = require('./ProductManager')
const paths = './products.json'
const Productos = new ProductManager(paths);

class CartProduct{

    #Carts;

    constructor(path){
        this.path = path;
    }

    getCartsProduct(){
        if (fs.existsSync(this.path)) {
            console.log("opcion1",this.path)
            const dataJson = fs.readFileSync(this.path, 'utf-8')
            return JSON.parse(dataJson)
        }else{
            console.log("opcion2")
        }
        // [ { id: 1, products: [ [Object], [Object] ] } ]
    }

    getCartsProductById(id){
        const elements = this.getCartsProduct()
        console.log(elements)
        if(elements){
            
            const cartFound = elements.find(cart => cart.id === id)
            console.log(cartFound)
            return [cartFound]
        }
    }
    deleteCartProductsById(id){
        const elements = this.getCartsProduct()
      
        if(elements){
            
            const cartFound = elements.filter(carts => carts.id != id)
            fs.writeFileSync(this.path,JSON.stringify(cartFound,null,2))
        }
    }

    addCartsProducts(cartId,productId){
        if (Productos.getProductById(productId)){
            const cart = this.getCartsProductById(cartId)
            this.deleteCartProductsById(cartId)
            const allCarts = this.getCartsProduct()
            console.log("TODOS",JSON.stringify(allCarts))
            const productIndex = cart[0].products.findIndex(p => p.product === productId)
    
            if (productIndex != -1){
                cart[0].products[productIndex].quantity++;
                allCarts.push(cart[0])
                allCarts.sort((a, b) => a.id - b.id);
                fs.writeFileSync(this.path,JSON.stringify(allCarts,null,2))
            }else{
                const newprod = {
                    product:productId,
                    quantity:1
                }
                cart[0].products.push(newprod)
                allCarts.push(cart[0])
                allCarts.sort((a, b) => a.id - b.id);
                fs.writeFileSync(this.path,JSON.stringify(allCarts,null,2))
            }
        }
    }

    createCart(body){
        const products = body
        console.log(products)
        const inputData = products
        const Carts = this.getCartsProduct()
        let id = 0
        if(Carts){
            const ultElement = [...Carts].pop()
            id = ultElement.id + 1
            const newCart = {
                id : id,
                products:[]
            }
            const outProduct = inputData.products.map(prod => (
            {
                product : prod,
                quantity: 1
            }
            ));
            console.log(newCart)
            console.log(outProduct[0])

            outProduct.map(prod=>newCart.products.push(prod))
            
            Carts.push(newCart)
            Carts.sort((a,b)=>a.id - b.id)
            fs.writeFileSync(this.path,JSON.stringify(Carts,null,2))
            return  { status: 'success', mensaje: 'resgistro exitoso'}
        }
    }

}


module.exports = CartProduct;