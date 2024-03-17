import {Link} from "react-router-dom"

function UserItemSmall({ user }) {
  return (
    <>
      {/* om man vill lägga till bild på användaren.  */}
      {/* <img src={user.imageUrl} alt="" /> */}
      

      <h4>
        {user.firstName}{user.lastName} 
      </h4>
      {/* man kan skippa Link om man vill! */}
      <Link to={`users/${user.id}`}>
      <p>E-post:{user.email}</p>
      </Link>

    </>
  );
}

export default UserItemSmall;
