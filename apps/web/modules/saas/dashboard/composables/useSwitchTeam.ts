export const useSwitchTeam = () => {
  const currentTeamId = useCurrentTeamIdCookie();

  const switchTeam = (teamId: string) => {
    currentTeamId.value = teamId;
  };

  return {
    switchTeam,
  };
};
