import {useRouter} from "next/router";
import { useState } from "react";
import axios from "axios";

const Verification = () => {
    const router = useRouter();
    const [key, setKey] = useState({token: ""});
    const str = "Thank you for regsitering your account. We will be sending you a verification email shortly.";

    const [success, setSuccess] = useState(false);
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("isLoggedIn") == "true") {
            router.push("./");
        }
    }

    const handleBtn = async() => {
        try {
            setKey(router.query.token);
            const res = await axios.post(`http://localhost:8000/api/v1/auth/verify-account/`, {key}).then(res => {
                setSuccess(true);
                setStr("Thank you you have been verified.");
                router.push("./login");
            })
        } catch(error) {
            console.log(error);
        }
    }
    
    return (
        <section className="inline-flex justify-center text-center w-[400px] bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline shadow-xl">
            <p className={`${router.query.token == undefined || success ? "block": "hidden"}`}>{str}</p>
            <button className={`capitalize bg-primary text-onprimary px-4 py-2 rounded ${router.query.token == undefined ? "hidden": "block"}`} onClick={handleBtn}>validate</button>
        </section>
    );
}

export default Verification;