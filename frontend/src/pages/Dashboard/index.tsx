import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Sidebar from "./components/Sidbar";
import Profile from "./components/Profile";

const Dashboard = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-56">
                <Sidebar />
            </div>
            {/* Profile */}
            {tab === "profile" && (
                <Profile />
            )}
        </div>
    )
}

export default Dashboard