import { Button, Label, TextInput } from "flowbite-react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { handleError } from "../../helpers/helpers";
import { FormDataSignin, UserSchemaSignin } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import Oauth from "../../components/Oauth";
import { RootState } from "../../redux/store";

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataSignin>({
        resolver: zodResolver(UserSchemaSignin),
    });
    const onSubmit = async (data: FormDataSignin) => {
        try {
            setLoading(true)
            const { status, data: response } = await axios.post("/api/v1/auth/signin", data)
            const user = { ...response.user, token: response.token };
            if (status === 200) {
                dispatch(signInSuccess(user))
                navigate("/")
                return toast.success("🚀 Logged in successfully!", {
                    duration: 2000,
                    position: "bottom-right"
                })
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                return toast.error("❌ User not found. Register first.", {
                    duration: 3000,
                    position: "bottom-right"
                })
            }
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [])
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* Left side */}
                <div className="flex-1">
                    <Link to={"/"} className="text-4xl font-bold dark:text-white">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Abhishek's</span>Blog
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project you can signin with your email and password or with google
                    </p>
                </div>
                {/* Right side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label value="Your email" />
                            <TextInput type="email" placeholder="name@company.com" id="email" {...register("email")} />
                            <span className="text-red-500">{errors?.email?.message}</span>
                        </div>
                        <div>
                            <Label value="Your password" />
                            <TextInput type="password" placeholder="strong@password" id="password" {...register("password")} />
                            <span className="text-red-500">{errors.password?.message}</span>
                        </div>
                        <Button gradientDuoTone={"purpleToPink"} type="submit">
                            {loading ? <Spinner color="info" size="md" /> : "Sign In"}
                        </Button>
                        <Oauth />
                        <div className="flex gap-2 text-sm mt-3">
                            <span>Already have an account?</span>
                            <Link to={"/sign-up"} className="text-blue-500">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn