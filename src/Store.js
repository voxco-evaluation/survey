import React, {useState} from 'react';

const initialResultsState = undefined;

export const ResultsContext = React.createContext();

const Store = ({children}) => {

    const [ResultsState, setResultsState] = useState(initialResultsState);

    return (
        <>
            <ResultsContext.Provider value={[ResultsState, setResultsState]}>{children}</ResultsContext.Provider>
        </>
    );
}

export default Store;
