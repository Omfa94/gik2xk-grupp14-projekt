function UserItemSmall({ user }) {
  return (
    <>
      {/* om man vill lägga till bild på användaren.  */}
      {/* <img src={user.imageUrl} alt="" /> */}
      <h4>
        {user.firstName}{user.lastName} <p>E-post:{user.email}</p>
      </h4>
    </>
  );
}

export default UserItemSmall;
