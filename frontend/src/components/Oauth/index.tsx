import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { handleError } from "../../helpers/helpers"
import { app } from "../../firebase/firebase"
import axios from "axios"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../redux/user/userSlice"
import { useNavigate } from "react-router-dom"

const Oauth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = getAuth(app)
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log("🚀 ~ handleGoogleClick ~ resultFromGoogle:", resultFromGoogle.user)
            const user = {
                fullName: `${resultFromGoogle.user?.displayName}`,
                email: `${resultFromGoogle.user?.email}`,
                photoUrl: `${resultFromGoogle.user?.photoURL}`,
                // @ts-ignore
                password: `${await resultFromGoogle.user?.accessToken}`,
            }
            const response = await axios.post("/api/v1/user/google", user);
            console.log("🚀 ~ handleGoogleClick ~ response:", response.data)
            if (response.status === 200) {
                dispatch(signInSuccess({
                    fullName: user.fullName,
                    email: user.email,
                    isAdmin: response.data.isAdmin,
                    // @ts-ignore
                    password: resultFromGoogle?.user?.accessToken,
                    profilePicture: `${resultFromGoogle.user?.photoURL}`
                }))
                navigate("/")
            }
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <Button outline type="button" gradientDuoTone={"pinkToOrange"} onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="h-6 w-6 mr-2" />
            Continue with Google
        </Button>
    )
}

export default Oauth