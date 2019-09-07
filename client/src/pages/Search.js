import React, { Component } from 'react';
import API from '../utils/API'
import { eventNames } from 'cluster';

class Search extends Component{

    state = {
        userSearch: "",
        bookList: [],
        savedBooksIds: [],
        error: null
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]:value
        });
    };

    handleFormSubmit = e => {
        e.preventDefault()

        // if someone submits the form and the term is an empty string
        // this function will stop running and show an error
        if (this.state.userSearch === ''){
            return this.setState({error: 'Please put in a title'})
        };

        API.getGoogleBooks(this.state.userSearch)
        .then(res => {
            const {items} = res.data
            this.setState({error: null})

            const bookListCleaned = items.map(book => {
                return{
                    // creating new object for each book brought back
                    bookId: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.imageLinks 
                        ? book.volumeInfo.imageLinks.thumbnail 
                        : ""
                }
            });

            return this.setState({
                bookList: bookListCleaned, userSearch: ""});
            }).then(this.getSavedBooks)
            .catch(err => this.setState({error: err}));
        };
    };

    getSavedBooks = () => {
        API.getBook()
        .then(res => {
            const savedBooksIds = res.data.map(book => book.bookId);
            this.setState({savedBooksIds});
        })
        .catch(err => this.setSTate({error: err}));
    };

    handleBookSaveBook = bookId => {
        const book = this.state.bookList.find(book => book.bookId === bookId)

        API.insertBook(book).then(() => {
            const savedBookIds = [...this.state.savedBookIds, bookId];
        })
    }


    render(){
        return(
            <h1>Hello this is the search page</h1>
        )
    }
}

export default Search;