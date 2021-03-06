import React, { useState } from "react";
import ModalStyle from "../../utils/ModalStyle";
import { Box, Modal } from "@mui/material";
import "../../css/useLeaveModal.css";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "../../css/Datepicker.css";
import moment from "moment";

import axios from "axios";
import { useAuthContext } from "providers/AuthProvider";

const UseLeaveModal = ({ useLeaveModalOpen, setUseLeaveModalOpen }) => {
  const { user } = useAuthContext();
  const API_URL = "http://localhost:3003";
  const curDate = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(new Date());
  const [reason, setReason] = useState("");
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
  // console.log(sDate);
  // console.log(eDate);

  // console.log(reason);

  const modalClose = () => {
    setUseLeaveModalOpen(false);
  };

  //TODO: 연차사용 API 수정
  const handleSubmit = () => {
    axios
      .post(`${API_URL}/v1/break`, {
        start_date: sDate,
        end_date: eDate,
        today_date: curDate,
        user_name: user.user_name,
        user_id: user.user_id,
        reason: reason,
        used_date_cnt: useLeaveDateCount,
      })
      .then(
        axios.put(`${API_URL}/v1/user/break-calc`, {
          user_id: user.user_id,
          used_date_cnt: useLeaveDateCount,
        })
      )
      .then(alert("제출이 완료되었습니다"))
      .then(modalClose);
  };

  return (
    <Modal open={useLeaveModalOpen}>
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
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="btn-container">
            <button className="btn-cancle" onClick={modalClose}>
              취소
            </button>
            <button className="btn-save" onClick={handleSubmit}>
              제출
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default UseLeaveModal;
