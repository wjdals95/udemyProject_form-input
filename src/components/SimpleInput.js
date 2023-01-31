import { useState, useRef, useEffect } from "react";

const SimpleInput = (props) => {
  //ref를 사용하는 방법 - 한번만 유효성 검증을 할 때
  //const nameInputRef = useRef();
  //state를 사용하는 방법 - 즉각적인 유효성 검증을 위해 키 입력마다 입력 값이 필요할 때
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    // if (event.target.value.trim() !== "") {
    //   //enteredName을 쓰지 않는 이유는 이러한 상태들은 리액트에서 비동기적으로
    //   //처리되므로 즉각적으로 반영되지 않아서 다음 줄이 실행될 때에 enteredName을
    //   //사용하면 최신의 상태를 반영하지 못하고 이전의 상태를 참고하게 된다. 그러므로 event.target.value를 사용.
    //   setEnteredNameIsValid(true);
    // }
  };

  const nameInputBlurHandler = (event) => {
    //터치가 있었지만 enteredName이 공백일 경우 onBlur를 이용해 에러처리.
    setEnteredNameTouched(true);
  };
  const formSubmissionHandler = (event) => {
    //여기서는 브라우저에서 작동하는 바닐라 자바스크립트를 다루고 있는데
    //기본적으로 브라우저는 이 폼 안에 있는 버튼을 통해서 폼이 제출되면
    //웹사이트를 제공하는 서버로 HTTP 요청을 보내게 된다. 이 과정은 자동적으로 일어나며
    //브라우저가 자동적으로 웹사이트를 제공하는 서버로 HTTP요청을 보낸다.
    //이 과정에서 문제는 실제로 우리에게 요청을 처리할 서버가 없고
    //HTML과 자바스크립트만 전송하는 정적서버만 있다는 점이다.
    //따라서 이 요청이 보내지지 않도록 해야한다.
    event.preventDefault();
    //브라우저의 기본 행동인 HTTP 요청을 보내지않고 아무것도 하지 않도록 명령한다.
    //이렇게 하지 않고 HTTP 요청이 보내진다면 결국 페이지가 새로고침될텐데
    //이 경우에는 리액트 앱들이 전부 재시작되면서 모든 상태가 없어지게 되고
    //원하는 대로 작동하지 않게 되기 때문이다.

    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    //ref를 사용하여 입력값을 받는 방법
    //const enteredValue = nameInputRef.current.value;
    //ref는 항상 current 프로퍼티를 갖는 객체이다.
    //console.log(enteredValue);

    //입력값 초기화
    //nameInputRef.current.value ='';
    //=> 정상적으로 초기화하지만, 자바스크립트를 이용하여DOM을 변경하는것이므로 지양해야한다.
    setEnteredName("");
    setEnteredNameTouched(false);
    //form이 제출된 후 state를 초기화하여 에러가 뜨지 않게 한다.
  };

  //enteredNameIsValid가 참일때는 form-control클래스만주고 거짓일땐 invalid클래스를 추가하여 유효성검사할때 차이를 준다.
  const nameInputClasses = nameInputIsValid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          // ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
