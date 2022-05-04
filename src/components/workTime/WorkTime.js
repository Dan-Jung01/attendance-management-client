import React, { useEffect, useState } from "react";
import moment from "moment";
import Clock from "react-live-clock";
import "../../css/workTime.css";
import { FaChild, FaRunning } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { AiFillCaretDown } from "react-icons/ai";

const WorkTime = ({ userName, userId }) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [workTime, setWorkTime] = useState();

  const API_URL = "http://localhost:3003";
  const curDate = moment().format("YYYY-MM-DD");

  const recordedStartTime = moment(startTime, "HH:mm:ss");
  const recordedEndTime = moment(endTime, "HH:mm:ss");
  // console.log(recordedEndTime.diff(recordedStartTime, "minutes") + " days");

  const onTime = moment("13:59:59", "HH:mm:ss");
  const offOnTime = moment("19:00:00", "HH:mm:ss");

  // Send current time to DB and record if user was not on time when user pressed work start button
  const startOnclick = () => {
    const curTime = moment().format("HH:mm:ss");
    axios
      .post(`${API_URL}/work`, {
        on_work: curTime,
        today_date: curDate,
        user_name: userName,
        user_id: userId,
      })
      .then(setStartTime(curTime))
      .then(() => {
        if (recordedStartTime.isAfter(onTime)) {
          axios
            .put(`${API_URL}/late-status`, {
              user_id: userId,
            })
            .then(console.log("late-status checked"));
        } else return;
      });
  };

  // Send current time to DB when user pressed work end button
  const endOnclick = () => {
    const curTime = moment().format("HH:mm:ss");
    axios
      .put(`${API_URL}/work`, {
        off_work: curTime,
        today_date: curDate,
        user_name: userName,
      })
      .then(setEndTime(curTime))
      .then(() => {
        if (recordedEndTime.isBefore(offOnTime)) {
          axios
            .put(`${API_URL}/early-status`, {
              user_id: userId,
            })
            .then(console.log("early-status checked"));
        } else return;
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
          // console.log(typeof new Date(userWorkTime.data.on_work));
          setEndTime(userWorkTime.data.off_work);
          // return userWorkTime;
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

  // useEffect(() => {
  //   if (todayDate !== curDate) {
  //     setStartTime("00:00:00");
  //     setEndTime("00:00:00");
  //   }
  //   // getWorkTime();
  // }, [curDate, todayDate]);

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
