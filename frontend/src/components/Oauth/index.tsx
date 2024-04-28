import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { handleError } from "../../helpers/helpers"
import { app } from "../../firebase/firebase"
import axios from "axios"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../redux/user/userSlice"

const Oauth = () => {
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
            console.log("🚀 ~ handleGoogleClick ~ user:", user)
            const response = await axios.post("/api/v1/user/google", user);
            if (response.status === 201) {
                dispatch(signInSuccess({
                    fullName: user.fullName,
                    email: user.email,
                    // @ts-ignore
                    token: resultFromGoogle?.user?.accessToken,
                    profilePicture: `${resultFromGoogle.user?.photoURL}`
                }))
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