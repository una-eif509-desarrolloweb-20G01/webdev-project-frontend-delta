import React, {useState, useEffect} from "react";
import AuthService from "./../services/auth.service";

const Home = (props) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }else{
            console.log('no user')
        }
    }, []);

    return (
        <div>
            {
                currentUser?
                (
                    <h1>HOME</h1>
                ):
                (
                    <h1>loading...</h1>
                )

            }
        </div>
    )
};

export default Home;