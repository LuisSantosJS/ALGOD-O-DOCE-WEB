import React, { createContext, useState, useContext, useEffect } from "react";

type ContextType = {
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    token: string;
    setToken: (value: string) => void;
};

const ContextMain = createContext<ContextType>({
    userSaved: false,
    setUserSaved: (value: boolean) => {},
    token: "",
    setToken: (value: string) => {},
});

const Provider: React.FC = ({ children }) => {
    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("userSaved");
        const tokess = localStorage.getItem("token");
        console.log(saved)
        if (String(saved) === "true") {
            setUserSaved(true);
            setToken(String(tokess));
        }
    }, [userSaved]);

    return (
        <ContextMain.Provider
            value={{
                userSaved,
                setUserSaved,
                token,
                setToken,
            }}
        >
            {children}
        </ContextMain.Provider>
    );
};
export default Provider;

export function useUserSaved() {
    const infoUser: ContextType = useContext(ContextMain);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}

export function useToken() {
    const infoUser: ContextType = useContext(ContextMain);
    const { token, setToken } = infoUser;
    return { token, setToken };
}
