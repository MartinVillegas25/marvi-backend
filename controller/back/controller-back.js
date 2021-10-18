const express = require('express');
const {contacto}=require('../../middlewares/contacto');
const dbConnection = require('../../db/database');
const { upload,maxSizeMB,multer}=require('../../middlewares/multer.js')

const get_login = (req, res) => {
    res.render('login')
};

const post_admin = (req, res) => {
    const usuario = req.body.usuario;
    const password = req.body.contraseña;
    let sql = 'SELECT * FROM login WHERE usuario=? AND contraseña=?'
    dbConnection.query(sql,[usuario, password], (err,rows) => {
        if(rows.length > 0) {
            let sql2 = 'SELECT * FROM WORK'
            dbConnection.query(sql2, (err,data) => {
                if(!err && data.length > 0) {
                    let sql1= 'SELECT * FROM work, sobremi'
                    dbConnection.query(sql1,(err, data,rows) => {
                       if(!err){
                            res.render("admin",{
                                fotos:true,
                                foto:data,
                                sobremi: data[0].aboutme
                            })
                                req.session.loggin=true
                        }else{
                            console.log(err)
                        }
                    })
                }else{
                    let sql3 = 'SELECT * FROM sobremi'
                    dbConnection.query(sql3,(err, data)=>{
                        if(!err){
                            res.render('admin',{
                                fotos:false,
                                sobremi: data[0].aboutme
                            })
                        }
                    })
                }
            })
         
        }else{
            console.log(err);
            res.render('login',{
                mostrar: true,
                mensaje: 'usuario o contraseña incorrecta'
            })
        }
    })
};

const get_admin = (req, res) => {

    if(req.session.loggin){
       let sql2 = 'SELECT * FROM WORK'
       dbConnection.query(sql2, (err,data) => {
           if(!err && data.length > 0) {
               let sql1= 'SELECT * FROM work, sobremi'
               dbConnection.query(sql1,(err, data,rows) => {
                  if(!err){
                       res.render("admin",{
                           fotos:true,
                           foto:data,
                           sobremi: data[0].aboutme
                       })
                           req.session.loggin=true
                   }else{
                       console.log(err)
                   }
               })
           }else{
               let sql3 = 'SELECT * FROM sobremi'
               dbConnection.query(sql3,(err, data)=>{
                   if(!err){
                       res.render('admin',{
                           fotos:false,
                           sobremi: data[0].aboutme
                       })
                   }
               })
           }
       })
    } else{
           res.render('login',{
                 mostrar: true,
                 mensaje: 'debe loguearse para poder ingresar a admin' 
            })
     }
         
       };

const post_sobremi = (req, res)=>{
    const aboutme = req.body.aboutme;
    
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

};

const post_agregar = (req, res)=>{
    
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Error de Multer al subir imagen
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).render('admin', { 
                    error:true, 
                    mensaje: `Imagen muy grande, por favor ahicar a ${maxSizeMB}`
                });
            }
            // Otros errores de Multer
            return res.status(400).render('admin', { 
                error: true,
                mensaje: `Ha pasado el siguiente error con Multer ${err.code}`
            });
        } else if (err) {
            // Otros errores ajenos a Multer
            return res.status(400).render('admin', { 
                error:true,
                mensaje: `Ha pasado el siguiente error: ${err}`
            });

        }
        // TODO OK! sigamos para adelante

        const {filename} = req.file;
        
           
        let sql = 'INSERT INTO work SET foto=?';
        dbConnection.query(sql, [filename], (err, data) => {
            if (!err){
                let sql1 = 'SELECT * FROM work, sobremi'
                dbConnection.query(sql1, (err, data,rows)=>{
                    res.render("admin",{
                        fotos:true,
                        foto:data,
                        sobremi: data[0].aboutme
                    })
                })
                
            } else{
                console.log(`Ocurrió un error ${err.code}`);
                console.log("Información de cliente insertado correctamente ");
            }
        })
       


    })
};

const get_borrar = (req, res)=>{
    const id = req.params
    const idborrar = id.id
    

    let sql = 'DELETE FROM work WHERE idwork=?'
    dbConnection.query(sql, idborrar , (err, result,rows) => {
        
        if (!err){
            res.redirect("/admin")     
        } else{
            console.log(`Ocurrió un error ${err.code}`);
            
        }
    })
};

const get_loggout = (req, res)=>{
    req.session.destroy(error=>{

    });

    res.redirect("login")
}

module.exports = {
    get_login,
    post_admin,
    get_admin,
    post_sobremi,
    post_agregar,
    get_borrar,
    get_loggout
}