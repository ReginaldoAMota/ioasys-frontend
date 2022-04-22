import axios from "axios";

export default async function login(email, password) {
    try {
        const response = await axios.post(
            "https://books.ioasys.com.br/api/v1/auth/sign-in",
            {
                email: email,
                password: password
            }
        );

        return [{ token: response.headers.authorization, data: response.data }, null]
    } catch (error) {
        return [null, error]
    }
}