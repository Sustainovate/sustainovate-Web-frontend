async function handleLogout() {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/login";
}

export default handleLogout;