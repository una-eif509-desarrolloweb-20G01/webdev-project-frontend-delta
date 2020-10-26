import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Layout, Menu, Breadcrumb} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./components/Home";
import Department from "./components/Department";
import DepartmentList from "./components/DepartmentList";
import Hour from "./components/Hour";
import Signup from "./components/Signup";

function App() {
    const {Header, Content, Footer} = Layout;
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <Router>
            <Layout className="layout">
                 <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" style={{float: 'right'}} >
                        {
                            currentUser?(
                                <>
                                <Menu.Item key="2">
                                    <a href="/departments" className="nav-link">
                                        Departments
                                    </a>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <a href="/departments/add" className="nav-link">
                                        Add Departments
                                    </a>
                                </Menu.Item>

                                    <Menu.Item key="2">
                                        <a href="/login" className="nav-link" onClick={logOut}>
                                            LogOut
                                        </a>
                                    </Menu.Item>
                                </>
                            ):(
                                <>
                                    <Menu.Item key="/login">
                                        <Link to={"/login"}>
                                            Login
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/signup">
                                        <Link to={"/signup"}>
                                            Sign up
                                        </Link>
                                    </Menu.Item>
                                </>
                            )
                        }
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/departments" component={DepartmentList}/>
                            <Route exact path="/hours" component={Hour}/>
                            <Route exact path="/signup" component={Signup}/>
                            <Route exact path="/departments/add" component={Department} />
                            <Route path="/departments/add/:id" component={Department} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Router>
    );
}

export default App;