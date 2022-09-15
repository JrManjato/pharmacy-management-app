import { ExclamationCircleOutlined } from '@ant-design/icons';
import { putMedicines } from "../../httpRequest/Put";
import { Modal } from 'antd';

const { confirm } = Modal;

export const UpdateMedicineConfirm = (
  title,
  content,
  idMedicine,
  temp,
  treatmentList,
  admissionName,
  compartmentName,
  setProducts,
  scale
) => {
  confirm({
    title: title,
    icon: <ExclamationCircleOutlined />,
    content: content,
    width: '30%',
    okText: 'Modifier',
    cancelText: 'Annuler',
    width: 1000,
    height: 600,
    onOk() {
      if (scale === "updateMedicine") {
        console.log(temp);
        putMedicines(setProducts, idMedicine, temp, treatmentList, admissionName, compartmentName);
      }
    },

    onCancel() {
      console.log('Cancel');
    }
  });
};