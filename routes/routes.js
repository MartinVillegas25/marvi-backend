const express = require('express');
const router = express.Router()
const {contacto}=require('../middlewares/contacto')


//rutas get del front

// get pag principal
router.get('/',(req, res) => {
    res.render('index')
})


//get sobre mi
router.get('/about',(req, res) => {
    res.render('about')
})



//get trabajos
router.get('/work',(req, res) => {
    res.render('work')
})


//get contacto
router.get('/contact',(req, res) => {
    res.render('contact')
})

//post contacto

router.post('/enviar',(req,res) => {
    try {
        const nombre = req.body.name;
        const email = req.body.email;
        const telefono = req.body.phone;
        const asunto = req.body.subject;
        const mensaje = req.body.message;
        res.status(200)
        contacto(nombre,email,telefono,asunto,mensaje)
        res.status(200).render('contact',{
            mostrar: true,
            mensaje: "mensaje enviado" 
        })
        
    } catch (error) {
        res.status(500)
        console.log(error)
        res.status(500).render('contact',{
            mostrar: true,
            mensaje: 'hubo un error'

          })
    }
})


/*---------- rutas del back---------*/

/* login*/

router.get('/login',(req, res) => {
    res.render('login')
})





module.exports = router;



