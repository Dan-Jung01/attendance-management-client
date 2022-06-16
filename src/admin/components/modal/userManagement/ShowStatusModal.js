import React, { useState, useEffect, useMemo } from "react";
import "../../../css/modal/showStatusModal.css";
import { Box, Modal, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import ModalStyle from "../../../../utils/ModalStyle";
import axios from "axios";
import Table from "admin/components/table/Table";
import "admin/css/modal/statusModalTable.css";

const ShowStatusModal = ({ showStatusModalOpen, setShowStatusModalOpen, tableValue }) => {
  const [tabValue, setTabValue] = useState("1");
  const [stateLate, setStateLate] = useState();
  const [stateEarlyCheck, setStateEarlyCheck] = useState();
  const [stateMissCheck, setStateMissCheck] = useState();
  const [lateList, setLateList] = useState([]);

  const API_URL = "http://localhost:3003";

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === "2") {
      axios
        .get(`${API_URL}/late-status`, {
          params: {
            user_id: tableValue.user_id,
          },
        })
        .then((r) => {
          setLateList(r?.data);
        });
    }
  };

  const modalClose = () => {
    setShowStatusModalOpen(false);
    setTabValue("1");
  };

  const columns = useMemo(
    () => [
      {
        accessor: "id",
        Header: "No.",
      },
      {
        accessor: "today_date",
        Header: "날짜",
      },
      {
        accessor: "on_work",
        Header: "출근시간",
      },
    ],
    []
  );

  useEffect(() => {
    axios
      .get(`${API_URL}/status`, {
        params: {
          user_id: tableValue.user_id,
        },
      })
      .then((res) => {
        console.log(res.data);

        setStateLate(res?.data[0][0]?.state_late === null ? 0 : res.data[0][0].state_late);
        setStateEarlyCheck(res?.data[1][0]?.state_early_check === null ? 0 : res?.data[1][0]?.state_early_check);
        setStateMissCheck(res?.data[2][0]?.state_miss_check === null ? 0 : res?.data[2][0]?.state_miss_check);
      });
  }, [tableValue.user_id]);

  return (
    <Modal open={showStatusModalOpen} onClose={modalClose}>
      <Box sx={ModalStyle(650, 470, 0)} className="status-modal-conatiner">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="header">
              <h2>
                <span>{tableValue.user_name}</span> 근태정보
              </h2>
              <label className="btn-close" onClick={modalClose}>
                X
              </label>
            </div>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="요약" value="1" />
              <Tab label="지각" value="2" />
              {/* <Tab label="결근" value="3" /> */}
              <Tab label="미체크" value="4" />
              <Tab label="조퇴" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1" className="tab-panel">
            <div className="tab-summary">
              <div className="group">
                <div className="element">
                  <div className="title">지각</div>
                  <div className="count">
                    <span>{stateLate}</span>회
                  </div>
                </div>
                <div className="element">
                  <div className="title">미체크</div>
                  <div className="count">
                    <span>{parseInt(stateMissCheck) === 1 ? 0 : stateMissCheck}</span>회
                  </div>
                </div>
                <div className="element">
                  <div className="title">조퇴</div>
                  <div className="count">
                    <span>{stateEarlyCheck}</span>회
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="element">
                <div className="title">결근</div>
                <div className="count"> <span>{status.state_absence}</span>회</div>
              </div> */}
            </div>
          </TabPanel>
          <TabPanel value="2" className="tab-panel">
            {/* <div>지각</div> */}
            <Table columns={columns} data={lateList} />
          </TabPanel>
          {/* <TabPanel value="3">결근</TabPanel> */}
          <TabPanel value="4" className="tab-panel">
            미체크
          </TabPanel>
          <TabPanel value="5" className="tab-panel">
            조퇴
          </TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default ShowStatusModal;
