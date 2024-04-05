import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import config from '../config';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [memberName, setMemberName] = useState ();
  const [packageName, setPackageName] = useState ();

   useEffect(() =>{
    fetchData();
   }, [])
   
   const fetchData = async () => {
    try {
      axios.get(config.api_path + '/member/info' ,config.headers()).then(res =>{
        if (res.data.message === 'success'){
          setMemberName(res.data.result.name);
          setPackageName(res.data.result.package.name);
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
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8'}}
          />
          <span className="brand-text font-weight-light">POS on Cloud</span>
        </a>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info text-white">
              <div>{memberName}</div>
              <div>Package:{packageName}</div>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>
                    สินค้า
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
