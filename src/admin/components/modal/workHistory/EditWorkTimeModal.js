import React, { useState } from "react";

import { Box, Modal } from "@mui/material";

import ModalStyle from "../../../../utils/ModalStyle";
import "../../../css/modal/editWorkTimeModal.css";

import axios from "axios";
import moment from "moment";

const EditWorkTimeModal = ({ editWorkTimeModalOpen, setEditWorkTimeModalOpen, tableValue }) => {
  const [inputOnWork, setInputOnWork] = useState(tableValue?.on_work);
  const [inputOffWork, setInputOffWork] = useState(tableValue?.off_work);

  const onTime = moment("09:59:59", "HH:mm:ss");
  const offOnTime = moment("19:00:00", "HH:mm:ss");

  const recordedStartTime = moment(inputOnWork, "HH:mm:ss");
  const recordedEndTime = moment(inputOffWork, "HH:mm:ss");

  const API_URL = "http://localhost:3003";

  const handleOnWorkChange = (e) => {
    setInputOnWork(e.target.value);
  };
  const handleOffWorkChange = (e) => {
    setInputOffWork(e.target.value);
  };

  const modalClose = () => {
    setEditWorkTimeModalOpen(false);
  };

  const editWorkTime = async () => {
    await axios.put(`${API_URL}/v1/work`, {
      on_work: inputOnWork,
      off_work: inputOffWork,
      today_date: tableValue.today_date,
      user_id: tableValue.user_id,
    });

    const checkLateStatus = await axios.put(`${API_URL}/v1/work/check-late`, {
      user_id: tableValue.user_id,
      today_date: tableValue.today_date,
      is_late: recordedStartTime.isAfter(onTime),
    });
    const checkEarlyStatus = await axios.put(`${API_URL}/v1/work/check-early`, {
      user_id: tableValue.user_id,
      today_date: tableValue.today_date,
      is_early: recordedEndTime.isBefore(offOnTime),
    });

    Promise.all([checkLateStatus, checkEarlyStatus])
      .then(alert("수정이 완료되었습니다"))
      .then(setEditWorkTimeModalOpen(false));
  };

  return (
    <Modal
      open={editWorkTimeModalOpen}
      // onClose={handleClose}
    >
      <Box sx={ModalStyle(450, 250, 0)} className="workTime-modal-conatiner">
        <div className="header">
          <h2>출퇴근 시간 수정</h2>
        </div>
        <div className="body">
          <div className="rows">
            <div className="title">출근시간</div>
            <div className="input-coord-container">
              <input
                type="text"
                className="input"
                defaultValue={tableValue.on_work}
                placeholder="출근시간"
                onChange={handleOnWorkChange}
              />
            </div>
          </div>
          <div className="rows">
            <div className="title">퇴근시간</div>
            <div className="input-coord-container coords-input">
              <input
                type="text"
                className="input"
                defaultValue={tableValue.off_work}
                placeholder="퇴근시간"
                onChange={handleOffWorkChange}
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

export default EditWorkTimeModal;
