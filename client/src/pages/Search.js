import React, { Component } from 'react';
import API from '../utils/API';
import Card from '../components/Card';
import Column from '../components/Column';
import Container from '../components/Container';
import Jumbotron from '../components/Jumbotron';
import Row from '../components/Row';

class Search extends Component {

    state = {
        userSearch: "",
        bookList: [],
        savedBooksIds: [],
        error: null
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = e => {
        e.preventDefault()

        // if someone submits the form and the term is an empty string
        // this function will stop running and show an error
        if (this.state.userSearch === '') {
            return this.setState({ error: 'Please put in a title' })
        };

        API.getGoogleBooks(this.state.userSearch)
            .then(res => {
                const { items } = res.data
                this.setState({ error: null })

                const bookListCleaned = items.map(book => {
                    return {
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
                    bookList: bookListCleaned, userSearch: ""
                });
            }).then(this.getSavedBooks)
            .catch(err => this.setState({ error: err }));
    };

    getSavedBooks = () => {
        API.getBooks()
            .then(res => {
                const savedBooksIds = res.data.map(book => book.bookId);
                this.setState({ savedBooksIds });
            })
            .catch(err => this.setState({ error: err }));
    };

    handleBookSaveBook = bookId => {
        const book = this.state.bookList.find(book => book.bookId === bookId);
        API.insertBook(book)
            .then(() => {
                const savedBooksIds = [...this.state.savedBooksIds, bookId];
                this.setState({ savedBooksIds });
            })
            .catch(err => this.setState({ error: err }));
    };


    render() {

        console.log(this.state.bookList)
        console.log(this.state.savedBooksIds);
        return (
            <>
                <Jumbotron
                    fluid
                    bg={'dark'}
                    color={'light'}
                    pageTitle={"Search for Books!"}
                />
                <Container>
                    <Row>
                        <Column>
                            <Card title={'Search for a book'}>
                                <form onSubmit={this.handleFormSubmit}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search for a book"
                                        onChange={this.handleInputChange}
                                        value={this.state.userSearch}
                                        name="userSearch"
                                    />
                                    {this.state.error && !this.state.userSearch.length && (
                                        <div className="alert alert-danger my-2">
                                            {this.state.error}
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-block btn-dark mt-2">
                                        Search
                                    </button>
                                </form>
                            </Card>
                        </Column>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {this.state.bookList.map(book => {
                            return (
                                <Column sm={4} key={book.bookId}>
                                    <Card
                                        key={book.bookId}
                                        title={book.title}
                                        image={book.image}
                                    >
                                        {`By: ${
                                            book.authors.length
                                                ? book.authors.join(', ')
                                                : null
                                            }`}
                                        <p>{book.description}</p>

                                        <button
                                            disabled={
                                                this.state.savedBooksIds.includes(book.bookId)
                                                    ? true
                                                    : undefined
                                            }
                                            className={'btn btn-success btn-sm'}
                                            onClick={() =>
                                                this.handleBookSaveBook(book.bookId)
                                            }>
                                            Save Book
                                        </button>

                                    </Card>
                                </Column>
                            )
                        })}
                    </Row>
                </Container>
            </>
        )

    }
}

export default Search;