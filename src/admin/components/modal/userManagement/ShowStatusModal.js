import React, { useState } from "react";
import "../../../css/modal/showStatusModal.css";
import { Box, Modal, Tab } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import ModalStyle from "../../../../utils/ModalStyle";
import axios from "axios";

const ShowStatusModal = ({ showStatusModalOpen, setShowStatusModalOpen, tableValue }) => {
  // const [inputOnWork, setInputOnWork] = useState(tableValue?.on_work);
  // const [inputOffWork, setInputOffWork] = useState(tableValue?.off_work);
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const API_URL = "http://localhost:3003";

  // const handleOnWorkChange = (e) => {
  //   setInputOnWork(e.target.value);
  // };
  // const handleOffWorkChange = (e) => {
  //   setInputOffWork(e.target.value);
  // };

  const modalClose = () => {
    setShowStatusModalOpen(false);
  };

  return (
    <Modal
      open={showStatusModalOpen}
      // onClose={handleClose}
    >
      <Box sx={ModalStyle(650, 450, 0)} className="status-modal-conatiner">
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="header">
              <h2>근태정보</h2>
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
          <TabPanel value="1">요약</TabPanel>
          <TabPanel value="2">지각</TabPanel>
          <TabPanel value="3">결근</TabPanel>
          <TabPanel value="4">미체크</TabPanel>
          <TabPanel value="5">조퇴</TabPanel>
        </TabContext>

        <div className="body">
          <div className="rows">
            <div className="title">출근시간</div>
            <div className="input-coord-container">
              <input
                type="text"
                className="input"
                // defaultValue={tableValue.on_work}
                placeholder="출근시간"
                // onChange={handleOnWorkChange}
              />
            </div>
          </div>
          <div className="rows">
            <div className="title">퇴근시간</div>
            <div className="input-coord-container coords-input">
              <input
                type="text"
                className="input"
                // defaultValue={tableValue.off_work}
                placeholder="퇴근시간"
                // onChange={handleOffWorkChange}
              />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn-cancle" onClick={modalClose}>
            확인
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ShowStatusModal;
