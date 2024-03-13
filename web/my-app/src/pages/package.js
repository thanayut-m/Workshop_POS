import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Modal from "../components/modal";

function Package() {
  const [packages, setPackages] = useState([0]);
  const [yourPackage,setYourPackage] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(config.api_path + "/package/list")
        .then((res) => {
          setPackages(res.data.results);
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const choosePackage = (item) => {
    setYourPackage(item);
  }



  return (
    <>
      <div className="container mt-2">
        <div className="h2 text-secondary">Daino : Point Of sale On cloud</div>

        <div className="h5">Package for you</div>
        <div className="row">
          {packages.map((item) => (
            <div className="col-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className=" h4 text-success">{item.name}</div>
                  <div className="h5">
                    {parseInt(item.bill_amount).toLocaleString("th-TH")}&nbsp;
                    บิล/เดือน
                  </div>
                  <div className="h5 text-secondary">
                    {parseInt(item.price).toLocaleString("th-TH")}&nbsp; บาท
                  </div>
                  <div className="mt-3">
                    <button onClick={e => choosePackage(item)}
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalRegister"
                    >
                      สมัครสมาชิก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal id="modalRegister" title="สมัครใช้บริการ">
        <form>
          <div>
            <div className="alert alert-info">{yourPackage.name} ราคา {yourPackage.price} ต่อเดือน</div>
          </div>
          <div>
            <label>ชื่อร้าน</label>
            <input className="form-control" />
          </div>
          <div className="mt-3">
            <label>เบอร์โทร</label>
            <input className="form-control" />
          </div>
          <div className="mt-3">
            <button className="btn btn-primary">ยืนยันการสมัคร
            <i className="fa fa-arrow-right" style={{marginLeft: '10px'}}></i>
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Package;
