import React, { useState } from "react";

import { Box, Modal } from "@mui/material";

import ModalStyle from "../../../../utils/ModalStyle";
import "../../../css/modal/editUserInfoModal.css";

import axios from "axios";

const EditUserInfoModal = ({ editUserModalOpen, setEditUserModalOpen, tableValue }) => {
  const [inputUserName, setInputUserName] = useState(tableValue?.user_name);
  const [inputUserId, setInputUserId] = useState(tableValue?.user_id);
  const [inputPhoneNum, setInputPhoneNum] = useState(tableValue?.phone);
  const [inputStartDate, setInputStartDate] = useState(tableValue?.start_date);

  const API_URL = "http://localhost:3003";

  const handleNameChange = (e) => {
    setInputUserName(e.target.value);
  };
  const handleIdChange = (e) => {
    setInputUserId(e.target.value);
  };
  const handlePhoneNumChange = (e) => {
    setInputPhoneNum(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setInputStartDate(e.target.value);
  };

  const modalClose = () => {
    setEditUserModalOpen(false);
  };

  const editWorkTime = () => {
    axios
      .put(`${API_URL}/user/userInfo`, {
        user_name: inputUserName,
        user_id: tableValue.user_id,
        phone: inputPhoneNum,
        start_date: inputStartDate,
      })
      .then(alert("수정이 완료되었습니다"))
      .then(setEditUserModalOpen(false));
  };

  return (
    <Modal
      open={editUserModalOpen}
      // onClose={handleClose}
    >
      <Box sx={ModalStyle(350, 500, 0)} className="userInfo-modal-conatiner">
        <div className="header">
          <h2>사용자 정보 수정</h2>
        </div>
        <div className="body">
          <div className="rows">
            <div className="title">이름</div>
            <div className="input-coord-container">
              <input
                type="text"
                className="input"
                defaultValue={tableValue.user_name}
                placeholder="이름"
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="rows">
            <div className="title">아이디</div>
            <div className="input-coord-container coords-input">
              <input
                type="text"
                className="input"
                value={tableValue.user_id}
                placeholder="아이디"
                onChange={handleIdChange}
              />
            </div>
          </div>
          <div className="rows">
            <div className="title">전화번호</div>
            <div className="input-coord-container coords-input">
              <input
                type="text"
                className="input"
                defaultValue={tableValue.phone}
                placeholder="전화번호"
                onChange={handlePhoneNumChange}
              />
            </div>
          </div>
          <div className="rows">
            <div className="title">시작일</div>
            <div className="input-coord-container coords-input">
              <input
                type="date"
                className="input"
                defaultValue={tableValue.start_date}
                placeholder="시작일"
                onChange={handleStartDateChange}
              />
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn-cancle" onClick={modalClose}>
            취소
          </button>
          <button className="btn-save" onClick={editWorkTime}>
            수정완료
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditUserInfoModal;
