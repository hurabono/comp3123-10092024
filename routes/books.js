const express = require("express")
// import model
const BookModel = require("../models/books")
const routes = express.Router()
const mongoose = require("mongoose");


const DB_CONNECTION_STRING = "mongodb+srv://stephfee:y69kjrSYJi5BdBs6@productdb.mmelk.mongodb.net/?retryWrites=true&w=majority&appName=productdb"; ;

mongoose.connect( DB_CONNECTION_STRING,{ // connect is the calling promise
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {

    console.log("MongoDB connected successfully");

}).catch(err => {

    console.error("MongoDB connection error:", err);

});



//Get All Books
routes.get("/books", (req, res) => {
    
    // res.send({message: "Get All Books"})
    
    BookModel.find().then( (books)=>{

        res.send(books)

    }).catch( (err)=> {

        res.status(500).send({message: err.message})

    })

})

//Add NEW Book
routes.post("/books", async (req, res) => {
    const bookData = req.body
    console.log(bookData)

    try {
        // Create a new book instance
        const book = new BookModel(bookData)

        // save the book to MongoDB
        const newBook = await book.save()
        res.send(newBook);
        
    } catch(err){

        res.status(500).send({message: err.message})

    }

})



//Update existing Book By Id
routes.put("/book/:bookid", (req, res) => {

    // res.send({message: "Update existing Book By Id"})
    
    BookModel.findByIdAndUpdate(req.params.bookid, req.body, {new:true}).then( (book)=> {
        if(book){
            res.send(book)
        }else{
            res.status(404).send({ message: "we can not find the book" })
        }
    }).catch( (err)=>{
        res.status(500).send({message: err.message})
    })

})



//Delete Book By ID
routes.delete("/book/:bookid", (req, res) => {

    BookModel.findByIdAndDelete(req.params.bookid).then( (book)=> {
        if(book){
            res.send(book)
        }else{
            res.status(404).send({ message: "we can not find the book" })
        }
    }).catch( (err)=>{
        res.status(500).send({message: err.message})
    })

})


//Get Book By ID
routes.get("/book/:bookid", (req, res) => {
    
    BookModel.findById(req.params.bookid).then((book) => {
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ message: "We cannot find the book" });
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });

})



//Get All Books in sorted order
routes.get("/books/sort", (req, res) => {
    BookModel.find({})
        .sort({ title: 1 }) 
        .then(books => {
            if (books.length > 0) {

                res.send(books);

            } else {

                res.status(404).send({ message: "No books found" });
                
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

module.exports = routes