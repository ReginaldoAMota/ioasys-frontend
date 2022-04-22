import { createContext, useState } from "react";

const DEFAULT_VALUE = {
    state: {
        isLoggedIn: false,
        token: '',
        user: {},
        books: {
            data: [],
            page: 0,
            totalItems: 0,
            totalPages: 0,
        },
        book: null,
        ModalBookInfoIsOpen: false,
    }
}

const RootContext = createContext(DEFAULT_VALUE);

const RootContextProvider = props => {
    const [state, setState] = useState(DEFAULT_VALUE.state);
    return (
        <RootContext.Provider value={{ state, setState }}>
            {props.children}
        </RootContext.Provider>
    )
}

export default RootContext
export { RootContextProvider }