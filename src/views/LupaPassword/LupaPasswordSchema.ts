import * as Yup from 'yup'

export const initialValues = {
  email: '',
}

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email belum diisi")
})