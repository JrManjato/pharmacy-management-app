import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteHistory, DeleteMedicine } from "../../httpRequest/Delete";
import { Modal } from 'antd';

const { confirm } = Modal;

export const showConfirm = (title, content, id, scale, setTes, tes) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: content,
      width: '30%',
      okText: 'Oui',
      cancelText: 'Non',
      onOk() {
        if (scale === "history") {
          DeleteHistory(id, setTes, tes);
        }else if(scale === "medicine") {
          DeleteMedicine(id, setTes, tes);
        }
      },
  
      onCancel() {
        console.log('Cancel');
      }
    });
  };