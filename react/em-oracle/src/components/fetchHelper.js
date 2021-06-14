//export const fetchFelper = { fetchData };

//const url = "https://www.openligadb.de/api/getmatchdata/bl1"; //bundesliga 1
//const url = "https://www.openligadb.de/api/getmatchdata/em20"; //europa meisterschaft 21 | fetching current

export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  return await response.json().then((data) => {
    localStorage.setItem(url, JSON.stringify(data));
    return data;
  });
};

export const fetchCountries = async () => {
  const urls = [
    "https://www.openligadb.de/api/getavailableteams/em2016/2016",
    "https://www.openligadb.de/api/getavailableteams/em20/2020",
  ];
  const teamsData = await Promise.all(
    urls.map(async (url) => {
      let data = await fetchData(url).then((data) => data);
      return data.filter((team) => team.TeamIconUrl);
    })
  ).then((list) => list.flat().map(team => JSON.stringify(Object.assign({}, { name: team.TeamName, flagUrl: team.TeamIconUrl, points: 1000 }))))
    .then(teams => [...new Set(teams)])
    .then(teams => teams.map(team => JSON.parse(team)));

  localStorage.setItem("countries", JSON.stringify(teamsData));
  return teamsData;
};

export const getGoals = (match, teamNumber) => {
  if (match.MatchResults.length === 0) {
    return "-";
  }
  const latestResultID = match.MatchResults.map((e) => e.ResultTypeID).sort(
    (a, b) => b - a
  )[0];
  const points = match.MatchResults.filter(
    (e) => e.ResultTypeID === latestResultID
  )[0]["PointsTeam" + teamNumber];
  return points === 0 ? 0 : points || "-";
};
