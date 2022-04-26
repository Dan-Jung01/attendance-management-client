import React, { useEffect, useState } from "react";
import "../css/adminWork.css";
import AdminContainer from "../components/AdminContainer";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import EditWorkTimeModal from "../components/modal/workHistory/EditWorkTimeModal";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import moment from "moment";

const AdminWork = () => {
  const API_URL = "http://localhost:3003";

  const [usersWorkTime, setUsersWorkTime] = useState([]);
  const [editWorkTimeModalOpen, setEditWorkTimeModalOpen] = useState(false);
  const [tableValue, setTableValue] = useState({});
  const [dialogValue, setDialogValue] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  const onTime = moment("13:59:59", "HH:mm:ss");

  const columns = [
    {
      field: "id",
      headerName: "No.",
      flex: 1,
      align: "center",
      columns: "center",
      headerAlign: "center",
    },
    {
      field: "today_date",
      headerName: "날짜",
      type: "number",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "user_name",
      headerName: "이름",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "on_work",
      headerName: "출근시간",
      flex: 2,
      align: "center",
      headerAlign: "center",
      valueGetter: ({ value }) => value,
    },
    {
      field: "off_work",
      headerName: "퇴근시간",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "edit",
      headerName: "수정",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <FiEdit
          className="icon"
          style={{ fontSize: 17 }}
          onClick={() => {
            setTableValue(params.row);
            setEditWorkTimeModalOpen(true);
          }}
        />
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <RiDeleteBinLine
          className="icon"
          style={{ fontSize: 17 }}
          onClick={async () => {
            setDialogValue(false);
            deleteWorkTime(params.row);
          }}
        />
      ),
    },
  ];

  const deleteWorkTime = async (selectedTableValue) => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer) {
      await axios.delete(`${API_URL}/work-time/${selectedTableValue.id}`).then(alert("삭제되었습니다"));
      setDialogValue(true);
    } else {
      return;
    }
  };

  const filtering = usersWorkTime.filter((val) => {
    if (searchWord === "") {
      return usersWorkTime;
    } else if (val.user_name.toLowerCase().includes(searchWord.toLowerCase())) {
      return searchWord;
    }
  });

  useEffect(() => {
    axios.get(`${API_URL}/work-time`).then(async (res) => {
      setUsersWorkTime(res?.data);
    });
  }, [editWorkTimeModalOpen, dialogValue]);

  return (
    <AdminContainer>
      <Box
        className="admin-work-container"
        sx={{
          maxHeight: "80%",
          height: "80%",
          width: "80%",
          "& .cold": {
            backgroundColor: "#b9d5ff91",
            color: "#1a3e72",
          },
          "& .hot": {
            backgroundColor: "#ff943975",
            color: "#1a3e72",
          },
        }}
      >
        <div className="header">
          <div>총 {filtering.length}건</div>
          <input
            className="input"
            type={"text"}
            placeholder="검색어를 입력해주세요"
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </div>
        <DataGrid
          rows={filtering}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          checkboxSelection={false}
          getCellClassName={(params) => {
            if (params.field !== "on_work") {
              return "";
            }

            const recordedTime = moment(params.value, "HH/mm/ss");
            if (recordedTime.isBefore(onTime)) {
              return "cold";
            } else {
              return "hot";
            }
          }}
        />
      </Box>
      <EditWorkTimeModal
        editWorkTimeModalOpen={editWorkTimeModalOpen}
        setEditWorkTimeModalOpen={setEditWorkTimeModalOpen}
        tableValue={tableValue}
      />
    </AdminContainer>
  );
};

export default AdminWork;
