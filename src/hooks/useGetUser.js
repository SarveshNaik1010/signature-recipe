export function useGetUser() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return user;
}
