import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    username:Yup.string().min(2).max(25).required("Please enter your username"),
    email: Yup.string().email("Email must be a valid email").required("Please enter your email"),
    password: Yup.string().min(8,"Password must be of length 8").required("Please enter your password"),
    cpassword: Yup.string().required("Confirm password is required field").oneOf([Yup.ref('password'),null],"Password must match"),
    fname:Yup.string().min(2,"Too short").max(25).required("Please enter your username"),
    lname:Yup.string().min(2,"Too short").max(25).required("Please enter your username"),
})