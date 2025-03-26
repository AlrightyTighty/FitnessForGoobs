import { useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMSG, setErrorMSG] = useState("");

  const email = useRef("");
  const password = useRef("");

  const navigate = useNavigate();

  const try_logging_in = (e: React.FormEvent, setErrorMSG: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: email.current,
        password: password.current,
      })
    );
    fetch("http://localhost:3001/api/auth/", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => {
        if (response.status >= 200 && response.status <= 299)
          response.text().then((token) => {
            console.log(token);
            navigate("/account");
          });
        else {
          response.text().then((error) => {
            setErrorMSG(error);
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="login-bg-image" />
      <div className="login-panel">
        <div className="top-text">Login</div>
        <form
          onSubmit={(e) => {
            try_logging_in(e, setErrorMSG);
          }}
        >
          <input type="text" id="email" name="email" onChange={(e) => (email.current = e.target.value)} />
          <br />
          <input type="text" id="password" itemType="password" name="password" onChange={(e) => (password.current = e.target.value)} />
          <br />
          <input type="submit" value="Login" />
        </form>
        <p className="error">{errorMSG}</p>
      </div>
    </>
  );
};

export default Login;
