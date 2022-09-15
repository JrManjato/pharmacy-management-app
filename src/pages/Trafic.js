/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { showConfirm } from "../components/ux/AddConfirm";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { Trafic } from "../medicine/TraficTable";

const { Title } = Typography;

function Tables() {
  const [products, setProducts] = useState([]);
  const [threshold, setThreshold] = useState(300);

  const getMedicinesByThreshold = async () => {
    const response = await axios
        .get("http://localhost:8080/medicines/"+threshold+"?pageNumber=1&pageSize=100")
        .catch((err) => console.log(err));

    if (response) {
        const medicines = response.data;
        setProducts(medicines);
    }
    
};
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Approvisionnement / Achats | Export"
              extra={
                <>
                  <span>Quantité inférieur ou égal à:  <select name="number-page-option"
                    id=""
                    onChange={(e) => setThreshold(e.target.value)}
                  >
                    <option value="300">300</option>
                    <option value="200">200</option>
                    <option value="100">100</option>
                    <option value="0">0</option>
                  </select>
                  </span>
                  <Button
                  onClick={getMedicinesByThreshold}>
                    Filtrer
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Trafic products={products} setProducts={setProducts} />
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Tables;
