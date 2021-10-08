const nodemailer = require('nodemailer');
const express = require('express');


const contacto = (nombre,email, telefono, asunto, mensaje)=>{

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAIL_USER, 
          pass: process.env.PASS_USER, 
        },
      });

      let message = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Marvi mansaje",
        text:"Nuevo Mensaje",
        html:`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
          <h1>Hola Mariano, ${nombre} quiere contactarte a travez de Marvi.com</h1>
         <br />
            <p>Nombre: ${nombre}</p>
            <p>Email: ${email}</p>
            <p>Telefono ${telefono}</p>
            <p>Asunto: ${asunto}</p>
            <p>Mensaje: ${mensaje}</p> 
          </body>
        </html>`
      };
    
      // send mail with defined transport object
      transporter.sendMail(message,(err, res) => {
      
          console.log(err)
      })  
        
     
      

};


module.exports ={
    contacto
}