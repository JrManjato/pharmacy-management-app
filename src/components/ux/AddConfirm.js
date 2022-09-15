import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PostMedicine } from "../../httpRequest/PostMedicine";
import { Modal } from 'antd';

const { confirm } = Modal;

export const showConfirm = (title, content, id, scale) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content:content,
      width: '30%',
      okText: 'Ajouter',
      cancelText: 'Annuler',
      onOk() {
        PostMedicine();
      },
  
      onCancel() {
        console.log('Cancel');
      }
    });
  };