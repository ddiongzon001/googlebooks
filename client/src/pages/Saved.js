import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron'
import API from '../utils/API';
import Card from '../components/Card';
import Column from '../components/Column';
import Container from '../components/Container';
import Row from '../components/Row';

class Saved extends Component {

    state = {
        bookList: []
    }

    componentDidMount() {
        this.getSavedBooks();
    }

    getSavedBooks = () => {
        API.getBooks()
            .then(({ data: bookList }) => {
                this.setState({ bookList })
            });
    }

    deleteBook = (bookId) => {
        API.removeBook(bookId)
            .then(this.getSavedBooks())
            .catch(err => console.log(err))
    }

    render() {

        console.log(this.state.bookList);
        return (
            <>
                <Jumbotron
                    fluid
                    bg={'dark'}
                    color={'light'}
                    pageTitle={"Your Saved Books!"}
                />

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
                                            className={'btn btn-danger btn-sm'}
                                            onClick={() =>
                                                this.deleteBook(book.bookId)
                                            }>
                                            Delete
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

export default Saved;