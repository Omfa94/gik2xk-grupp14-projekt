import { useEffect, useState } from "react";
import UserItemSmall from "../components/UserItemSmall";
import { getAll } from "../sevices/UserService";
function UserList() {

  const[users,setUsers]=useState([])
  useEffect(()=>{
    getAll().then(users=>setUsers(users))
  },[])
  return (
    <ul>
      {users?.length > 0 ? (
        users.map((user) => (
          <li key={`users_${user.id}`}>
            <UserItemSmall user={user} />
          </li>
        ))
      ) : (
        <h3>Kunde inte hämta användare.</h3>
      )}
    </ul>
  );
}

export default UserList;
