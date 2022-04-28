import React, { useEffect, useState } from "react";
import "../css/adminUser.css";
import AdminContainer from "../components/AdminContainer";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiPagesLine } from "react-icons/ri";
import EditUserInfoModal from "../components/modal/userManagement/EditUserInfoModal";
import ShowStatusModal from "../components/modal/userManagement/ShowStatusModal";

const AdminUsers = () => {
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [showStatusModalOpen, setShowStatusModalOpen] = useState(false);
  const [tableValue, setTableValue] = useState({});
  const [dialogValue, setDialogValue] = useState(false);
  const [searchWord, setSearchWord] = useState("");

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
      field: "user_name",
      headerName: "이름",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "user_id",
      headerName: "아이디",
      flex: 2,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "전화번호",
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
            setEditUserModalOpen(true);
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
            deleteUser(params.row);
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <RiPagesLine
          className="icon"
          style={{ fontSize: 17 }}
          onClick={async () => {
            setTableValue(params.row);
            setDialogValue(false);
            setShowStatusModalOpen(true);
          }}
        />
      ),
    },
  ];

  const deleteUser = async (selectedTableValue) => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer) {
      await axios.delete(`${API_URL}/user/userInfo/${selectedTableValue.id}`).then(alert("삭제되었습니다"));
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
    axios.get(`${API_URL}/user/userInfo`).then(async (res) => {
      setUsers(res?.data);
    });
  }, [editUserModalOpen, dialogValue]);

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
        />
      </Box>
      <EditUserInfoModal
        editUserModalOpen={editUserModalOpen}
        setEditUserModalOpen={setEditUserModalOpen}
        tableValue={tableValue}
      />
      <ShowStatusModal
        showStatusModalOpen={showStatusModalOpen}
        setShowStatusModalOpen={setShowStatusModalOpen}
        tableValue={tableValue}
      />
    </AdminContainer>
  );
};

export default AdminUsers;
