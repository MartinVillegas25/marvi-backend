const express = require('express');
const {contacto}=require('../../middlewares/contacto');
const dbConnection = require('../../db/database');
const { upload,maxSizeMB,multer}=require('../../middlewares/multer.js')

const get_index = (req, res) => {
    res.render('index')
};

const get_sobremi = (req, res) => {
    let sql= 'SELECT * FROM sobremi';
    dbConnection.query(sql,(err, data) => {
        if(!err){
            res.render('about',{
                mensaje: data[0].aboutme,
            })
        }else{
            console.log(err)
        }
    })
};

const get_work = (req, res) => {
    let sql = 'SELECT * FROM work'
    dbConnection.query(sql, (err, data) => {
        if(!err){
            res.render('work', {
                fotos: true,
                foto:data
            })
        }else{
            console.log(err)
        }
    })
};

const get_contacto =(req, res) => {
    res.render('contact')
};

const post_contacto = (req,res) => {
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
};

module.exports ={
    get_index,
    get_sobremi,
    get_work,
    get_contacto,
    post_contacto
}