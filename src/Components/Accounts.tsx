import { useEffect, useState } from "react";
import TopNav from "./TopNav";

interface AccountInfo {
  id: string;
  name: string;
  username: string;
  email: string;
}

const Accounts = () => {
  const [accountInfo, setAccountInfo] = useState({} as AccountInfo);
  useEffect(() => {
    fetch("http://localhost:3001/api/auth/me", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      res.json().then((json) => {
        setAccountInfo(json);
      });
    });
  });

  return (
    <>
    <TopNav/>
    <div>
      
    </div>
      name: {accountInfo.name} {accountInfo.username} <br />
      email: {accountInfo.email}
    </>
  );
};

export default Accounts;
