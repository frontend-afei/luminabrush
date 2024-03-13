export const useCurrentTeamIdCookie = () => {
  const expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() + 30);

  const teamId = useCookie(CURRENT_TEAM_ID_COOKIE, {
    path: "/",
    expires: expiresDate,
  });

  return teamId;
};
