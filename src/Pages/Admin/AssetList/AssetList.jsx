// import React from 'react';

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";

const AssetList = () => {
    const [assets, setAssets] = useState([]);
    const [records, setRecords] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/addAsset/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAssets(data);
                setRecords(data);
        })
    }, [user])

    const handleSearch = event => {
        setRecords(assets.filter(asset => asset.productName.toLowerCase().includes(event.target.value)));
    }

    const handleAvailable = () => {
        setRecords(assets.filter(asset => asset.quantity>0));
    }

    const handleOutOfStock = () => {
        setRecords(assets.filter(asset => asset.quantity<=0));
    }
    
    const handleReturnable = () => {
        setRecords(assets.filter(asset => asset.productType=='returnable'));
    }

    const handleNonReturnable = () => {
        setRecords(assets.filter(asset => asset.productType=='non returnable'));
    }

    const handleDelete = id => {
        fetch(`https://insight-store-server.vercel.app/deleteAsset/${id}`, {
            method: 'DELETE '
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Asset has been deleted.',
                        'success'
                    )
                }
        })
    }

    return (
        <div>
            <div className="join flex items-center justify-center mt-10">
                <input onChange={handleSearch} className="input input-bordered join-item" placeholder="Product Name"/>
                <button className="btn join-item rounded-r-full">Search</button>
            </div>
            <div className="flex items-center justify-center gap-5 mt-10">
                <button onClick={handleAvailable} className="btn btn-active btn-neutral">Available</button>
                <button onClick={handleOutOfStock} className="btn btn-active btn-warning">Out-Of-Stock</button>
                <button onClick={handleReturnable} className="btn btn-active btn-secondary">Returnable</button>
                <button onClick={handleNonReturnable} className="btn btn-active btn-accent">Non-Returnable</button>
            </div>
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="grid grid-cols-3 gap-5">
                    {
                        records.map(asset => <div key={asset._id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{asset.productName}</h2>
                                    <p>{asset.productType}</p>
                                    <p>Quantity: {asset.quantity}</p>
                                    <p>{asset.date}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/updateAsset/${asset._id}`} className="btn btn-neutral">Update</Link>
                                        <Link onClick={()=>{handleDelete(asset._id)}} className="btn btn-neutral">Delete</Link>
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

export default AssetList;