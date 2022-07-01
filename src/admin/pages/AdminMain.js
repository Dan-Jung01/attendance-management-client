import React, { useEffect, useState } from "react";
import "../css/adminMain.css";
import moment from "moment";
import axios from "axios";

import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow } from "@material-ui/core";

const AdminMain = () => {
  const curDate = moment().format("YYYY-MM-DD");
  const API_URL = "http://localhost:3003";
  const [onWorkUsers, setOnWorkUsers] = useState([]);

  useEffect(() => {
    try {
      async function getUserWorkTime() {
        const curUserStatus = await axios.get(`${API_URL}/v1/work/current-worker`, {
          params: {
            today_date: curDate,
          },
        });
        setOnWorkUsers(curUserStatus.data);
      }
      getUserWorkTime();
    } catch (err) {
      console.log(err);
    }
  }, [curDate]);

  const eachRow = () =>
    onWorkUsers.map((row, i) => {
      const isOnWork = row.on_work !== (null && undefined);

      const showStatusLight = () => {
        if (isOnWork) {
          return <button className="btn-dot" />;
        } else {
          return null;
        }
      };

      return (
        <TableRow key={i}>
          <TableCell component="th" scope="row" align="center">
            {row.user_name}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {showStatusLight()}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.on_work}
          </TableCell>
        </TableRow>
      );
    });

  const columns = ["이름", "상태", "출근시간"];
  return (
    <div className="main-container">
      <TableContainer className="tb-isOnWork">
        <section className="tb-title">
          <div>근무중</div>
          <div>총 {onWorkUsers.length}명 </div>
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

export default AdminMain;
