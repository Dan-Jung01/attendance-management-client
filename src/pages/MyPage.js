import React from "react";
import Container from "../components/Container";
import WorkTime from "../components/workTime/WorkTime";
import Leave from "../components/leave/Leave";

const MyPage = ({ userName, userId }) => {
  return (
    // <Container>
    <>
      <WorkTime userName={userName} userId={userId} />
      <Leave userName={userName} userId={userId} />
      {/* <State /> */}
      {/* </Container> */}
    </>
  );
};

export default MyPage;
