const express = require('express');
const router = express.Router();

//debo importar y instanciar la clase para acceder a sus metodos

const CartManager = require('../CartManager')
const path = 'carts.json'
const CartProducts = new CartManager(path)



//declaramos los endpoints para productos

router.get('/', (req,res)=>{//hay que modificarlo leer consigna
    res.send(CartProducts.getCartsProduct())
})

router.post('/:cid/product/:pid', (req,res)=>{
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    CartProducts.addCartsProducts(cartId,productId)
    res.status(200).send( { status: 'success', mensaje: 'Registro insertado con exito'})
})

//queda pendiente
router.post('/', (req,res)=>{
    const newObj = req.body;
    const response = CartProducts.createCart(newObj)
    if(response){
        res.send(JSON.stringify(response,null,2))
    }else{
        res.status(500).send({ status: 'failed', mensaje: 'no se completo la acccion'})
    }
    
})

router.get('/:cid',(req,res)=>{
    const idCart = req.params.cid
    console.log("id",idCart)
    const cart = CartProducts.getCartsProductById(parseInt(idCart))
    const response = JSON.stringify(cart[0]?.products)
    if(response){
        res.send(response)
    }else{
        res.status(404).send( { status: 'failed', mensaje: 'Registro no encontrado'})
    }
    
})


module.exports = router;