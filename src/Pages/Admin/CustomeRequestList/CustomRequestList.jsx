import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";


const CustomRequestList = () => {
    const [assets, setAssets] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/customAssetCollection/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAssets(data);
        })
    }, [user])
    
    const handleMakeApproved = (id) => {
        fetch(`https://insight-store-server.vercel.app/admin/approved/${id}`, {
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
        fetch(`https://insight-store-server.vercel.app/admin/rejected/${id}`, {
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
            {
                assets.map(asset => <div key={asset._id} className="border border-gray-800 rounded-xl mb-10">
                    <div className="grid grid-cols-2 items-center p-5">
                        <div>
                            <p className="text-3xl font-semibold pb-3">{asset.assetName}</p>
                            <p className="text-4xl font-semibold pb-3">{asset.assestType}</p>
                            <p className="text-xl pb-3">Price: {asset.price}</p>
                            <p className="text-xl pb-3 text-justify">Why Need This: {asset.needThis}</p>
                            <p className="text-xl pb-3 text-justify">Additional Info: {asset.addInfo}</p>
                            <p className="text-xl font-bold pb-3">Status: {asset.status}</p>
                            <div className="flex">
                                <button onClick={()=> handleMakeApproved(asset._id)} disabled={asset.status === 'Approved' || asset.status == 'Rejected'} className="btn btn-success mr-5">Accepted</button>
                                <button onClick={()=> handleMakeRejected(asset._id)} disabled={asset.status === 'Approved' || asset.status == 'Rejected'} className="btn btn-error mr-5">Rejected</button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={asset.image} alt="" className="w-[400px] rounded-xl py-5"/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default CustomRequestList;