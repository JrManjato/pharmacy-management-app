import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DeleteHistory, DeleteMedicine } from "../../httpRequest/Delete";
import { Modal } from 'antd';

const { confirm } = Modal;

export const showConfirm = (title, content, id, scale) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: content,
      width: '30%',
      okText: 'Oui',
      cancelText: 'Non',
      onOk() {
        if (scale === "history") {
          DeleteHistory(id);
        }else if(scale === "medicine") {
          DeleteMedicine(id);
        }
      },
  
      onCancel() {
        console.log('Cancel');
      }
    });
  };