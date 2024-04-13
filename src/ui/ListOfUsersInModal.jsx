export default function ListOfUsersInModal({ users }) {
  console.log(users);
  return <div>{users.map((user) => user.username)}</div>;
}
