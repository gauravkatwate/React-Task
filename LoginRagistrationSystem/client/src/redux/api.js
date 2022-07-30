import axios from "axios";

const API = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://authenticationprocess.herokuapp.com",
});

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);
