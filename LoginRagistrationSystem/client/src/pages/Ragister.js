import React, { useEffect, useState } from "react";
import cogotoast from "cogo-toast";
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
  MDBBadge,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ragister } from "../redux/features/authSlice";
import PasswordStrengthBar from "react-password-strength-bar";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Ragister = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [hideShow, setHideShow] = useState(false);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && cogotoast.error(error);
  }, [error]);

  const handelSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return cogotoast.error("Password should match");
    }

    if (email && password && confirmPassword && firstName && lastName) {
      dispatch(ragister({ formValue, navigate }));
    } else {
      return cogotoast.error("Provide All Detailes");
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const showbar = () => {
    setHideShow(true);
  };
  const hidebar = () => {
    setHideShow(false);
  };

  return (
    <div className="page">
      {" "}
      <div className="banner">
        <MDBCard alignment="center">
          <MDBIcon fas icon="user-circle" className="fa-2x mt-4" />
          <h5>Sign Up</h5>
          <MDBCardBody>
            <MDBValidation
              onSubmit={handelSubmit}
              noValidate
              className="row g-3"
            >
              <MDBValidationItem
                feedback="Please Provide First Name"
                invalid
                className="col-md-6"
              >
                <MDBInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  onFocus={hidebar}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please Provide Last Name"
                invalid
                className="col-md-6"
              >
                <MDBInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  onFocus={hidebar}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please Provide Email"
                invalid
                className="col-md-12"
              >
                <MDBInput
                  label="Email"
                  type="email"
                  name="email"
                  onFocus={hidebar}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem
                feedback="Please Provide Password"
                invalid
                className="col-md-12"
              >
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  onFocus={showbar}
                  onChange={onInputChange}
                  required
                />
                {hideShow === false ? (
                  ""
                ) : (
                  <PasswordStrengthBar password={password} />
                )}
              </MDBValidationItem>

              <MDBValidationItem
                feedback="Please Provide Confirm Password"
                invalid
                className="col-md-12"
              >
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onFocus={hidebar}
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
                  Ragister
                </MDBBtn>
              </div>
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <Link to="/">
              <p>Already Have An Account ? Sign In</p>
            </Link>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </div>
  );
};

export default Ragister;
