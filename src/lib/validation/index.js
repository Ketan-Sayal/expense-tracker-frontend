import * as yup from "yup"

export const SignupSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).required(),
    password:yup.string().min(4).required()
  })
  .required();

export const LoginSchema = yup
  .object({
    email: yup.string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).required(),
    password:yup.string().min(4).required()
  })
  .required();

export const ContactSchema = yup
  .object({
    name:yup.string().min(1).required(),
    email: yup.string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).min(1).required(),
    message:yup.string().min(1).required()
  })
  .required();

export const UpdateUserSchema = yup
  .object({
    username:yup.string().min(1).required(),
    email: yup.string().email().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).min(1).required(),
    newPassword:yup.string().min(1, {message:"New password shouldn't be empty"}).required({message:"New password shouldn't be empty"})
  }).required()