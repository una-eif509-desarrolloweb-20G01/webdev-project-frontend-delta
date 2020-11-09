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
import Timesheet from "./components/Timesheet";
import TimesheetList from "./components/TimesheetList";
import TimesheetsDetails from "./components/TimesheetDetails";
import NotFound from "./components/NotFound";
import AddHours from "./components/AddHours";
import PayTimesheet from "./components/PayTimesheet";
<<<<<<< HEAD
import ApproveTimesheet from "./components/ApproveTimesheet";
import ReportTimesheet from "./components/ReportTimesheet";
=======
import StaffReport from "./components/StaffReport";
>>>>>>> Gabriel


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
                 <Header className="no-print">
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" style={{float: 'right'}} >
                        {
                            currentUser?(
                                <>

                                    <Menu.Item key="/timesheets">
                                        <Link to={"/timesheets"}>
                                            Timesheets
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/timesheets/add">
                                        <Link to={"/timesheets/add"}>
                                            Add Timesheets
                                        </Link>
                                    </Menu.Item>

                                    <Menu.Item key="/departments">
                                        <Link to={"/departments"}>
                                            Departments
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/departments/add">
                                        <Link to={"/departments/add"}>
                                            Add Departments
                                        </Link>
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
                <Content style={{padding: '0 50px', minHeight:'850px'}}>
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
                            <Route exact path="/departments" component={DepartmentList}/>
                            <Route exact path="/timesheets" component={TimesheetList}/>
                            <Route exact path="/timesheets/add" component={Timesheet} />
                            <Route path="/timesheets/add/:id" component={Timesheet} />
                            <Route path="/timesheetsDetails/add/:id" component={TimesheetsDetails} />
                            <Route path="/timesheetDetails/hours/:id" component={AddHours} />
                            <Route path="/timesheets/pay/:id" component={PayTimesheet} />
<<<<<<< HEAD
                            <Route path="/timesheets/approve/:id" component={ApproveTimesheet} />
                            <Route path="/timesheets/report/:id" component={ReportTimesheet} />
=======
                            <Route path="/timesheets/staffreport/:id" component={StaffReport} />
>>>>>>> Gabriel
                            <Route component={NotFound}/>
                            

                            
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Created by Delta Team</Footer>
            </Layout>
        </Router>
    );
}

export default App;