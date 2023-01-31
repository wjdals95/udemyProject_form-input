import { useState, useRef } from "react";

const SimpleInput = (props) => {
  //ref를 사용하는 방법 - 한번만 유효성 검증을 할 때
  const nameInputRef = useRef();
  //state를 사용하는 방법 - 즉각적인 유효성 검증을 위해 키 입력마다 입력 값이 필요할 때
  const [enteredName, setEnteredName] = useState("");

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
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
    if(enteredName.trim() ===''){
      return
    }
    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    //ref는 항상 current 프로퍼티를 갖는 객체이다.
    console.log(enteredValue);
    
    //입력값 초기화
    //nameInputRef.current.value =''; 
    //=> 정상적으로 초기화하지만, 자바스크립트를 이용하여DOM을 변경하는것이므로 지양해야한다.
    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
