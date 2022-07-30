import React, { useEffect, useState } from "react";
import cogotoast from "cogo-toast";
import "./Login.css";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidationItem,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && cogotoast.error(error);
  }, [error]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div className="page">
      <div className="banner">
        <MDBCard alignment="center" className="shadow-lg">
          <MDBIcon fas icon="user-circle" className="fa-2x mt-4" />
          <h5>Sign In</h5>
          <MDBCardBody className="my-2">
            <MDBValidation
              onSubmit={handelSubmit}
              noValidate
              className="row g-3"
            >
              <MDBValidationItem
                feedback="Please Provide Your Email"
                invalid
                className="col-md-12"
              >
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please Provide Your Password"
                invalid
                className="col-md-12"
              >
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <div className="col-md-12">
                <MDBBtn style={{ width: "100%" }} className="button mt-2">
                  {loading && (
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                  )}
                  LOGIN
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/ragister">
              <p>Don't Have An Account ? Sign Up</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Login;
