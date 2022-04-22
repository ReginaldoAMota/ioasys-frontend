import axios from "axios";

const books = {
    getAll: async (token, page) => {
        try {
            const response = await axios.get(
                `https://books.ioasys.com.br/api/v1/books?page=${page}&amount=12`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }

            );
            return [response.data, null];
        } catch (error) {
            return [null, error];
        }
    },
    getById: async (token, id) => {
        try {
            const response = await axios.get(
                `https://books.ioasys.com.br/api/v1/books/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            );
            return [response.data, null];
        } catch (error) {
            return [null, error];
        }
    }
}

export default books;