import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";


const AllRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/adminRequest/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setRequests(data);
                setRecords(data)
        })
    }, [user])
    
    const handleSearch = (event) => {
        setRecords(requests.filter(asset => asset.employeeEmail.toLowerCase().includes(event.target.value) || asset.employeeName.toLowerCase().includes(event.target.value)));
    }

    const handleMakeApproved = (id) => {
        fetch(`https://insight-store-server.vercel.app/admin/approvedReq/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Asset is Approved`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleMakeRejected = (id) => {
        fetch(`https://insight-store-server.vercel.app/admin/rejectedReq/${id}`, {
            method:'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `This Asset is Rejected`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div>
            <div className="join flex items-center justify-center mt-10">
                <input onChange={handleSearch} className="input input-bordered join-item" placeholder="Search By Email or Name"/>
                <button className="btn join-item rounded-r-full">Search</button>
            </div>
            <div className="flex items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-5">
                    {
                        records.map(request => <div key={request._id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{request.productName}</h2>
                                    <p>Type: {request.productType}</p>
                                    <p>Requester Mail: {request.employeeEmail}</p>
                                    <p>Requester Name: {request.employeeName}</p>
                                    <p>Request Date: {request.date}</p>
                                    <p>Additional Note: {request.additional_info}</p>
                                    <p>Status: {request.status}</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={()=> handleMakeApproved(request._id)} disabled={request.status === 'Approved' || request.status == 'Rejected'} className="btn btn-warning">Accept</button>
                                        <button onClick={()=> handleMakeRejected(request._id)} disabled={request.status === 'Approved' || request.status == 'Rejected'} className="btn btn-warning">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllRequest;