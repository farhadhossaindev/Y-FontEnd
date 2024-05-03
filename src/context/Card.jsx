import { createContext, useContext, useEffect, useState } from "react";


const CardContext = createContext();

const CardProvider = ({ children }) => {
    const [card, setCard] = useState([]);

    useEffect(() => {
        let existingCardItem = localStorage.getItem('card');
        if (existingCardItem) setCard(JSON.parse(existingCardItem));
    }, [])

    return (
        <CardContext.Provider value={[card, setCard]}>
            {children}
        </CardContext.Provider>
    );
};

// Hook Custom
const useCard = () => useContext(CardContext);

export { useCard, CardProvider };
