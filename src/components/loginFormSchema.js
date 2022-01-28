import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username Required")
    .min(2, "Username must be at least 2 characters"),
  password: yup
    .string()
    .trim()
    .required("Password Required")
    .min(2, "Password must be at least 2 characters"),
});

export default formSchema;
