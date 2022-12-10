import * as Yup from 'yup'

export const logInSchema = Yup.object({
    email: Yup.string().email("Email must be a valid email").required("Please enter your email"),
    password: Yup.string().min(8,"Password must be of length 8").required("Please enter your password"),
})