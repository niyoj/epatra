import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";

const ChangePassword = () => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        if (localStorage.getItem("isLoggedIn") != "true") {
            router.push("./login");
        }
    }

    const validate = values => {
        const errors = {};

        if (!values.password) {
            errors.password = "You cannot leave this empty";
        } else if (values.password.length < 8) {
            errors.password = "Password must be greater than 8 characters"
        }

        if (!values.currpassword) {
            errors.currpassword = "You cannot leave this empty";
        }

        if (!values.cpassword) {
            errors.cpassword = "You cannot leave this empty";
        } else if (values.cpassword != values.password) {
            errors.password = "Password must match";
            errors.cpassword = "Password must match";
        }

        return errors;
    }

    const bearer = (typeof window !== 'undefined')? localStorage.getItem("accessToken"): null;

    const handleFormSubmit = async(values) => {
        try {
            await axios.post("http://localhost:8000/api/v1/auth/change-password/", 
                {
                    current_password: values.currpassword,
                    new_password: values.password,
                    confirm_password: values.cpassword,
                },
                {
                    headers: {
                        "Content-type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                },
            ).then((response) => {
                console.log(response);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            cpassword:'',
            currpassword: '',
        },
        validate,
        onSubmit: values => {
            handleFormSubmit(values);
        },
    });

    return (
        <section className="inline-flex flex-col bg-background absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-8 rounded-md border border-outline shadow-xl">
            <h1 className="font-bold text-3xl text-center text-primary mb-4">Change Password</h1>

            <form method="post" className="inline-flex flex-col items-center" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className={`block font-extrabold mb-2`}>Current Password</label>
                    <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 border-primary`} type='password' name='currpassword' placeholder='Enter your current password' value={formik.values.currpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <p className="block text-sm text-error text-right mt-1">&nbsp;{formik.touched.currpassword && formik.errors.currpassword ? formik.errors.currpassword: null }</p>
                </div>

                <div className="mb-4">
                    <label className={`block font-extrabold mb-2`}>Password</label>
                    <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 border-primary`} type='password' name='password' placeholder='Enter your new password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <p className="block text-sm text-error text-right mt-1">&nbsp;{formik.touched.password && formik.errors.password ? formik.errors.password: null }</p>
                </div>

                <div className="">
                    <label className={`block font-extrabold mb-2`}>Confirm Password</label>
                    <input className={`block bg-background w-80 border-0 border-b-2 focus:outline-0 border-primary`} type='password' name='cpassword' placeholder='Re-Enter your new password' value={formik.values.cpassword} onChange={formik.handleChange} />
                    <p className="block text-sm text-error text-right mt-1">&nbsp;{formik.touched.cpassword && formik.errors.cpassword ? formik.errors.cpassword: null }</p>
                </div>

                <button type="submit" className="bg-primary text-onprimary px-8 py-2 rounded mt-8 disabled:bg-tertiary disabled:cursor-not-allowed" disabled={(!formik.touched.password && !formik.touched.cpassword) || (formik.touched.password && formik.errors.password) || (formik.touched.cpassword && formik.errors.cpassword) ? true : false}>Change Password</button>
            </form>
        </section>
    );
}

export default ChangePassword;