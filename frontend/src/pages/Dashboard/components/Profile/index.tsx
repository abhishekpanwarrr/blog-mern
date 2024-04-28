import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage"
import { app } from "../../../../firebase/firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios"
import { logout, signInSuccess } from "../../../../redux/user/userSlice"
import toast from "react-hot-toast"
import { HiLockClosed, HiLockOpen, HiMail, HiOutlineExclamationCircle, HiUser } from "react-icons/hi"

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const [imageFile, setImageFile] = useState<any>(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState<any>(null);
    const [imageFileUploadError, setImageFileUploadError] = useState<null | string>(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false)
    const [updateUserError, setUpdateUserError] = useState<any>(null);
    const [visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const filePickerRef = useRef();

    const handleImageChange = (e: { target: { files: any[] } }) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // @ts-ignore
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile?.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // @ts-ignore
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };

    const handleChange = (e: { target: { id: any; value: any } }) => {
        setUpdateUserError(null)
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true)
        setUpdateUserError(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            setLoading(false)
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            setLoading(false)
            return;
        }
        try {
            const response = await axios.put(`/api/v1/user/update/${currentUser?._id}`, formData);
            if (response.status === 200) {
                dispatch(signInSuccess(response.data))
                return toast.success("Profile updated successfully", {
                    duration: 2000,
                    position: "bottom-right"
                })
            }
            console.log("🚀 ~ handleSubmit ~ response.data:", response.data)
            console.log("🚀 ~ handleSubmit ~ response.status:", response.status)
        } catch (error: any) {
            setUpdateUserError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/v1/user/delete/${currentUser?._id}`);
            console.log("🚀 ~ handleDelete ~ response:", response)
            if (response.status === 200) {
                dispatch(logout())
                return toast.success("Account delete successfully!.", {
                    position: "bottom-right",
                    duration: 4000
                })
            }
        } catch (error) {
            return toast.error("Failed to delete account", {
                position: "bottom-right",
                duration: 2000
            });
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit} >
                {/* @ts-ignore */}
                <input ref={filePickerRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                    // @ts-ignore
                    onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            strokeWidth={5}
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    inset: 0
                                },
                                path: {
                                    stroke: `rgb(62,52,199,${imageFileUploadProgress / 100})}`
                                }
                            }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser?.profilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`} />
                </div>
                {imageFileUploadError && (
                    <Alert color="failure">
                        {imageFileUploadError}
                    </Alert>
                )}
                {
                    updateUserError && (
                        <Alert color="failure">
                            {updateUserError}
                        </Alert>
                    )
                }
                <TextInput type="text" onChange={handleChange} id="fullName" placeholder="fullName" defaultValue={currentUser?.fullName} rightIcon={HiUser} />
                <TextInput disabled readOnly type="email" onChange={handleChange} id="email" placeholder="fullName" defaultValue={currentUser?.email} rightIcon={HiMail} />
                <div className="relative">
                    <TextInput type={visible ? "text" : "password"} onChange={handleChange} id="password" placeholder="fullName" defaultValue="password" />
                    <Button onClick={() => setVisible(visible => !visible)} className="absolute top-0 right-0 outline-none bg-transparent border-0 hover:bg-transparent" color={"gray"} pill  >
                        {visible ? <HiLockClosed size={20} color="#777" /> : <HiLockOpen size={20} color="#777" />}
                    </Button>
                </div>
                <Button
                    disabled={loading || imageFileUploading}
                    gradientDuoTone={"purpleToBlue"}
                    outline
                    type="submit">
                    {loading ? <Spinner /> : 'Update'}
                </Button>
            </form>
            <div className="text-red-500 flex justify-around mt-5">
                <span className="cursor-pointer" onClick={() => setShowModal(true)}>Delete Account</span>
                <span className="cursor-pointer" onClick={() => dispatch(logout())}>Sign out</span>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDelete}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile