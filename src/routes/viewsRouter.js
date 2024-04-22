const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('realTimeProducts',{
        styles: 'productsStyle.css'
    })
})

module.exports = router;