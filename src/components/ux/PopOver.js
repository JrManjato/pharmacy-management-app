import React, { useState } from 'react';
import { Button, Popover, Modal } from 'antd';
import 'antd/dist/antd.css';
import { MoreOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { showConfirm } from './DeleteConfirm'
import { UpdateMedicineConfirm } from './UpdateConfirm'
import { putMedicines } from "../../httpRequest/Put";

export function Popovers({ row, setProducts, admissionName, setTes, tes }) {

  const [idMedicine, setIdMedicine] = useState(row.values.idMedicine);
  const [treatmentList, setTreatmentList] = useState(row.values.treatmentList);
  const [compartmentName, setCompartmentName] = useState(row.values.compartment?.compartmentName);

  const { confirm } = Modal;


  var temp = "";

  const handleChangeMedicineName = (e) => {
    temp = e.target.value;
  }

  const pencil = [
    <svg
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const content = (
    <>
      <div>
        <div style={{ marginBlock: ".7rem" }}
          onClick={() => {
            confirm({
              title: "Modifier",
              icon: <ExclamationCircleOutlined />,
              content: <>
                En cours de construction
              </>,
              width: '30%',
              okText: 'Modifier',
              cancelText: 'Annuler',
              width: 1000,
              height: 600,
              onOk() {
                if ("updateMedicine" === "updateMedicine") {
                  console.log(temp);
                  putMedicines(setProducts, idMedicine, temp, treatmentList, admissionName, compartmentName);
                }
              },

              onCancel() {
                console.log('Cancel');
              }
            });
          }
          }
        >
          <a style={{ color: "black" }}>Modifier <span style={{ marginLeft: "2.8rem" }}>{pencil}</span></a>
        </div>
        <div
          onClick={() =>
            showConfirm(
              <h4 style={{ fontSize: "1rem" }}>Êtes-vous sûr de vouloir supprimer ce médicament ?</h4>,
              <>
                <p>Médicament: <span>{row.values.medicineName}</span></p>
                <p>Compartiment: <span>{row.values.compartment?.compartmentName}</span></p>
                <p>Quantité: <span>{row.values.quantity}</span></p>
              </>,
              row.values.idMedicine,
              "medicine",
              setTes,
              tes
            )
          }
        >
          <a style={{ color: "red" }}>Supprimer <span style={{ marginLeft: "2rem" }}><DeleteOutlined /></span></a>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Popover content={content} title="Actions" trigger="click">
        <MoreOutlined />
      </Popover>
    </div>
  )
};

// row.values.treatmentList.map((elt) => console.log(elt.treatmentName))