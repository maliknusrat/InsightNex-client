// import React from 'react';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateAsset = () => {
    const { id } = useParams();
    const [asset, setAsset] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/updateAsset/${id}`)
            .then(res => res.json())
            .then(data => {
                setAsset(data);
        })
    }, [id])

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const type = form.email.value;
        const quantity = form.date.value;

        const assetInfo = {
            productName: name,
            productType: type,
            quantity: quantity
        }

        // console.log(userInfo);

        fetch(`https://insight-store-server.vercel.app/updateAssetInfo/${id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(assetInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Update The Asset Successfully',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    navigate('/assetList');
                }
        })
    }
    
    return (
        <div>
            <form onSubmit={handleUpdate} className="card-body ">
                <div className="form-control">
                    <input type="text" name="name" placeholder="name" className="input rounded-sm input-bordered" required defaultValue={asset.productName}/>
                </div>
                <div className="form-control">
                    <input type="text" name="email" placeholder="Type" className="input rounded-sm input-bordered" required defaultValue={asset.productType}/>
                </div>
                <div className="form-control">
                    <input type="text" name="date" placeholder="Quantity" className="input rounded-sm input-bordered" required defaultValue={asset.quantity}/>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-neutral rounded-none" type="submit" value="Update" />
                </div>
            </form>
        </div>
    );
};

export default UpdateAsset;