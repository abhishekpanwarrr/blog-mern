import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

const SignUp = () => {
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* Left side */}
                <div className="flex-1">
                    <Link to={"/"} className="text-4xl font-bold dark:text-white">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Abhishek's</span>Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project you can signup with your email and password of with google
                    </p>
                </div>
                {/* Right side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4">
                        <div>
                            <Label value="Your fullname" />
                            <TextInput type="text" placeholder="rakesh kumar" id="fullName" />
                        </div>
                        <div>
                            <Label value="Your email" />
                            <TextInput type="email" placeholder="name@company.com" id="email" />
                        </div>
                        <div>
                            <Label value="Your password" />
                            <TextInput type="password" placeholder="strong@password" id="password" />
                        </div>
                        <Button gradientDuoTone={"purpleToPink"} type="submit">
                            Sign up
                        </Button>
                        <div className="flex gap-2 text-sm mt-3">
                            <span>Have an account?</span>
                            <Link to={"/sign-in"} className="text-blue-500">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp