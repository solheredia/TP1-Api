import express from 'express';
//import "file system".Permite trabajr con los archivos propios del proyecto
import fs from  "fs";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    }catch (error) {
        console.log("error");
    }
    
};
const writeData = (data) => {
    try{
        fs.writeFileSync("./db.json", JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
}
//readData();
app.get('/', (req, res) => {
    res.send("Welcome to my first API with node js!");

});
//GET all
app.get("/books",(req,res) =>{
    const data = readData();
    res.json(data.books);
})
//GET by Id
app.get("/books/:id", (req, res) =>{
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((aBook) => aBook.id === id);
    res.json(book);

})
//POST
app.post("/books", (req, res) =>{
    const data = readData();
    const body = req.body;
    const newBook = {
        id: data.books.length + 1,
        ...body,
    }
    data.books.push(newBook);
    writeData(data);
    res.json(newBook);
});
//PUT
app.put("/books/:id", (req, res) =>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex =data.books.findIndex((aBook)=>  aBook.id === id);
    data.books[bookIndex]={
        ...data.books[bookIndex],
        ...body,
    };
  
    writeData(data);
    res.json({message:"book update succesfully."});

});
//DELETE
app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((aBook)=>  aBook.id === id);
    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({message: "Book deleted seccessfully"})
});
app.listen(3000, () =>{
    console.log("El servidor esta escuchando en el puerto 3000");
});