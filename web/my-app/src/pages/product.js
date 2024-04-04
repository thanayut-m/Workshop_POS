import { useState } from "react";
import Template from "./../components/template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import Modal from "../components/modal";

function Product() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(config.api_path + "/product/insert", product, config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "บันทึกข้อมูล",
              text: "บันทึกข้อมูลสินค้าแล้ว",
              icon: "success",
              timer: 2000
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
  };
  return (
    <>
      <Template>
        <div className="card">
          <div className="card-header">
            <dir className="card-title">สินค้า</dir>
          </div>
          <div className="card-body">
            <button
              data-toggle="modal"
              data-target="#modelProduct"
              className="btn btn-primary"
            >
              <i className="fa fa-plus mr-2" />
              เพิ่มรายการ
            </button>
          </div>
        </div>
      </Template>
      <Modal id="modelProduct" title="เพิ่มรายการสินค้า" modalSize='modal-lg'>
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="mt-3 col-3">
              <label>barcode</label>
              <input
                onChange={(e) =>
                  setProduct({ ...product, barcode: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-9">
              <label>ชื่อสินค้า</label>
              <input
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-2">
              <label>ราคาจำหน่าย</label>
              <input
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-2">
              <label>ราคาทุน</label>
              <input
                onChange={(e) =>
                  setProduct({ ...product, cost: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-8">
              <label>รายละเอียด</label>
              <input
                onChange={(e) =>
                  setProduct({ ...product, detail: e.target.value })
                }
                className="form-control"
              />
            </div>
          </div>
          <div className="mt-3">
            <button onClick={handleSave} className="btn btn-primary">
              <i className="fa fa-check mr-2" />
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Product;
