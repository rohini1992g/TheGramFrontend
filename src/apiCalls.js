import Axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({
    type: "LOGIN_START",
  });

  Axios.defaults.withCredentials = true;
  try {
    const res = await Axios.post(
      "http://localhost:8000/api/auth/login",
      userCredentials,
      {
        withCredentials: true, // Include credentials (e.g., cookies, HTTP auth)
      }
    );

    const result = JSON.stringify(res.data);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
