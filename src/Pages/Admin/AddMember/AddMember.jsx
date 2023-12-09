import { useEffect, useState } from "react";
import SingleMember from './SingleMember';

const AddMember = () => {
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        fetch('https://insight-store-server.vercel.app/findEmployee')
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
        })
    }, [])

    return (
        <div className="grid grid-cols-3 p-10">
            {
                employees.map(employee => <SingleMember key={employee._id}
                    employee={employee}
                ></SingleMember>)
            }
        </div>
    );
};

export default AddMember;