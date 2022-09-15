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
import { useState, useEffect } from "react";
import { PostTreatment } from "../httpRequest/PostTreatment"
import { PostCompartment } from "../httpRequest/PostCompartment"
import { success, error } from "../components/ux/Message";

import {
  Row,
  Col,
  Card,
  Button
} from "antd";


function Profile() {
  const [treatmentName, setTreatmentName] = useState("");
  const [compartmentName, setCompartmentName] = useState("");
  const [admissionName, setAdmissionName] = useState("");
  const [medicineName, setMedicineName] = useState("");

  const [treatmentList, setTreatmentList] = useState([]);
  const [admissionList, setAdmissionList] = useState([]);
  const [compartmentList, setCompartmentList] = useState([]);

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
  const getCompartment = async () => {
    const response = await axios
      .get("http://localhost:8080/compartments?pageNumber=1&pageSize=10")
      .catch((err) => console.log(err));

    if (response) {
      const compartmentNameList = response.data;
      compartmentNameList.unshift({
        "idCompartment": 0,
        "compartmentName": "Tout"
      });
      setCompartmentList(compartmentNameList);
    }
  };

  const PostMedicine = async () => {
    console.log(medicineName);
    console.log(treatmentName);
    console.log(admissionName);
    console.log(compartmentName);
    const temp = [];
    temp.push(treatmentName)
    const response = await axios
      .post("http://localhost:8080/create-medicine",
        {
          "medicineName": medicineName,
          "treatmentName": temp,
          "admissionName": admissionName,
          "compartmentName": compartmentName
        }
      )
      .catch((err) => console.log(err));

    if (response) {
      success(medicineName + " a été ajouté aux listes des médicaments.");
    } else {
      error("L'opération a échoué.")
    }
  }
  useEffect(() => {
    getTreatments();
    getAdmission();
    getCompartment();
  }, []);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Nouveau traitement</h6>}
            className="header-solid h-full card-profile-information"

            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <form className="forms text-center">
              <div className="floating-form">
                <div className="floating-label">
                  <span className="input__label">Nom du traitement: </span>
                  <input className="floating-input" type="text" onChange={(e) => setTreatmentName(e.target.value)} />
                </div>
              </div>
            </form>
            <Button
              style={{ marginLeft: "9rem", marginTop: "2rem", border: "1px solid green", color: "green" }}
              onClick={() => PostTreatment(treatmentName)}
            >
              Ajouter
            </Button>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Nouveau compartiment</h6>}
            className="header-solid h-full card-profile-information"

            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <form className="forms text-center">
              <div className="floating-form">
                <div className="floating-label">
                  <span className="input__label">Nom du compartiment: </span>
                  <input className="floating-input" type="text" onChange={(e) => setCompartmentName(e.target.value)} />
                </div>
              </div>
            </form>
            <Button
              style={{ marginLeft: "9rem", marginTop: "2rem", border: "1px solid green", color: "green" }}
              onClick={() => PostCompartment(compartmentName)}
            >
              Ajouter
            </Button>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Nouveau médicament</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <form className="forms text-center" style={{ display: "flex", justifyContent: "center" }}>
              <div className="floating-form">
                <div className="floating-label">
                  <span className="input__label">Nom du médicament: </span>
                  <input className="floating-input" type="text" onChange={(e) => setMedicineName(e.target.value)} />
                </div>
                <div className="floating-label">
                  <span className="input__label">Nom du traitement: </span>
                  <select name="task-evaluation" onChange={(e) => setTreatmentName(e.target.value)}>
                    {treatmentList.map((elt) => (
                      <option key={`${elt.idTreatment}`} value={elt.treatmentName}>{elt.treatmentName}</option>
                    ))}
                  </select>
                </div>
                <div className="floating-label">
                  <span className="input__label">Nom de l'admission: </span>
                  <select name="task-evaluation" onChange={(e) => setAdmissionName(e.target.value)}>
                    {admissionList.map((elt) => (
                      <option key={`${elt.idAdmission}`} value={elt.admissionName}>{elt.admissionName}</option>
                    ))}
                  </select>
                </div>
                <div className="floating-label">
                  <span className="input__label">Nom du compartiment: </span>
                  <select name="task-evaluation" onChange={(e) => setCompartmentName(e.target.value)}>
                    {compartmentList.map((elt) => (
                      <option key={`${elt.idCompartment}`} value={elt.compartmentName}>{elt.compartmentName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <Button
              style={{ marginLeft: "9rem", marginTop: "0", border: "1px solid green", color: "green" }}
              onClick={PostMedicine}
            >
              Ajouter
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
