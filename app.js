const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const cors = require('cors')
const appRoot = require("app-root-path");
var user = require('./routes/user')
var swaggerUi = require('swagger-ui-express');
var OpenApiValidator = require('express-openapi-validator');
var YAML = require('yaml');
var fs = require('file-system')

var apiDoc = `${appRoot}/local.yml`

const apiSpecs = fs.readFileSync(apiDoc, 'utf8')
const swaggerDocument = YAML.parse(apiSpecs)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
    OpenApiValidator.middleware({
        apiSpec: swaggerDocument,
        fileUploader: false
    })
)

app.use('/api/user', user);

module.exports = app
