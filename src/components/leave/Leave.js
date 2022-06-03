import React, { useState, useEffect } from "react";
import UseLeaveModal from "./UseLeaveModal";
import Calendar from "react-calendar";
import moment from "moment";
import { AiFillCaretDown } from "react-icons/ai";
import "../../css/Calendar.css";
import "../../css/leave.css";
import axios from "axios";

const Leave = ({ userName, userId }) => {
  const API_URL = "http://localhost:3003";

  const [useLeaveModalOpen, setUseLeaveModalOpen] = useState(false);
  const [leaveCount, setLeaveCount] = useState();

  useEffect(() => {
    try {
      async function getUserLeaveRecord() {
        const leaveRecord = await axios.get(`${API_URL}/user/userInfo/${userId}`);
        console.log(leaveRecord);
        setLeaveCount(leaveRecord?.data);
      }
      getUserLeaveRecord();
    } catch (err) {
      console.log(err);
    }
  }, [userId, useLeaveModalOpen]);

  return (
    <div className="leave-container">
      <h3>
        <AiFillCaretDown className="icon-arrow" /> 연차
      </h3>
      <div className="leave">
        <div className="top">
          <div className="left">
            <h3>남은 연차</h3>
            <div>
              <span className="date">{leaveCount?.break_cnt}</span>일
            </div>
          </div>
          <div className="right">
            <button className="btn-use" onClick={() => setUseLeaveModalOpen(true)}>
              사용
            </button>
          </div>
        </div>
        <div className="calendar">
          <Calendar
            calendarType="US"
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
        </div>
      </div>
      <UseLeaveModal
        useLeaveModalOpen={useLeaveModalOpen}
        setUseLeaveModalOpen={setUseLeaveModalOpen}
        userName={userName}
        userId={userId}
      />
    </div>
  );
};

export default Leave;
