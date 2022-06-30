import React, { useEffect, useState } from "react";
import "../css/adminLeave.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import EditBreakStatusModal from "../components/modal/leaveStatus/EditBreakStatusModal";

const AdminLeave = () => {
  const [dialogValue, setDialogValue] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [tableValue, setTableValue] = useState({});
  const [editBreakStatusModalOpen, setEditBreakStatusModalOpen] = useState(false);

  const API_URL = "http://localhost:3003";
  const [users, setUsers] = useState([]);

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
      field: "used_date_cnt",
      headerName: "사용일 수",
      type: "number",
      flex: 1,
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
      flex: 2,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
          className="btn-status"
          style={{ fontSize: 17 }}
          onClick={async () => {
            setEditBreakStatusModalOpen(true);
            setTableValue(params.row);
            setDialogValue(false);
          }}
        >
          {params.row.status}
        </button>
      ),
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
  }, [editBreakStatusModalOpen, dialogValue]);

  return (
    <>
      <Box
        className="admin-leave-container"
        sx={{
          maxHeight: "80%",
          height: "80%",
          width: "80%",
        }}
      >
        <div className="header">
          <div className="title-wrapper">
            <h4 className="title">연차 관리</h4>
            <div>총 {filtering.length}건</div>
          </div>
          <div className="input-wrapper">
            <FaSearch />
            <input
              className="input"
              type={"text"}
              placeholder="이름을 검색해주세요"
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </div>
        </div>
        <DataGrid
          rows={filtering}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25]}
          checkboxSelection={false}
        />
      </Box>
      <EditBreakStatusModal
        editBreakStatusModalOpen={editBreakStatusModalOpen}
        setEditBreakStatusModalOpen={setEditBreakStatusModalOpen}
        tableValue={tableValue}
      />
    </>
  );
};

export default AdminLeave;
