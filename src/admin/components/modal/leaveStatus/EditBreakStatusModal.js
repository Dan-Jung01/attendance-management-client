import React, { useState } from "react";

import { Box, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

import ModalStyle from "../../../../utils/ModalStyle";
import "../../../css/modal/editBreakStatusModal.css";

import axios from "axios";

const EditBreakStatusModal = ({ editBreakStatusModalOpen, setEditBreakStatusModalOpen, tableValue }) => {
  const [inputOnWork, setInputOnWork] = useState(tableValue?.on_work);
  const [inputOffWork, setInputOffWork] = useState(tableValue?.off_work);
  const [radioValue, setRadioValue] = useState(tableValue?.row.status);

  const API_URL = "http://localhost:3003";

  const modalClose = () => {
    setEditBreakStatusModalOpen(false);
  };

  console.log(tableValue?.row.status);

  const editWorkTime = () => {
    axios
      .put(`${API_URL}/both-work-time`, {
        on_work: inputOnWork,
        off_work: inputOffWork,
        today_date: tableValue.today_date,
        user_id: tableValue.user_id,
      })
      .then(alert("수정이 완료되었습니다"))
      .then(setEditBreakStatusModalOpen(false));
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  console.log(radioValue);

  return (
    <Modal open={editBreakStatusModalOpen}>
      <Box sx={ModalStyle(450, 250, 0)} className="breakStatus-modal-conatiner">
        <div className="header">
          <h2>연차사용 요청 승인</h2>
        </div>
        <div className="body">
          {/* <div className="rows">
            <div className="title">출근시간</div>
            <div className="input-coord-container">
              <input
                type="text"
                className="input"
                // defaultValue={tableValue.on_work}
                placeholder="출근시간"
                onChange={handleOnWorkChange}
              />
            </div>
          </div> */}

          <div className="rows form-control">
            <FormControl>
              <RadioGroup
                defaultValue="APPROVED"
                value={radioValue}
                className="radio-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel value="APPROVED" control={<Radio />} label="승인" />
                <FormControlLabel value="DEFER" control={<Radio />} label="대기" />
                <FormControlLabel value="REJECTED" control={<Radio />} label="반려" />
              </RadioGroup>
            </FormControl>
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

export default EditBreakStatusModal;
