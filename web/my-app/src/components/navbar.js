import Swal from "sweetalert2";
import config from "../config";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    Swal.fire({
      title: 'sign out',
      text: 'ยืนยันการออกจากระบบ',
      icon: 'question',
      showCancelButton : true,
      showConfirmButton : true
    }).then(res => {
      if (res.isConfirmed){
        localStorage.removeItem(config.token_name)
        navigate('/login');
      }
    })
  }

  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="btn btn-info mr-2">
              <i className="fa fa-user mr-2"></i>
              Profile
            </button>
            <button onClick={handleSignOut} className="btn btn-danger">
              <i className="fa fa-user mr-2"></i>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
