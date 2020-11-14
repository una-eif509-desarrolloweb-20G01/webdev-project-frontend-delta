import React, {useState, useEffect} from "react";
import AuthService from "./../services/auth.service";
import { useHistory } from "react-router-dom";
import deparment from './../images/dep.png'; // 
import report from './../images/rep.png'; // 
import timesheet from './../images/tim.png'; // 
import hours from './../images/hou.png'; // 
import paid from './../images/pai.png'; // 

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

    /**/ 
    let history = useHistory();

    const redirect_deparments = () => {
        history.push('/departments')
    }

    const redirect_hours = () => {
        history.push('/hours')
    }
    const redirect_timesheet = () => {
        history.push('/timesheets')
    }
    const redirect_reports = () => {
        history.push('/timesheets')
    }
    const redirect_paid = () => {
        history.push('/timesheets')
    }


      /**/

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
                
                <div className='box' onClick={redirect_deparments}>
                    <span>Deparments</span>
                    <img src={deparment} alt="deparment" />
                </div>
                <div className='box' onClick={redirect_reports}>
                    <span>Reports</span>
                    <img src={report} alt="report" />
                </div>
                <div className='box' onClick={redirect_timesheet}>
                    <span>Timesheet</span>
                    <img src={timesheet} alt="timesheet" />
                </div>
                <div className='box' onClick={redirect_hours}>
                    <span>Hours</span>
                    <img src={hours} alt="hours" />
                </div>
                <div className='box' onClick={redirect_paid}>
                    <span>Paid&nbsp;&nbsp;&nbsp;</span>
                    <img src={paid} alt="paid" />
                </div>

                    
        </div>
    )
};

export default Home;