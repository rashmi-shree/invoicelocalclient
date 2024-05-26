import React, { useEffect, useState } from "react";
import TextAndTextInput from "../../components/molecules/TextAndTextInput/TextAndTextInput";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import '../../style/style.css';

const LoginPage = ({ 
  api
  // userevent
 }) => {
  let navigate = useNavigate();
  const [logindata, setlogindata] = useState();
  const [logindataalter, setlogindataalter] = useState({
    username:"",
    password:""
  });
  useEffect(()=>{
    if(logindata){
      // logindataalter is updated by encoding the corresponding values from logindata using a function called base64_encode.
      setlogindataalter({...logindataalter, "username":base64_encode(logindata.username), "password":base64_encode(logindata.password)})
    }
  },[logindata])
  const onChangeEvent = (event) => {
    setlogindata({ ...logindata, [event.target.name]: event.target.value });
  }
  const onSubmitLogin = (event) => {
    event.preventDefault();
    api.post('/users/login', {
      params: {
        logindataalter
      }
    }
    )
      .then((res) => {
        if (res.data.length > 0) {
          // console.log("ho", res.data);
          // console.log("hoho",base64_decode(res.data));
          window.localStorage.setItem('logoutbtn', "true");
          window.localStorage.setItem('adminloggedin', res.data);
          // api.get(`/employees/profile/${res.data[0].id}`, {})
          //   .then((res) => {
          //     userevent(res.data);
          //   })
          navigate('/main');
        }
        else{
          alert(res.data.message);
        }
      })
      // .catch((error)=>{
      //   console.log("err", error.response.data.message);
      // })
  }
  return (
    <div>
      <div>
        <Header
        />
      </div>
      <div className="loginPageContainer">
      <form onSubmit={onSubmitLogin} className="inputandsubmitdesign">
      <div className="inputstyle">
        <p>USER NAME:-<input
          type="text"
          name="username"
          onChange={onChangeEvent}
          autoComplete="off"
        /></p>
        </div>
        <div className="inputstyle">
        <p>PASSWORD:-<input
          type="password"
          name="password"
          onChange={onChangeEvent}
          autoComplete="off"
        />
        </p>
        </div>
        <div className="btnstyle BtnContainerstyle">
          <button type="submit" id="btn">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}
export default LoginPage;