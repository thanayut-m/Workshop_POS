import { useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [phone,setPhone] = useState();
  const [password,setPassword] = useState();

  const navigate = useNavigate();

  const handleSignIn = async () =>{
    try {
      const payload = {
        phone: phone,
        password: password,
      }
        await axios.post(config.api_path + '/member/signin',payload).then(res => {
          if (res.data.message === 'success'){
            Swal.fire({
              title: 'Sign In',
              text: 'เข้าสู่ระบบแล้ว',
              icon: 'success',
              timer: 2000
            })

            localStorage.setItem(config.token_name, res.data.token);
            navigate('/home');

          } else {
            Swal.fire( {
              title: 'Sign In',
              text: 'ไม่พบข้อมูลในระบบ',
              icon: 'warning',
              timer: 2000
            })
          }
        }).catch(err => {
          throw err.response.data;
        })
    } catch (e) {
      Swal.fire({
        title: 'error',
        text: e.message,
        icon: 'error'
      })
    }
  }

  return (
    <>
      <div className="card container mt-5">
        <div className="card-header">
          <div className="card-title">
            <div className="text-center h3 mt-5">Login To POS</div>
          </div>
        </div>
        <div className="card-body">
          <div className="mt-3">
            <label>Phone</label>
            <input onChange={e => setPhone(e.target.value)} className="form-control" />
          </div>

          <div className="mt-3">
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
          </div>
          <div className="mt-3">
            <button onClick={handleSignIn} className="btn btn-primary">
              <i className="fa fa-check" style={{ marginRight: "10px" }}></i>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
