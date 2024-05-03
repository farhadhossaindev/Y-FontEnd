import { createContext, useContext, useState } from "react";
import axios from 'axios'; // Add this line

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: '',
        result: []
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    );
};

// Hook Custom
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
