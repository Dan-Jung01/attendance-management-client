import React, { useState, useEffect } from "react";
import "../../../css/modal/showStatusModal.css";
import { Box, Modal, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import ModalStyle from "../../../../utils/ModalStyle";
import axios from "axios";

const ShowStatusModal = ({ showStatusModalOpen, setShowStatusModalOpen, tableValue }) => {
  const [tabValue, setTabValue] = useState("1");
  const [status, setStatus] = useState({});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const modalClose = () => {
    setShowStatusModalOpen(false);
  };

  const API_URL = "http://localhost:3003";

  useEffect(() => {
    axios
      .get(`${API_URL}/all-status`, {
        params: {
          user_id: tableValue.user_id,
        },
      })
      .then(async (res) => {
        setStatus(res.data);
      });
  }, [tableValue.user_id]);

  return (
    <Modal open={showStatusModalOpen} onClose={modalClose}>
      <Box sx={ModalStyle(650, 470, 0)} className="status-modal-conatiner">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="header">
              <h2>{tableValue.user_name}의 근태정보</h2>
              <label className="btn-close" onClick={modalClose}>
                X
              </label>
            </div>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="요약" value="1" />
              <Tab label="지각" value="2" />
              <Tab label="결근" value="3" />
              <Tab label="미체크" value="4" />
              <Tab label="조퇴" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1" className="tab-summary">
            <div className="top group">
              <div className="element">
                <div className="title">지각</div>
                <div className="count">
                  <span>{status.state_late}</span>회
                </div>
              </div>
              <div className="element">
                <div className="title">결근</div>
                <div className="count">
                  {" "}
                  <span>{status.state_absence}</span>회
                </div>
              </div>
            </div>
            <div className="top group">
              <div className="element">
                <div className="title">미체크</div>
                <div className="count">
                  <span>{status.state_miss_check}</span>회
                </div>
              </div>
              <div className="element">
                <div className="title">조퇴</div>
                <div className="count">
                  <span>{status.state_early_check}</span>회
                </div>
              </div>
            </div>

            {/* <div className="bottom group">
              <div className="element">미체크</div>
              <div className="element">조퇴</div>
            </div> */}
          </TabPanel>
          <TabPanel value="2">지각</TabPanel>
          <TabPanel value="3">결근</TabPanel>
          <TabPanel value="4">미체크</TabPanel>
          <TabPanel value="5">조퇴</TabPanel>
        </TabContext>

        {/* <div className="btn-container">
          <button className="btn-cancle" onClick={modalClose}>
            확인
          </button>
        </div> */}
      </Box>
    </Modal>
  );
};

export default ShowStatusModal;
