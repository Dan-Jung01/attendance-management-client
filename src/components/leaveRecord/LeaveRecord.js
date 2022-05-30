import React, { useState, useEffect } from "react";
import "css/workRecord.css";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow } from "@material-ui/core";
import axios from "axios";

const LeaveRecord = ({ userId }) => {
  const API_URL = "http://localhost:3003";

  const [leaveRecord, setLeaveRecord] = useState([]);

  const eachRow = () =>
    leaveRecord.map((row, i) => {
      return (
        <TableRow key={i}>
          <TableCell component="th" scope="row" align="center">
            {row.today_date}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.start_date}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.end_date}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.status}
          </TableCell>
        </TableRow>
      );
    });

  useEffect(() => {
    try {
      async function getUserWorkTimeRecord() {
        const leaveRecord = await axios.get(`${API_URL}/user/break`, {
          params: {
            user_id: userId,
          },
        });
        // console.log(workTimeRecord.data);
        setLeaveRecord(leaveRecord.data);
      }
      getUserWorkTimeRecord();
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  const columns = ["날짜", "출근시간", "퇴근시간"];

  return (
    <div className="work-record-container">
      <TableContainer style={{ height: "auto", maxHeight: 300 }} className="tb-isOnWork">
        <section className="tb-title">
          <div>연차사용기록</div>
          <div>총 {leaveRecord.length}일 </div>
        </section>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((title, i) => (
                <TableCell key={i} align={"center"}>
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{eachRow()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaveRecord;
