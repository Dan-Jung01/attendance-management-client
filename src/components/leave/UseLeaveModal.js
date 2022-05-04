import React, { useState } from "react";
import ModalStyle from "../../utils/ModalStyle";
import { Box, Modal } from "@mui/material";
import "../../css/useLeaveModal.css";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "../../css/Datepicker.css";
import moment from "moment";
// import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const UseLeaveModal = ({ useLeaveModalOpen, setUseLeaveModalOpen }) => {
  const API_URL = "http://localhost:3003";
  const [startDate, setStartDate] = useState(new Date());
  // const [startDate, setStartDate] = useState(new Date(moment().format("yyyy-MM-DD")));
  // const [startDate, setStartDate] = useState(moment().format("yyyy-MM-DD"));
  const [endDate, setEndDate] = useState(null);
  registerLocale("ko", ko);

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const useLeaveDateCount = moment(endDate - startDate).format("D");

  const sDate = moment(startDate).format("yyyy-MM-DD");
  const eDate = moment(endDate).format("yyyy-MM-DD");
  // const sDate = moment(startDate.format("yyyy-MM-DD"));
  // console.log(startDate);
  console.log(sDate);
  console.log(eDate);

  console.log(useLeaveDateCount);

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
      <Box sx={ModalStyle(300, 370, 0)} className="useLeave-modal-conatiner">
        <div className="header">
          <h2>연차 사용</h2>
        </div>
        <div className="body-wrapper">
          <div className="body">
            <div className="rows">
              <div className="title">기간</div>
              <div className="date">
                <DatePicker
                  selected={startDate}
                  endDate={endDate}
                  startDate={startDate}
                  onChange={onDateChange}
                  selectsRange
                  locale="ko"
                  // inline
                  className="date-picker"
                  dateFormat={"yyyy/MM/dd"}
                />
              </div>
            </div>

            <div className="rows">
              <div className="title">사유</div>
              <div className="input-coord-container">
                <textarea
                  type="text"
                  className="inputarea"
                  placeholder="연차 사용 목적을 적어주세요"
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
        </div>
      </Box>
    </Modal>
  );
};

export default UseLeaveModal;
