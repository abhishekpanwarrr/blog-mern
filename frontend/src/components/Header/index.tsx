import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { RootState } from "../../redux/store"
import { toggleTheme } from "../../redux/theme/themeSlice"
import { logout } from "../../redux/user/userSlice"

const Header = () => {
    const path = useLocation().pathname;
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const theme = useSelector((state: RootState) => state.theme.theme)
    const dispatch = useDispatch();
    const handleLogout = () => dispatch(logout());
    return (
        <Navbar>
            <Link to={"/"} className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Abhishek's</span>
                Blog
            </Link>
            <form>
                <TextInput type="text" placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button className="w-10 h-10 lg:hidden" color={"gray"} pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="hidden sm:inline" color={"gray"} onClick={() => dispatch(toggleTheme())}>
                    {theme === "dark" ? <FaSun size={20} color={theme === "dark" && "white"} /> : <FaMoon size={20} color={theme === "light" && "black"} />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        inline
                        arrowIcon={false}
                        label={
                            <Avatar
                                alt="User"
                                img={currentUser?.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="font-sm block">{currentUser?.fullName}</span>
                            <span className="font-medium block truncate">{currentUser?.email}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to={"/sign-in"}>
                        <Button className="" outline gradientDuoTone={"purpleToBlue"} pill>
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to={"/"}>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to={"/about"}>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to={"/projects"}>
                        Products
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header