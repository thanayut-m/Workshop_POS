import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import "../globals.css";

function Package() {
  const [Package, setPackage] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(config.api_path + "/package/list")
        .then((res) => {
          setPackage(res.data.results);
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="text-center ">
        <div>
          <p className="text-stone-500 font-bold text-[40px]">
            DainoPos : Point Of Sale On Clound
          </p>
        </div>
        <div className="mt-3 text-lg text-[20px] font-bold">Package for You</div>

        <div className=" mt-5 w-full flex flex-row items-center pb-10 md:px-10 lg:px-0 md:flex-row md:gap-5  justify-center ">
          {Package.map((item, Index) => (
            <div key={Index} className="w-max bg-white ring-2 ring-yellow-500 md:w-60 lg:w-max  rounded-xl md:p-2 lg:p-5 p-5 drop-shadow-md">
              <div class="w-full flex flex-col justify-center items-center text-[18px] font-bold">
                {item.name} 
              </div>
              <div className="mt-3 w-full flex flex-col justify-center items-center">
                {parseInt(item.bill_amount).toLocaleString("th-TH")}&nbsp;บิล/เดือน
              </div>
              <div className="mt-3 w-full flex flex-col justify-center items-center">
                {parseInt(item.price).toLocaleString("th-TH")}&nbsp;บาท/เดือน
              </div>
              <div className="mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    สมัครสมาชิก
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Package;
