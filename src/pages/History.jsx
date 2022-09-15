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

import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

// Images
import pencil from "../assets/images/pencil.svg";

import { HistoryTable } from "../history/HistoryData";

const { Title } = Typography;

function HistoryFunc({setPath, path}) {

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Historique"
              // extra={
              //       <NavLink to="/dashboard">
              //         <span
              //           className="icon"
              //           style={{
                         
              //           }}
              //         >
              //           tes
              //         </span>
              //         <span className="label">Dashboard</span>
              //       </NavLink>
              // }
            >
              <div className="table-responsive">
                <HistoryTable setPath={setPath} path={path}/>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HistoryFunc;
