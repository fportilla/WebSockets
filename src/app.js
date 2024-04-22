const express = require('express')
const routerProduct = require('./routes/productRouter.js')
const viewsRouter = require('./routes/viewsRouter.js')
const routerCarts = require('./routes/cartRouter.js')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

let products = []

const app = express()
const httpServer = app.listen(8081,err =>{
    console.log("escuchando el perto 8081")
})
const socketServer = new Server(httpServer);

console.log(__dirname)

// para poder leer los json
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.engine('handlebars',handlebars.engine())

app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')
app.get('/', (req,res)=>{
    res.render('home')
})



app.use('/api/products',routerProduct)
app.use('/api/carts',routerCarts)



app.use('/realtimeproducts',viewsRouter)

socketServer.on('connection', socket =>{
    console.log("nueva conexion")
    socket.on('newproduct', product =>{
        console.log("OBJETO RECIBIDO",product)
        products.push(product)
        socketServer.emit("products",products)
    })

    socket.on("deleteProductByCode",code=>{
        console.log("CODIGO RECIBIDO",code)
        const newproduct= products.filter(prod => prod.code != code)
        products = newproduct
        socketServer.emit("products",products)
    })

    
})



