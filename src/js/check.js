export function checkUserLogin() {
  let user = localStorage.getItem("user");
  if (user) {
    return user;
  } else {
    return null;
  }
}
