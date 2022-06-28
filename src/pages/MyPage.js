import React from "react";
import WorkTime from "../components/workTime/WorkTime";
import Leave from "../components/leave/Leave";

const MyPage = ({ userName, userId }) => {
  return (
    <>
      <WorkTime userName={userName} userId={userId} />
      <Leave userName={userName} userId={userId} />
    </>
  );
};

export default MyPage;
