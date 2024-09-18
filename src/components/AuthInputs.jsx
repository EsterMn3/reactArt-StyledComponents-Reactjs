import { useState } from "react";
import { styled } from "styled-components";

import Button from "./Button.jsx";
import Input from "./Input.jsx";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);

    // Check if the inputs are valid
    if (enteredEmail.includes("@") && enteredPassword.trim().length >= 6) {
      // Show success message and clear fields
      setSuccessMessage("Login successful!");
      setEnteredEmail("");
      setEnteredPassword("");

      // Reset the submitted state to hide validation messages
      setSubmitted(false);
    } else {
      // Clear the success message if the input is invalid
      setSuccessMessage("");
    }
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          value={enteredEmail} // Bind the value to the state
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        <Input
          invalid={passwordNotValid}
          label="Password"
          type="password"
          value={enteredPassword} // Bind the value to the state
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
