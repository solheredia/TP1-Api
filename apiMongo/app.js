const express = require ('express');
const dbconnect = require('./config');
const modelBook = require('./bookModel');
const app = express();

const router = express.Router();
//Rutas CRUD
//Create
router.post("/", async(req, res) => {
    const body = req.body;
    const respuesta =  await modelBook.create(body);
    res.send(respuesta);
});
//GET
router.get("/", async(req, res) => {
    const respuesta = await modelBook.find({});
    res.send(respuesta);
});
//GET by ID
router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const respuesta = await modelBook.findById(id);
    res.send(respuesta);
});
//upDate
router.put("/:id", async(req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await modelBook.findOneAndUpdate({_id: id}, body);
    res.send(respuesta);
});
//DELETE
router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const respuesta = await modelBook.deleteOne({_id: id});
    res.send(respuesta);
});
app.use(express.json());
app.use(router);
app.listen(3001, () => {
    console.log("El servidor esta escuchando en el puerto 3001");
});
dbconnect();