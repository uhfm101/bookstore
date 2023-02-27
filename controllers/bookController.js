const {Book, Author, AuthorBooks} = require('../models')
const genres = ['Novel', 'Fantasy', 'Fiction', 'Adventure Fiction', 'Drama', 'Biography'].sort()

module.exports.viewAll = async function(req, res){
    const books = await Book.findAll()
    res.render('book/view_all', {books})
}

module.exports.viewProfile = async function(req, res){
    const book = await Book.findByPk(req.params.id, {
        include: 'authors'
    })
    const books = await Author.findAll();
    let availableAuthors = []
    for (let i = 0; i<authors.length; i++){
        if(!bookHasAuthor(book, authors[i])) {
            availableAuthors.push(authors[i])
            }
        }
    res.render('book/profile', {book, availableAuthors})
}

module.exports.renderEditForm = async function(req, res){
    const book = await Book.findByPk(req.params.id)
        res.render('book/edit', {book, genres})
}

module.exports.updateBook = async function(req, res){
    const book = await Book.update({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pg_number: req.body.pg_number,
        image: req.body.image,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    })
    res.redirect(`/books/profile/${req.params.id}`)
}

module.exports.renderAddForm = function(req, res){
    const book = {
        title: '',
        genre: genres[0],
        publisher: '',
        author: '',
        pg_number: '',
        image: '',
        description: '',
    }
    res.render('book/add', {book, genres})
}

module.exports.addBook = async function(req, res){
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pg_number: req.body.pg_number,
        image: req.body.image,
        description: req.body.description
    })
    res.redirect(`/books/profile/${book.id}`)
}

module.exports.deleteBook = async function(req, res){
    const book = await Book.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/books')
}

function bookHasAuthor(book, author){
    for (let i=0; i < book.authors.length; i++){
        if(author.id === book.authors[i].id){
            return true
        }
    }
    return false
}