import img1 from "../../../assets/package/annie-spratt-hCb3lIB8L8E-unsplash.jpg"
import img2 from "../../../assets/package/brooke-cagle--uHVRvDr7pg-unsplash.jpg"
import img3 from "../../../assets/package/jud-mackrill-Of_m3hMsoAA-unsplash.jpg"

const PackageCard = () => {
    return (
        <div className="mb-10">
           <div>
            <h2 className="text-5xl text-center font-black font-serif mb-24 ">Package Selection</h2>
           </div>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="card rounded-none w-96 bg-base-300 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-red-900 underline pb-1">Add Your Package</h2>
                        <p> 5 Members for <span className="font-bold"> $5</span> </p>
                    </div>
                    <figure><img src={img1} alt="Shoes" /></figure>
                </div>
                <div className="card rounded-none w-96 bg-base-300 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title  text-red-900 underline pb-1">Add Your Package</h2>
                        <p>10 Members for $8</p>
                    </div>
                    <figure><img src={img2} alt="Shoes" /></figure>
                </div>
                <div className="card rounded-none w-96 bg-base-300 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title  text-red-900 underline pb-1">Add Your Package</h2>
                        <p>20 Members for $15</p>
                    </div>
                    <figure><img src={img3} alt="Shoes" /></figure>
                </div>

            </div>
        </div>
    );
};

export default PackageCard;