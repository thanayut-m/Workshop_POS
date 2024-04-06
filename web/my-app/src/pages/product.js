import { useEffect, useState } from "react";
import Template from "./../components/template";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import Modal from "../components/modal";

function Product() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productImage,setProductImage] = useState({});
  const [productImages,setProductImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(config.api_path + "/product/list", config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            setProducts(res.data.results);
          }
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const clearForm = () => {
    setProduct({
      name: "",
      detail: "",
      cost: "",
      price: "",
      barcode: "",
    });
  };

  const handleClose = () => {
    const btns = document.getElementsByClassName("btnClose");
    for (let i = 0; i < btns.length; i++) {
      btns[i].click();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let url = config.api_path + "/product/insert";
      if (product.id !== undefined) {
        url = config.api_path + "/product/update";
      }

      await axios
        .post(url, product, config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "บันทึกข้อมูล",
              text: "บันทึกข้อมูลสินค้าแล้ว",
              icon: "success",
              timer: 2000,
            });

            fetchData();
            clearForm();
            handleClose();
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

  const handleDelete = (item) => {
    Swal.fire({
      title: "ลบข้อมูล",
      text: "ยืนยันการลบข้อมูลออกจากระบบ",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios
            .delete(
              config.api_path + "/product/delete/" + item.id,
              config.headers()
            )
            .then((res) => {
              if (res.data.message === "success") {
                Swal.fire({
                  title: "ลบข้อมูล",
                  text: "ลบข้อมูลสำเร็จ",
                  icon: "success",
                  timer: 2000,
                });
                fetchData();
              }
            });
        } catch (e) {
          Swal.fire({
            title: "error",
            text: e.message,
            icon: "error",
          });
        }
      }
    });
  };

  const handleChangeFile = (files) => {
    setProductImage(files[0]);
  }

  const handleUpload = async () => {
    try {

    } catch (e) {

    }
  }

  return (
    <>
      <Template>
        <div className="card">
          <div className="card-header">
            <dir className="card-title">สินค้า</dir>
          </div>
          <div className="card-body">
            <button
              onClick={clearForm}
              data-toggle="modal"
              data-target="#modelProduct"
              className="btn btn-primary"
            >
              <i className="fa fa-plus mr-2" />
              เพิ่มรายการ
            </button>

            <table className="mt-3 table table-bordered table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>barcode</th>
                  <th>ชื่อสินค้า</th>
                  <th className="text-right">ราคาจำหน่าย</th>
                  <th className="text-right">ราคาทุน</th>
                  <th>รายละเอียด</th>
                  <th width="170px"></th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0
                  ? products.map((item) => (
                      <tr>
                        <td>{item.barcode}</td>
                        <td>{item.name}</td>
                        <td className="text-right">
                          {parseInt(item.cost).toLocaleString("th-TH")}
                        </td>
                        <td className="text-right">
                          {parseInt(item.price).toLocaleString("th-TH")}
                        </td>
                        <td>{item.detail}</td>
                        <td className="text-center">
                          <button
                            onClick={(e) => setProduct(item)}
                            className="btn btn-primary mr-2"
                            data-toggle="modal"
                            data-target="#modalProductImage"
                          >
                            <i className="fa fa-image"></i>
                          </button>
                          <button
                            onClick={(e) => setProduct(item)}
                            data-toggle="modal"
                            data-target="#modelProduct"
                            className="btn btn-info mr-2"
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(item)}
                            className="btn btn-danger"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </Template>
      <Modal id="modelProduct" title="เพิ่มรายการสินค้า" modalSize="modal-lg">
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="mt-3 col-sm-3 ">
              <label>barcode</label>
              <input
                value={product.barcode}
                onChange={(e) =>
                  setProduct({ ...product, barcode: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-sm-9">
              <label>ชื่อสินค้า</label>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-sm-2">
              <label>ราคาจำหน่าย</label>
              <input
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-sm-2">
              <label>ราคาทุน</label>
              <input
                value={product.cost}
                onChange={(e) =>
                  setProduct({ ...product, cost: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mt-3 col-sm-8">
              <label>รายละเอียด</label>
              <input
                value={product.detail}
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

      <Modal id="modalProductImage" title="ภาพสินค้า" modalSize="modal-lg">
        <div className="row">
          <div className="col-4">
            <div>Barcode</div>
            <input value={product.barcode} disabled className="form-control" />
          </div>
          <div className="col-8">
            <div>ชื่อสินค้า</div>
            <input value={product.name} disabled className="form-control" />
          </div>
          <div className="col-12 mt-3">
            <div>รายละเอียด</div>
            <input value={product.detail} disabled className="form-control" />
          </div>
          <div className="col-12">
            <div>เลือกภาพสินค้า</div>
            <input onChange={e => handleChangeFile(e.target.files)} type="file" name="imageName" className="form-control" />
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-primary">
            <i className="fa fa-check mr-2"></i>
            Upload And Save
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Product;
