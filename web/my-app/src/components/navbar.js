import Swal from "sweetalert2";
import config from "../config";
import { useNavigate } from "react-router-dom";
import Modal from "./modal";
import { useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [memberName, setMemberName] = useState();

  const handleSignOut = () => {
    Swal.fire({
      title: "sign out",
      text: "ยืนยันการออกจากระบบ",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem(config.token_name);
        navigate("/login");
      }
    });
  };

  const handleEditProfile = async () => {
    try {
      await axios
        .get(config.api_path + "/member/info", config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            setMemberName(res.data.result.name);
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleChangeProfile = async () => {
    try {
      const url = config.api_path + "/member/changeProfile";
      const payload = { memberName: memberName };
      await axios
        .put(url, payload, config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "เปลี่ยนข้อมูล",
              text: "เปลี่ยนแปลงข้อมูลของคุณแล้ว",
              icon: "success",
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  }

    return (
      <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className="fas fa-bars"></i>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                onClick={handleEditProfile}
                data-toggle="modal"
                data-target="#modalEditProfile"
                className="btn btn-info mr-2"
              >
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

        <Modal id="modalEditProfile" title="แก้ไขข้อมูลร้านของฉัน">
          <div>
            <label>ชื่อร้าน</label>
            <input
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mt-3">
            <button onClick={handleChangeProfile} className="btn btn-primary">
              <i className="fa fa-check mr-2"></i>
              Save
            </button>
          </div>
        </Modal>
      </>
    );
  };

export default Navbar;
