import React from "react";
import "../../css/leave.css";
import Calendar from "react-calendar";
import "../../css/Calendar.css";
import moment from "moment";

//TODO: 연차 사용 버튼 아이콘 넣기

const Leave = () => {
  return (
    <div className="leave-container">
      <h3>Title</h3>
      <div className="leave">
        <div className="top">
          <div className="left">
            <h3>남은 연차</h3>
            <div>
              <span className="date">4</span>일
            </div>
          </div>
          <div className="right">
            <button className="btn-use">사용</button>
          </div>
        </div>
        <div className="calendar">
          <Calendar
            calendarType="US"
            // maxDetail="year"
            // minDetail="year"
            showNeighboringMonth={false}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
        </div>
      </div>
    </div>
  );
};

export default Leave;
