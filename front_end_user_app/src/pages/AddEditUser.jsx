import { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn, MDBRadio } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";

import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  avatar: "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
  domain: "",
  available: false,
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const { first_name, last_name, email, gender, domain } = formValue;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    }
  }, [id]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    // console.log(formValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (first_name && last_name && email && domain && gender) {
      if (!editMode) {
        console.log(formValue);
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => navigate("/"), 1500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => navigate("/"), 1500);
      }
    }
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      {/* <form onSubmit={handleSubmit}> */}

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <p className="fs-2 fw-bold">
          {editMode ? "Update User Detail" : "Add User Detail"}
        </p>
        <MDBInput
          value={first_name || ""}
          name="first_name"
          type="text"
          onChange={onChange}
          required
          label="First Name"
          validation="Please provide a first_name."
          invalid
        />
        <br />
        <MDBInput
          value={last_name || ""}
          name="last_name"
          type="text"
          onChange={onChange}
          required
          label="Last Name"
          validation="Please provide a last_name."
          invalid
        />
        <br />
        <MDBInput
          value={email || ""}
          name="email"
          onChange={onChange}
          required
          label="Email"
          type="email"
          validation="Please provide an email."
          invalid
        />
        <br />
        {/* <MDBInput
          value={phone || ""}
          name="gender"
          onChange={onChange}
          required
          label="Gender"
          type=""
          validation="Please select gender"
          invalid
        /> */}

        <MDBInput
          value={domain || ""}
          name="domain"
          type="text"
          onChange={onChange}
          required
          label="Domain"
          validation="Please provide a Domain"
          invalid
        />
        <br />
        <h5>Gender</h5>
        <MDBRadio
          name="gender"
          id="male"
          label="Male"
          value={"Male" || ""}
          onChange={onChange}
        />
        <MDBRadio
          name="gender"
          id="female"
          label="Female"
          onChange={onChange}
          value={"Female" || ""}
          defaultChecked
        />

        <br />
        {/* <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onChange}
          required
          label="Address"
          validation="Please provide an address"
          invalid
        /> */}
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
      {/* </form> */}
    </MDBValidation>
  );
};

export default AddEditUser;
