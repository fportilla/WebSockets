const fs = require('fs');



class ProductManager {

    #Products;

    constructor(path) {
        this.#Products = [];
        this.path = path;
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            console.log("opcion1",this.path)
            const dataJson = fs.readFileSync(this.path, 'utf-8')
            return JSON.parse(dataJson)
        }else{
            console.log("opcion2")
        }

    }
    /**
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {Array} thumbnails 
     * @param {number} code 
     * @param {number} stock
     * @param {boolean} status
     * @param {string} category
     */



    addProduct(title, description, price, thumbnails, code, stock, status= true, category) {
        const params = [title, description, price, thumbnails, code, stock];
        const isAllFilled = params.map(param => param !== undefined && param !== null && param !== '').every(Boolean);
        let id = 0
        let ultElement = [];
        const val = this.#verifyCode(code)
        if (isAllFilled && val) {
            if (fs.existsSync(this.path)) {
                const contentFile = fs.readFileSync(this.path, 'utf-8')
                const productsFile = JSON.parse(contentFile)
                if (productsFile.length > 0) {
                    ultElement = [...productsFile].pop() //ULTIMO ELEMENTO
                }

                
                id = ultElement.id + 1

                const producto =
                {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    status,
                    category
                }
                this.#Products.push(producto)
                // const p = {id : ultElement.id +1 , ...producto}
                productsFile.push(producto)
                fs.writeFileSync(this.path, JSON.stringify(productsFile, null, 2));
            } else {
                const producto =
                {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    status,
                    category
                }
                this.#Products.push(producto)

                fs.writeFileSync(this.path, JSON.stringify([producto], null, 2))
            }
            return "se agrego correctamente el producto"
        } else {
            return "No se agrego el registro todos los campos son requeridos"
        }

    }

    #verifyCode(code) {
        if (this.#Products.length) {
            const isDuplicated = this.#Products.some(product => product.code === code);
            return !isDuplicated;
        } else {
            return true;
        }
    }

    getProductById(id) {
        const elements = this.getProducts()
       
        if (elements) {
            const resProduct = elements.find(prod => prod.id === id)
            return resProduct
        }

    }

    deleteProduct(id) {
        const elements = this.getProducts()
        if (elements) {
            const resProduct = elements.filter(prod => prod.id != id)
            fs.writeFileSync(this.path, JSON.stringify(resProduct, null, 2))
        }

    }

    updateProduct(id, udpProduct) {
        const product = this.getProductById(id)
        this.deleteProduct(id)
        console.log("product",product)
        const elements = this.getProducts()
        if (udpProduct?.title) {
            product.title = udpProduct.title
        }
        if (udpProduct?.description) {
            product.description = udpProduct.description
        }
        if (udpProduct?.price) {
            product.price = udpProduct.price
        }
        if (udpProduct?.thumbnail) {
            product.thumbnail = udpProduct.thumbnail
        }
        if (udpProduct?.code) {
            product.code = udpProduct.code
        }
        if (udpProduct?.stock) {
            product.stock = udpProduct.stock
        }
        if (udpProduct?.status){
            product.status = udpProduct.status
        }
        if (udpProduct?.category){
            product.category = udpProduct.category
        }
        elements.push(product)

        fs.writeFileSync(this.path, JSON.stringify(elements, null, 2));

    }

}
function isAllParametersFilled(...params) {
    return params.map(param => param !== undefined && param !== null && param !== '');
}

module.exports = ProductManager;

/*
const Productos = new ProductManager(path);

Productos.addProduct("PAÑAL","a",3400,"C://DOCUMENTS/LOGO.PNG",4,23)


Productos.getProductById(0)
Productos.deleteProduct(0)


Productos.updateProduct(0, {
    title: "Hola",
    description: "748787",
    price: 52000,
    thumbnail: "C://DOCUMENTS/LOGO.pdf",
    code: 4,
    stock: 23
})
*/

