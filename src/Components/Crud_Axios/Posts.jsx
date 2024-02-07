import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";

const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = "https://jsonplaceholder.typicode.com";
  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/posts`);

      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formValidationSchema = yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setValues,
  } = useFormik({
    initialValues: {
      id: null,
      title: "",
      body: "",
    },

    validationSchema: formValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.id) {
        editPost(values.id, { title: values.title, body: values.body });
      } else {
        addPosts({ title: values.title, body: values.body });
      }
      resetForm();
    },
  });

  const addPosts = async (postData) => {
    try {
      const res = await axios.post(`${URL}/posts`, postData);

      setData((prevData) => [...prevData, res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const editPost = async (id, updatedData) => {
    try {
      const res = await axios.put(`${URL}/posts/${id}`, updatedData);

      setData((prevData) =>
        prevData.map((post) => (post.id === id ? res.data : post))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deletepost = async (id) => {
    try {
      await axios.delete(`${URL}/posts/${id}`);

      setData((prevData) => prevData.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="input-form">
          <TextField
            name="title"
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            label="tilte"
            variant="outlined"
            error={touched.title && errors.title}
            helperText={touched.title && errors.title ? errors.title : null}
          />
          <TextField
            size="small"
            name="body"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
            label="body"
            variant="outlined"
            error={touched.body && errors.body}
            helperText={touched.body && errors.body ? errors.body : null}
            className="input-text"
          />

          <Button type="submit" color="success" variant="contained">
            add +
          </Button>
        </form>
      </div>

      <div>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          data.map((items, index) => {
            return (
              <div key={index} className="items-display">
                <div className="posts-display">
                  <h4>id:{items.id}</h4>
                  <h2>{items.title}</h2>
                  <p>{items.body}</p>
                </div>

                <Button
                  onClick={() => deletepost(items.id)}
                  aria-label="delete"
                  color="error"
                >
                  Delete
                  <DeleteIcon />
                </Button>

                <Button
                  onClick={() => {
                    setValues({
                      id: items.id,
                      title: items.title,
                      body: items.body,
                    });
                  }}
                  aria-label="delete"
                  color="secondary"
                >
                  Edit
                  <EditIcon />
                </Button>
                <hr></hr>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
