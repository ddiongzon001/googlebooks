import axios from 'axios';

// set up functions to talk to backend
const BASEURL = "https://www.googleapis.com/books/v1/volumes?q=";
const APIKEY = `&api_key=${process.env.REACT_APP_API_KEY}`;

export default {
    
    // get all notes
    getBooks: () => {
        return axios.get('/api/notes')
    },

    // get one note by id
    getBook: (id) => {
        return axios.get(`/api/notes/${id}`)
    },
    
    // create note
    insertBook: (newBook) => {
        return axios.post(`/api/notes`, newBook)
    },
    
    // updateNote by id
    updateBook: (id, updatedBook) => {
        return axios.put(`/api/notes/${id}`, updatedBook)
    },

    // remove book by id
    removeBook: (id) => {
        return axios.delete(`/api/notes/${id}`);
    }

}