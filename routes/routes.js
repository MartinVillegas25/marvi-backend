const express = require('express');
const router = express.Router()
const {contacto}=require('../middlewares/contacto');
const dbConnection = require('../db/database')


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

router.post('/login',(req, res) => {
    const usuario = req.body.usuario;
    const password = req.body.contraseña;
    let sql = 'SELECT * FROM login WHERE usuario=? AND contraseña=?'
    dbConnection.query(sql,[usuario, password], (err,rows) => {
        if(rows.length > 0) {
            res.render('admin')
        }else{
            console.log(err);
            res.render('login',{
                mostrar: true,
                mensaje: 'usuario o contraseña incorrecta'
            })
        }
    })
})


/*----admin-----*/

router.get('/admin',(req, res) => {
    let sql= 'SELECT * FROM sobremi';
    dbConnection.query(sql,(err, data) => {
        if(!err){
            res.render('admin',{
                sobremi: data[0].aboutme,
            })
        }else{
            console.log(err)
        }
    })
})

/*---editar sobre mi----*/

router.post('/sobremi', (req, res)=>{
    const aboutme = req.body.aboutme;
    console.log(aboutme);
    let sql = 'UPDATE sobremi SET aboutme=?'
    dbConnection.query(sql,[aboutme], (err,result) => {
       if(!err){        
        res.render('admin',{
            sobremi:aboutme
        })
       }else{
           console.log(err);
       }
       
       
    })

})




module.exports = router;



