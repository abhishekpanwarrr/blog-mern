import toast from "react-hot-toast";
const errorCodes = [500, 409, 400]

const handleError = (error: any) => {

    if (error.message.includes("Network Error")) {
        return toast.error("Network Error", {
            position: "bottom-right"
        });
    }
    if (error.response) {
        if (errorCodes.includes(error.response.status)) {
            return toast.error(`${error.response.data.msg}`, {
                position: "bottom-right"
            });
        }
    } else {
        return toast.error("Unknown Error", {
            position: "bottom-right"
        });
    }
}
export {
    handleError
}