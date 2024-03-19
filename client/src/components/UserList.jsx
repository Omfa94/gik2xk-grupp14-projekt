import { useEffect, useState } from "react";
import UserItemSmall from "../components/UserItemSmall";
import { getAll } from "../sevices/UserService";
function UserList() {
  // const users = [
  //   {
  //     id: 1,
  //     firstName: "Dimo",
  //     lastName: "Faroughi",
  //     email: "dimo@du.se",
  //     password: "HEHEHEHEHEH",
  //     createdAt: "2024-03-14T14:10:47.000Z",
  //     updatedAt: "2024-03-14T14:10:47.000Z",
  //   },
  //   {
  //     id: 2,
  //     firstName: "William",
  //     lastName: "Trustler",
  //     email: "william@du.se",
  //     password: "hohohoho",
  //     createdAt: "2024-03-17T19:05:50.000Z",
  //     updatedAt: "2024-03-17T19:05:50.000Z",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Mutaz",
  //     lastName: "Yateem",
  //     email: "Mutaz@du.se",
  //     password: "herherher",
  //     createdAt: "2024-03-17T19:06:26.000Z",
  //     updatedAt: "2024-03-17T19:06:26.000Z",
  //   },
  // ];

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
