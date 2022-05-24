import React, { useState } from "react";

import { Box, Modal, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";

import ModalStyle from "../../../../utils/ModalStyle";
import "../../../css/modal/editBreakStatusModal.css";

import axios from "axios";

const EditBreakStatusModal = ({ editBreakStatusModalOpen, setEditBreakStatusModalOpen, tableValue }) => {
  const [radioValue, setRadioValue] = useState(tableValue?.status || "DEFER");
  const [cellValue, setCellValue] = useState(tableValue);

  const API_URL = "http://localhost:3003";

  const modalClose = () => {
    setEditBreakStatusModalOpen(false);
  };

  const editApproval = async () => {
    try {
      await axios
        .put(`${API_URL}/user/break/approval`, {
          status: radioValue,
          id: tableValue?.id,
          // user_id: tableValue?.user_id,
          // today_date: tableValue?.today_date,
        })
        .then(alert("수정이 완료되었습니다"))
        .then(setEditBreakStatusModalOpen(false));
    } catch (e) {
      console.log(e);
    }
  };

  const handleRadioChange = (e) => {
    setCellValue(tableValue?.user_id);
    setRadioValue(e.target.value);
  };

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
                // defaultValue={tableValue?.row.status}
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
          <button className="btn-save" onClick={editApproval}>
            수정
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditBreakStatusModal;
