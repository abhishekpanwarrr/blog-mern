import { Sidebar as Bar } from "flowbite-react"
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
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
        <Bar className="w-full md:w-56">
            <Bar.Items>
                <Bar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Bar.Item as="div" active={tab === "profile"} icon={HiUser} label="User" labelColor="dark">
                            Profile
                        </Bar.Item>
                    </Link>
                    <Bar.Item className="cursor-pointer" icon={HiArrowSmRight} labelColor="dark">
                        Sign out
                    </Bar.Item>
                </Bar.ItemGroup>
            </Bar.Items>
        </Bar>
    )
}

export default Sidebar