import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

const Forms = () => {
  const URL = "https://jsonplaceholder.typicode.com/users";
  const [user, setUser] = useState([]);
  const FetchData = async () => {
    try {
      const res = await axios.get(URL);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  // let EMAIL_REGX =
  //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const FormValidationSchema = yup.object({
    name: yup.string().required("Name is required").min(5).max(15),
    username: yup.string().required("Username is required").min(8).max(13),
    email: yup.string().email("Invalid email").required("Email is required"),
    // .matches(EMAIL_REGX),
    address: yup.object({
      zipcode: yup
        .string()
        .required("Zipcode is required")
        .matches(/^[0-9-]*$/)
        .min(8)
        .max(10),
    }),
  });

  const { handleSubmit, handleBlur, handleChange, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        address: {
          zipcode: "",
        },
      },
      validationSchema: FormValidationSchema,
      onSubmit: (newuser, { resetForm }) => {
        addNewUser(newuser);
        resetForm();
      },
    });

  const addNewUser = async (newuser) => {
    try {
      const newUser = await axios.post(URL, newuser);
      setUser((prevData) => [...prevData, newUser.data]);
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return (
    <div>
      <h1 className="form-heading">From Validation</h1>
      <form onSubmit={handleSubmit} className="form-validation">
        <TextField
          name="name"
          label="name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          error={touched.name && errors.name}
          helperText={touched.name && errors.name ? errors.name : null}
        ></TextField>
        <TextField
          name="username"
          label="username"
          variant="outlined"
          size="small"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={touched.username && errors.username}
          helperText={
            touched.username && errors.username ? errors.username : null
          }
        ></TextField>
        <TextField
          name="email"
          label="email"
          variant="outlined"
          size="small"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && errors.email}
          helperText={touched.email && errors.email ? errors.email : null}
        ></TextField>
        <TextField
          name="address.zipcode"
          label="zipcode"
          variant="outlined"
          size="small"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address.zipcode}
          error={touched.address?.zipcode && errors.address?.zipcode}
          helperText={
            touched.address?.zipcode && errors.address?.zipcode
              ? errors.address?.zipcode
              : null
          }
        ></TextField>

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>

      <div>
        {user.map((user, index) => {
          return (
            <div key={index}>
              <div className="user-display">
                <h2>{user.name}</h2>
                <h3>{user.username}</h3>
                <h4>{user.email}</h4>
                <h5>{user.address.zipcode}</h5>
                <hr></hr>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forms;
