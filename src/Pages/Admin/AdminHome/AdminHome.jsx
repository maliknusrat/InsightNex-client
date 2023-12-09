

import Footer from "../../../Shared/Footer/Footer";
import PendingRequest from "./PendingRequest/PendingRequest";
import PieCharts from "./Pie Chart/PieCharts";
import PackageCard from './../../Home/PackageCard/PackageCard';
import LimitedStock from './LimitedStock';
import TopMostItem from './TopMostItem';


const AdminHome = () => {
    return (
        <div>

            <PendingRequest></PendingRequest>
            <PackageCard></PackageCard>
            <p className="text-center text-4xl font-bold mt-10">Limited Stock</p>
            <LimitedStock></LimitedStock>
            <p className="text-center text-4xl font-bold mt-10">Top Most Items</p>
            <TopMostItem></TopMostItem>
            <PieCharts></PieCharts>
            <Footer></Footer>
            
        </div>
    );
};

export default AdminHome;