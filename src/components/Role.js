import React, {useState, useEffect} from "react";
import {Alert, Table} from 'antd';

import RoleService from "../services/role.service";

const initialRoleListState = [
    {
        "idRole": 0,
        "name": 0
    }
];

const Role = (props) => {
    const [RoleList, setRoleList] = useState(initialRoleListState);
    const [error, setError] = useState(false);

    /**
     * React Hooks
     * https://reactjs.org/docs/hooks-reference.html
     */

    useEffect(() => {
        getAllPrioritiesMethod();
        // eslint-disable-next-line 
    },[]);

    /** Service methods **/
    const getAllPrioritiesMethod = () => {
        RoleService.getAll()
            .then(response => {
                setRoleList(response.data);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
                setError(err)
                if (err.response.status === 401) {
                    props.history.push("/login");
                    window.location.reload();
                }
            });
    }

    /** Handle actions in the Form **/

    /** General Methods **/
    const columns = [
        {
            title: 'Role',
            render: (Role) => Role.name
        }
    ];

    return (
        <div>
            <Table rowKey={Role => RoleList.idRole} columns={columns} dataSource={RoleList}/>
            {error ? (
                <Alert message="Error in the system. Try again later." type="error" showIcon closable/>
            ) : null}
        </div>
    )
};

export default Role;