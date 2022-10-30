import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RegisterForm(props) {
  const [stateReg, setStateReg] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const checkEqualPass = (e) => {
    e.preventDefault();
    if (stateReg.password1 !== stateReg.password2) {
      alert("Your passwords do not match.");
      return;
    } else {
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStateReg((prevStateReg) => ({
      ...prevStateReg,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(stateReg),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      props.setAuth(true);
    }
  };

  return (
    <div className="register-form">
      <Form onSubmit={checkEqualPass}>
        <h1 className="login-title">Register</h1>
        <Form.Group className="mb-3" controlId="usernameReg">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="input"
            type="text"
            placeholder="Enter username"
            value={stateReg.username}
            onChange={handleInput}
            required
            name="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="emailReg">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            className="input"
            type="email"
            placeholder="Enter email"
            value={stateReg.email}
            onChange={handleInput}
            required
            name="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password"
            value={stateReg.password1}
            onChange={handleInput}
            required
            name="password1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password2">
          <Form.Control
            className="input"
            type="password"
            placeholder="Enter password again"
            value={stateReg.password2}
            onChange={handleInput}
            required
            name="password2"
          />
        </Form.Group>
        <Button className="submit" variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterForm;