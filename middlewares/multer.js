const multer  = require('multer')

var storage = multer.diskStorage({
	destination:  (req, file, cb) => { // cb = callback
		cb(null, './public/uploads/')
	},
	filename:  (req, file, cb) => {
		console.log("OBJETO FILE", file)
		let fileExtension = file.originalname.split('.')[1] 
		cb(null, `${file.originalname}.${fileExtension}`)
	},
})

var maxSize = (1024 * 1024) * 1 // 1MB
var maxSizeMB = formatBytes(maxSize,2) 
// FUNCION: : Manejar errores de la imagen cargada
var upload = multer({
	storage:storage, 
	limits: {fileSize: maxSize },  
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || 	file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Sólo los formatos .png, .jpg y .jpeg son los permitidos'));
        
		}
	}
}).single("foto")


// FUNCION: tamaño de archivo
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


module.exports = {
    upload,
    maxSizeMB,
    multer,
    storage
}