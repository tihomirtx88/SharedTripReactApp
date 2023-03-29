import * as Yup from 'yup';

export const validateTripSchema =  Yup.object().shape({
    start: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
    end: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
    carImg: Yup.string().required("Required!"),
    carBrand: Yup.string().min(4, "Too Short!").max(10, "Too Long!").required("Required!"),
    price: Yup.number().min(1, "Too Short!").max(51, "Too Long!").required("Required!"),
    seats: Yup.number().min(0, "Too Short!").max(5, "Too Long!").required("Required!"),
    description: Yup.string().min(6, "Too Short!").max(50, "Too Long!").required("Required!"),
});