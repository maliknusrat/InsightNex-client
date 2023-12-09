import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const MyAssetDownload = () => {
    const { id } = useParams();
    
    const [profile, setProfile] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetch(`https://insight-store-server.vercel.app/assetDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                setProfile(data);
            }) 
    }, [id])

    const downloadToPdf = () => {
        const ca = document.getElementById('download_section');
        setLoader(true);
        html2canvas(ca, { backgroundColor: 'white' }).then((canvas) => {
            try {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('Asset.pdf');
            setLoader(false);
            } catch (error) {
            console.error('Error creating PDF:', error);
            setLoader(false);
            }
        }).catch((error) => {
            console.error('Error during html2canvas capture:', error);
            setLoader(false);
        });
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-3 gap-5 mt-10">
                    {
                        <div className="card w-96">
                            <div id='download_section' className="card-body">
                                <h2 className="card-title">{profile.productName}</h2>
                                <p>Type: {profile.productType}</p>
                                <p>Approval Date: {profile.approvalDate}</p>
                                <p>Request Date: {profile.date}</p>
                                <p>Status: {profile.status}</p>
                                <p>Employee Name: {profile.employeeName}</p>
                                <p>Employee Email: {profile.employeeEmail}</p>
                                <p>Additional Info: {profile.additional_info}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={downloadToPdf}  disabled={!(loader===false)} className="btn btn-warning">
                                    {loader?(
                                        <span>Downloading</span>
                                        ):(
                                        <span>Download as PDF</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAssetDownload;