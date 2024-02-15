import { useState ,useEffect } from "react";
import axios from 'axios';
import config from "../config";

function Package(){
    const [Package ,setPackage] = useState([]);

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {
        try {
            axios.get(config.api_path +'/package/list').then(res =>{
                setPackage(res.data.results)
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <div className="container mt-3">
                <div className="h2 text-secondary">DainoPos : Point Of Sale on Clound</div>

                <div className="h5">Package for You</div>
                <div className="row">
                    { Package.map((item, Index) =>
                    <div key={Index} className="col-4">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="h4 text-success">
                                    {item.name}
                                </div>
                                <div className="h5">
                                    {parseInt(item.bill_amount).toLocaleString('th-TH')}
                                    &nbsp;
                                    บิล/เดือน
                                </div>
                                <div className="h5 text-secondary">
                                    {parseInt(item.price).toLocaleString('th-TH')}
                                    &nbsp;
                                    บาท/เดือน
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-primary">สมัคร</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Package;