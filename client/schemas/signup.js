import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    username:Yup.string().min(2, "Username must be of 2 characters").max(25, "Username cannot be more than 25 characters").required("Please enter your username"),
    email: Yup.string().email("Email must be a valid email").required("Please enter your email"),
    password: Yup.string().min(8,"Password must be of 8 characters").required("Please enter your password"),
    cpassword: Yup.string().required("Please re-enter your password").oneOf([Yup.ref('password'),null],"Password must match"),
    fname:Yup.string().min(2,"Too short").max(25).required("Please enter your username"),
    lname:Yup.string().min(2,"Too short").max(25).required("Please enter your username"),
})