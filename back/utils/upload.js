/*上传文件的工具类*/
let fs = require('fs');
let path = require('path');
let moment = require('moment');
let multer = require('multer'); // multer 官方推荐上传文件中间件

let storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let t = moment().format('YYYY-M-DD');
        let distPath = `./uploads/${t}`;

        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }

        if (!fs.existsSync(distPath)) {
            fs.mkdirSync(distPath);
        }

        cb(null, distPath);
    },

    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

let upload = multer({storage: storage});

module.exports = upload;

