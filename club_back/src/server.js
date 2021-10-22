const cors = require ('cors');
const express = require ('express');
const routes = require('./routes');
const bodyParser = require ('body-parser');
const app = express();
//const { secret } = require ('./config/auth.json');
app.use(cors())
//app.use(express.json({limit: '50mb'}));
//app.use(express.urlencoded({limit: '50mb'}));
require('./database/index')

app.use(bodyParser.json({limit:'10mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'10mb', parameterLimit: 1000}));

//app.use(cookieParser());
//app.use(bodyParser.json());

/*app.use(
    session({
        key: 'userId',
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24.
        }
    })
);*/

app.use(routes);

app.listen(3030);

module.exports = app;