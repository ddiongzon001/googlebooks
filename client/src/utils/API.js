import axios from 'axios';

// set up functions to talk to backend
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = `&api_key=${process.env.REACT_APP_API_KEY}`;

export default {
    
    // get all books
    getBooks: () => {
        return axios.get('/api/books');
    },

    // get one book by id
    getBook: (id) => {
        return axios.get(`/api/books/${id}`);
    },
    
    // create book
    insertBook: (newBook) => {
        return axios.post(`/api/books`, newBook);
    },
    
    // updatebook by id
    updateBook: (id, updatedBook) => {
        return axios.put(`/api/books/${id}`, updatedBook);
    },

    // remove book by id
    removeBook: (id) => {
        return axios.delete(`/api/books/${id}`);
    },

    // calling api of google books
    getGoogleBooks: (title) => {
        return axios.get(BASEURL+title+APIKEY);
    }

}