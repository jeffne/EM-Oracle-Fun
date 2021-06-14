import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import DataTable from "./DataTable";
import { calcNewPoints } from "./EloRater";
import { fetchCountries, fetchData, getGoals } from "./fetchHelper";
import OracleComponent from "./OracleComponent";

export const PageContent = ({ em2016Links, em20Links }) => {
  const [matches2016, setMatches2016] = useState([]);
  const [matches2021, setMatches2021] = useState([]);
  useEffect(() => {
    async function matchesEffect() {
      await getMatches();
    }
    matchesEffect();
  }, [localStorage.getItem("countries")]);

  const getMatches = async () => {
    const localCountries =
      JSON.parse(localStorage.getItem("countries")) ||
      (await fetchCountries().then(() =>
        JSON.parse(localStorage.getItem("countries"))
      ));
    localCountries.forEach((country) => (country.points = 1000));

    const result2016 = await Promise.all(
      em2016Links.map(async (e) => await fetchData(e.url).then((e) => e))
    );
    const result2021 = await Promise.all(
      em20Links.map(async (e) => await fetchData(e.url).then((e) => e))
    );
    setMatches2016(result2016);
    setMatches2021(result2021);
    [...result2016, ...result2021].forEach((matchList) =>
      matchList.forEach((match) => {
        calcTeamEloPoints(match, localCountries);
      })
    );
    localStorage.setItem("countries", JSON.stringify(localCountries));
  };

  return (
    <header className="App-header">
      <div></div>
      <Jumbotron className="Oracle-Style" fluid={true}>
        <div>
          <h1>EM 2021 - Oracle</h1>
          <div style={{ fontSize: "0.5em" }}>by Jeff</div>
        </div>
        <OracleComponent />
      </Jumbotron>
      <h1>EM 2021</h1>
      {em20Links.map((e) => (
        <DataTable
          title={e.title}
          url={e.url}
          localCountries={JSON.parse(localStorage.getItem("countries"))}
        />
      ))}

      <h1>HISTORY(used data)</h1>
      {em2016Links.map((e) => (
        <DataTable
          title={e.title}
          url={e.url}
          localCountries={JSON.parse(localStorage.getItem("countries"))}
        />
      ))}
    </header>
  );
};

const calcTeamEloPoints = (match, localCountries) => {
  const team1Name = match.Team1.TeamName;
  const team2Name = match.Team2.TeamName;
  const resultTeam1 = getGoals(match, 1);
  const resultTeam2 = getGoals(match, 2);

  const country1Points = localCountries.find(
    (country) => country.name === team1Name
  ).points;
  const country2Points = localCountries.find(
    (country) => country.name === team2Name
  ).points;
  const gameResultTeam1 =
    resultTeam1 > resultTeam2 ? 1 : resultTeam1 === resultTeam2 ? 0.5 : 0;
  const gameResultTeam2 =
    resultTeam2 > resultTeam1 ? 1 : resultTeam1 === resultTeam2 ? 0.5 : 0;

  const country1NewPoints = calcNewPoints(
    country1Points,
    country2Points,
    gameResultTeam1
  );
  const country2NewPoints = calcNewPoints(
    country2Points,
    country1Points,
    gameResultTeam2
  );

  localCountries[localCountries.findIndex((e) => e.name === team1Name)].points =
    country1NewPoints;
  localCountries[localCountries.findIndex((e) => e.name === team2Name)].points =
    country2NewPoints;
};
