const express = require('express');
const router = express.Router()
const {contacto}=require('../middlewares/contacto');
const dbConnection = require('../db/database');
const { upload,maxSizeMB,multer}=require('../middlewares/multer.js');
const { get_index,
        get_sobremi,
        get_work,
        get_contacto,
        post_contacto} = require('../controller/front/controller-front');
const { get_login,
        post_admin,
        get_admin,
        post_sobremi,
        post_agregar,
        get_borrar} = require('../controller/back/controller-back')


//rutas get del front

// get pag principal
router.get('/', get_index)
//get sobre mi
router.get('/about', get_sobremi)
//get trabajos
router.get('/work',get_work)
//get contacto
router.get('/contact', get_contacto)
//post contacto
router.post('/enviar', post_contacto)




/*---------- rutas del back---------*/

/* login*/
router.get('/login', get_login)
router.post('/admin', post_admin)

/*----admin-----*/
router.get('/admin', get_admin)

/*---editar sobre mi----*/
router.post('/sobremi', post_sobremi)

/*----agregar foto----- */
router.post('/agregar', post_agregar)

/** borrar fotos */
router.get('/borrar/:id',get_borrar)


module.exports = router;



