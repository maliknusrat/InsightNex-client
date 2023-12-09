// import React from 'react';

import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const MyEmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/employee/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setEmployees(data.myEmployee);
                console.log(data.myEmployee);
        })
    }, [user])

    const handleRemove = employee => {

        const employeeAddedInfo = {
            name: employee.name,
            email: employee.email,
            photo: employee.photo,
            type: employee.type
        }

        fetch(`https://insight-store-server.vercel.app/removeEmployeeToAdmin/${user?.email}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(employeeAddedInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    fetch(`https://insight-store-server.vercel.app/removeAdmin/${employee.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({yourAdmin:user?.email})
                    })
                        .then(res => res.json())
                        .then(data2 => {
                            console.log(data2);
                            if (data2.modifiedCount > 0) {
                                Swal.fire({
                                title: 'Remove Your Team Member Successfully',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }
                            })
                            }
                    })
                }
        })
    }

    return (
        <div className="grid grid-cols-3 max-w-6xl mx-auto">
            {employees.length==0 ? <p>You Have No Team Member</p> : ""}
            {
                employees.map(employee => <div key={employee._id}>
                    <div className="card card-compact w-80 bg-base-100 shadow-xl">
                        <figure><img src={employee.photo} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{employee.name}</h2>
                            <p>Member Type: {employee.type}</p>
                            <div className="card-actions justify-end">
                                <button onClick={()=>{handleRemove(employee)}} className="btn btn-neutral text-white">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default MyEmployeeList;