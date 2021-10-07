let express = require("express");
const app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose")
cors = require("cors");

app.use(cors());

const rutas = require("./Rutas/rutas");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const user='minticDB';
  const password='minticDB';
  const dataB='vuecrudmevn'
  const uri=`mongodb+srv://${user}:${password}@cluster0.y3w80.mongodb.net/${dataB}?retryWrites=true&w=majority`;

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})
.then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));  

app.use("/api", rutas);

app.get("/", ( req, res)=> {
    const datos={
        msg: 'hola mundo',
        status: false
    }
    res.send ( datos)
})

const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
  console.log("Puerto escuchando " + port);
});

app.use((req, res, next) => {
    //next(createErro
  });