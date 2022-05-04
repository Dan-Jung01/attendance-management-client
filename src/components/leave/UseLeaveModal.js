import React, { useState } from "react";
import ModalStyle from "../../utils/ModalStyle";
import { Box, Modal, TextField } from "@mui/material";
import "../../css/useLeaveModal.css";
import axios from "axios";

const UseLeaveModal = ({ useLeaveModalOpen, setUseLeaveModalOpen }) => {
  const API_URL = "http://localhost:3003";

  // const handleNameChange = (e) => {
  //   setInputUserName(e.target.value);
  // };
  // const handleIdChange = (e) => {
  //   setInputUserId(e.target.value);
  // };
  // const handlePhoneNumChange = (e) => {
  //   setInputPhoneNum(e.target.value);
  // };
  // const handleStartDateChange = (e) => {
  //   setInputStartDate(e.target.value);
  // };

  const modalClose = () => {
    setUseLeaveModalOpen(false);
  };

  // const editUserInfo = () => {
  //   axios
  //     .put(`${API_URL}/user/userInfo`, {
  //       user_name: inputUserName,
  //       user_id: tableValue.user_id,
  //       phone: inputPhoneNum,
  //       start_date: inputStartDate,
  //     })
  //     .then(alert("수정이 완료되었습니다"))
  //     .then(setEditUserModalOpen(false));
  // };

  return (
    <Modal
      open={useLeaveModalOpen}
      // onClose={handleClose}
    >
      <Box sx={ModalStyle(300, 400, 0)} className="useLeave-modal-conatiner">
        <div className="header">
          <h2>연차 사용</h2>
        </div>
        <div className="body">
          <div className="rows">
            <div className="title">사유</div>
            <div className="input-coord-container">
              <textarea
                type="text"
                className="inputarea"
                placeholder="연차를 사용하는 이유가 있다면 적어주세요"
                autoresize="false"
                // onChange={handleNameChange}
              />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn-cancle" onClick={modalClose}>
            취소
          </button>
          <button className="btn-save">제출</button>
        </div>
      </Box>
    </Modal>
  );
};

export default UseLeaveModal;
