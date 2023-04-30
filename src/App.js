import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context";
import MainHeader from "./components/mainHeader/MainHeader";
import AppRouter from "./components/AppRouter";
import UserService from "./api/user/UserService";

function App() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            <BrowserRouter>
                { user !== null &&
                    <MainHeader/>
                }
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
