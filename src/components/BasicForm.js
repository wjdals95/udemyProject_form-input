import { useState } from "react";

const BasicForm = (props) => {
  const [enteredFirstName, setEntererFirstName] = useState("");
  const [firstNameIsTouched, setFirstNameIsTouched] = useState(false);
  const [enteredLastName, setEntererLastName] = useState("");
  const [lastNameIsTouched, setLastNameIsTouched] = useState(false);
  const [enteredEmail, setEntererEmail] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const firstNameInputChangeHandler = (event) => {
    setEntererFirstName(event.target.value);
  };
  const lastNameInputChangeHandler = (event) => {
    setEntererLastName(event.target.value);
  };
  const emailInputChangeHandler = (event) => {
    setEntererEmail(event.target.value);
  };

  //button에게 위의 Input칸에 공백이 있을 경우 disabled시키기
  let formIsValid = false;
  if (enteredFirstName && enteredLastName && enteredEmail) {
    formIsValid = true;
  }
  //인풋에 들어왔다가 나가면 true로 변경하여 빈공백으로 나가면 에러가 뜨게하기
  const firstNameInputBlurHandler = (event) => {
    setFirstNameIsTouched(true);
  };
  const lastNameInputBlurHandler = (event) => {
    setLastNameIsTouched(true);
  };
  const emailInputBlurHandler = (event) => {
    setEmailIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setFirstNameIsTouched(true);
    setLastNameIsTouched(true);
    setEmailIsTouched(true);

    if (!enteredFirstName) {
      return;
    }
    if (!enteredLastName) {
      return;
    }
    if(!enteredEmail){
      return;
    }

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredEmail);

    setEntererFirstName("");
    setFirstNameIsTouched(false);
    setEntererLastName("");
    setLastNameIsTouched(false);
    setEntererEmail("");
    setEmailIsTouched(false);
  };

  const enteredFirstNameIsValid = enteredFirstName.trim() !== "";
  const firstNameInputIsInValid =
    !enteredFirstNameIsValid && firstNameIsTouched;

  const enteredLastNameIsValid = enteredLastName.trim() !== "";
  const lastNameInputIsInValid = !enteredLastNameIsValid && lastNameIsTouched;

  const enteredEamilIsValid = enteredEmail.trim() !== "";
  const emailInputIsInValid = !enteredEamilIsValid && emailIsTouched;

  const firstNameInputClasses = firstNameInputIsInValid
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClasses = lastNameInputIsInValid
    ? "form-control invalid"
    : "form-control";
    const emailInputClasses = emailInputIsInValid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={firstNameInputChangeHandler}
            onBlur={firstNameInputBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputIsInValid && (
            <p className="error-text">First Name must not be empty.</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={lastNameInputChangeHandler}
            onBlur={lastNameInputBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputIsInValid && (
            <p className="error-text">Last Name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInValid && (
          <p className="error-text">Please enter a valid email.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
