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

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [treatmentList, setTreatmentList] = useState([]);
  const [admissionList, setAdmissionList] = useState([]);
  const [treatmentFilter, setTreatmentFilter] = useState();
  const [admissionFilter, setAdmissionFilter] = useState();

  const [compositionList, setCompositionList] = useState([]);

  const getTreatments = async () => {
    const response = await axios
      .get("http://localhost:8080/treatment-list")
      .catch((err) => console.log(err));

    if (response) {
      const traitementNameList = response.data;
      traitementNameList.unshift({
        "idTreatment": 0,
        "treatmentName": "Tout"
      });
      setTreatmentList(traitementNameList);
    }
  };

  const getAdmission = async () => {
    const response = await axios
      .get("http://localhost:8080/admissions")
      .catch((err) => console.log(err));

    if (response) {
      const admissionNameList = response.data;
      admissionNameList.unshift({
        "idAdmission": 0,
        "admissionName": "Tout"
      });
      setAdmissionList(admissionNameList);
    }
  };

  const getMedicinesByFilter = async () => {
    console.log(treatmentFilter);
    console.log(admissionFilter);

    let treatmentFilterUrl = "http://localhost:8080/medicines?pageNumber=1&pageSize=10";

    if ((treatmentFilter == null || treatmentFilter == "Tout") && (admissionFilter == null || admissionFilter == "Tout")) {
      treatmentFilterUrl = "http://localhost:8080/medicines?pageNumber=1&pageSize=10";
    } else if (treatmentFilter != null && admissionFilter == null || admissionFilter == "Tout") {
      treatmentFilterUrl = "http://localhost:8080/medicines?treatmentName=" + treatmentFilter + "&pageNumber=1&pageSize=10";
    } else if (admissionFilter != null && treatmentFilter == null || treatmentFilter == "Tout") {
      treatmentFilterUrl = "http://localhost:8080/medicines?admissionName=" + admissionFilter + "&pageNumber=1&pageSize=10";
    } else if (treatmentFilter && admissionFilter) {
      treatmentFilterUrl = "http://localhost:8080/medicines?treatmentName=" + treatmentFilter + "&admissionName=" + admissionFilter + "&pageNumber=1&pageSize=10"
    }

    const response = await axios
      .get(treatmentFilterUrl)
      .catch((err) => console.log(err));

    if (response) {
      const medicines = response.data;
      setProducts(medicines);
    }
  };


  useEffect(() => {
    getTreatments();
    getAdmission();
  }, [treatmentFilter, admissionFilter]);

  const handleChangeSelectAdmission = (e) => {
    setAdmissionFilter(e.currentTarget.value);
  }

  const handleChangeSelectTreatment = (e) => {
    setTreatmentFilter(e.currentTarget.value);
  }
  var temp = ""
  const handleAdd = (e) => {
    e.preventDefault();
    console.log('trying to add...');
    console.log(temp);
    if (temp) {
      console.log(name);
      setCompositionList([...compositionList, { id: Date.now(), name }]);
    }
  };

  const deleteComponent = (e) => {
    console.log('trying to delete...');
    e.preventDefault();
    var target = e.target;

    while (target && target.nodeName !== "TR") {
      target = target.parentNode;
    }

    const tdList = target.getElementsByTagName("TD");
    const str = tdList[0].innerHTML;

    setCompositionList(compositionList.filter((elt) => elt.id != str))

  };


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Liste des médicaments"
              extra={
                <>
                  <select id="task-option" onChange={(e) => handleChangeSelectTreatment(e)}>
                    {treatmentList.map((elt) => (
                      <option key={`${elt.idTreatment}`} value={elt.treatmentName}>{elt.treatmentName}</option>
                    ))}
                  </select>
                  <select id="task-option" onChange={(e) => handleChangeSelectAdmission(e)}>
                    {admissionList.map((elt) => (
                      <option key={`${elt.idAdmission}`} value={elt.admissionName}>{elt.admissionName}</option>
                    ))}
                  </select>
                  <Button
                    onClick={getMedicinesByFilter}
                    style={{ color: "rgb(25, 152, 255)", border: "1px solid rgb(25, 152, 255)" }}
                  >
                    Filtrer
                  </Button>
                  <div>
                    <Menu theme="light" mode="inline">
                      <Menu.Item key="6">
                        <NavLink to="/ajout">
                          <Button
                          style={{color:"green", border:"1px solid green"}}>
                            Ajouter
                          </Button>
                        </NavLink>
                      </Menu.Item>
                    </Menu>
                  </div>
                </>
              }
            >
              <div className="table-responsive">
                <Products products={products} setProducts={setProducts} />
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}

export default Tables;
