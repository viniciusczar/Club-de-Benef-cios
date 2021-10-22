const multer = require('multer');
const path = require ('path');
const crypto = require ('crypto');
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));           
        },
        filename: (req, file, cb, res) => {
            //if(req.files.name<=5){
            crypto.randomBytes(12, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        //}
            //return res.status(401).send('Error when inserting files. Please try again with a maximum limit of 5 files per ad.');
        }
    }),
    limits: {
       fileSize: 5 * 1024 * 1024,

    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};