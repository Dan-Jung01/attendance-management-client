import React, { useEffect, useState } from "react";
import "../css/adminUser.css";
import AdminContainer from "../components/AdminContainer";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";

import ShowStatusModal from "../components/modal/userManagement/ShowStatusModal";
import EditBreakStatusModal from "../components/modal/leaveStatus/EditBreakStatusModal";

const AdminLeave = () => {
  const [showStatusModalOpen, setShowStatusModalOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [tableValue, setTableValue] = useState();
  const [editBreakStatusModalOpen, setEditBreakStatusModalOpen] = useState(false);

  const API_URL = "http://localhost:3003";
  const [users, setUsers] = useState([]);

  const handleOnCellClick = (params) => {
    setTableValue(params);
    console.log(params.row);
    setEditBreakStatusModalOpen(true);
  };

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
      headerName: "신청일",
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
      field: "start_date",
      headerName: "시작일",
      type: "number",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "end_date",
      headerName: "종료일",
      type: "number",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reason",
      headerName: "사유",
      type: "number",
      flex: 3,
      align: "center",
      headerAlign: "center",
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
            deleteBreak(params.row);
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "상태",
      flex: 3,
      align: "center",
      headerAlign: "center",
    },
  ];

  const deleteBreak = async (selectedTableValue) => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer) {
      await axios.delete(`${API_URL}/user/break/${selectedTableValue.id}`).then(alert("삭제되었습니다"));
      setDialogValue(true);
    } else {
      return;
    }
  };

  const filtering = users.filter((val) => {
    if (searchWord === "") {
      return users;
    } else if (val.user_name.toLowerCase().includes(searchWord.toLowerCase())) {
      return searchWord;
    }
  });

  useEffect(() => {
    axios.get(`${API_URL}/user/break`).then(async (res) => {
      setUsers(res?.data);
    });
  }, [dialogValue]);

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
          <div>총 {filtering.length}명</div>
          <input
            className="input"
            type={"text"}
            placeholder="이름을 검색해주세요"
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
          onCellClick={handleOnCellClick}
        />
      </Box>
      <EditBreakStatusModal
        editBreakStatusModalOpen={editBreakStatusModalOpen}
        setEditBreakStatusModalOpen={setEditBreakStatusModalOpen}
        tableValue={tableValue}
      />
    </AdminContainer>
  );
};

export default AdminLeave;
