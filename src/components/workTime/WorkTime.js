import React, { useEffect, useState } from "react";
import moment from "moment";
import Clock from "react-live-clock";
import "../../css/workTime.css";
import { FaChild, FaRunning } from "react-icons/fa";
import axios from "axios";
import { AiFillCaretDown } from "react-icons/ai";

const WorkTime = ({ userName, userId }) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const API_URL = "http://localhost:3003";
  const curDate = moment().format("YYYY-MM-DD");

  const onTime = moment("09:59:59", "HH:mm:ss");
  const offOnTime = moment("19:00:00", "HH:mm:ss");

  // Send current time to DB and record if user was not on time when user pressed work start button
  const startOnclick = () => {
    const curTime = moment().format("HH:mm:ss");
    const recordedStartTime = moment(curTime, "HH:mm:ss");
    axios
      .post(`${API_URL}/work`, {
        on_work: curTime,
        today_date: curDate,
        user_name: userName,
        user_id: userId,
      })
      .then(() => {
        setStartTime(curTime);
      })
      .then(() => {
        axios.put(`${API_URL}/check-late`, {
          user_id: userId,
          today_date: curDate,
          is_late: recordedStartTime.isAfter(onTime),
        });
      })
      .then(() => {
        axios.put(`${API_URL}/check-miss`, {
          user_id: userId,
          today_date: curDate,
          is_miss: true,
        });
      });
  };

  // Send current time to DB when user pressed work end button
  const endOnclick = () => {
    const curTime = moment().format("HH:mm:ss");
    const recordedEndTime = moment(curTime, "HH:mm:ss");
    const recordedStartTime = moment(startTime, "HH:mm:ss");

    const second = moment.duration(recordedEndTime.diff(recordedStartTime)).asSeconds();
    const duration = moment.duration(second, "second");
    const totalWork = duration.format("hh:mm:ss");
    // console.log("시간 차이: ", moment.duration(recordedEndTime.diff(recordedStartTime)).asMilliseconds());

    axios
      .put(`${API_URL}/work`, {
        off_work: curTime,
        today_date: curDate,
        user_name: userName,
        total_work: totalWork,
      })
      .then(setEndTime(curTime))
      .then(() => {
        axios.put(`${API_URL}/check-early`, {
          user_id: userId,
          today_date: curDate,
          is_early: recordedEndTime.isBefore(offOnTime),
        });
      })
      .then(() => {
        axios.put(`${API_URL}/check-miss`, {
          user_id: userId,
          today_date: curDate,
          is_miss: false,
        });
      });
  };

  useEffect(() => {
    let isMount = true;
    try {
      async function getUserWorkTime() {
        const userWorkTime = await axios.get(`${API_URL}/on-work-time`, {
          params: {
            user_name: userName,
            today_date: curDate,
          },
        });
        if (isMount) {
          setStartTime(userWorkTime.data.on_work);
          setEndTime(userWorkTime.data.off_work);
        }
      }
      getUserWorkTime();
    } catch (err) {
      console.log(err);
    }
    return () => {
      isMount = false;
    };
  }, [curDate, userName, startTime, endTime]);

  return (
    <div className="work-check-container">
      <h3>
        <AiFillCaretDown className="icon-arrow" /> 출퇴근
      </h3>
      <div className="work-check">
        <div className="cur-data">
          <Clock className="cur-date" format={`YYYY / MM / DD`} timezone={`Asia/Seoul`} />
        </div>
        <div className="cur-time">
          <Clock format={`HH : mm : ss`} ticking={true} timezone={`Asia/Seoul`} />
        </div>
        <div className="work-btn-container">
          <button className="work-btn" onClick={startOnclick}>
            <div>
              <FaChild className="work-icon icon-work" />
            </div>
            btn1
            <div>{startTime}</div>
          </button>
          <button className="work-btn home-btn" onClick={endOnclick}>
            <div>
              {" "}
              <FaRunning className="work-icon icon-home" />
            </div>
            btn2
            <div>{endTime}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkTime;
