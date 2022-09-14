import 'antd/dist/antd.css';
import { message } from 'antd';


export const success = (messageContent) => {
  message.success(messageContent);
};

export const error = (messageContent) => {
  message.error(messageContent);
};

export const warning = (messageContent) => {
  message.warning(messageContent);
};