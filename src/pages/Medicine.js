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
import React, { useEffect, useMemo, useState } from "react";
import { showConfirm } from "../components/ux/AddConfirm";
import { NavLink, useLocation } from "react-router-dom";
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
  Menu
} from "antd";

import { Products } from "../medicine/MedicineData";

const { Title } = Typography;

function Tables() {
  // const [compositionList, setCompositionList] = useState([]);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Liste des médicaments"
            >
              <div className="table-responsive">
                <Products />
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Tables;


// var temp = ""
//   const handleAdd = (e) => {
//     e.preventDefault();
//     console.log('trying to add...');
//     console.log(temp);
//     if (temp) {
//       console.log(name);
//       setCompositionList([...compositionList, { id: Date.now(), name }]);
//     }
//   };

//   const deleteComponent = (e) => {
//     console.log('trying to delete...');
//     e.preventDefault();
//     var target = e.target;

//     while (target && target.nodeName !== "TR") {
//       target = target.parentNode;
//     }

//     const tdList = target.getElementsByTagName("TD");
//     const str = tdList[0].innerHTML;

//     setCompositionList(compositionList.filter((elt) => elt.id != str))

//   };
