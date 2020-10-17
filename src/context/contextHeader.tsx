import React, { createContext, useState, useContext } from "react";

type ContextType = {
    title: string;
    setTitle: (value: string) => void;
};

const ContextMain = createContext<ContextType>({
    title: "",
    setTitle: (value: string) => { },
});

const ProviderHeader: React.FC = ({ children }) => {

    const [title, setTitle] = useState<string>("Admin");


    return (
        <ContextMain.Provider
            value={{
                title, setTitle
            }}
        >
            {children}
        </ContextMain.Provider>
    );
};
export default ProviderHeader;

export function useTitle() {
    const infoUser: ContextType = useContext(ContextMain);
    const { title, setTitle } = infoUser;
    return { title, setTitle };
}