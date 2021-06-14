import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { calcGoals } from "./EloRater";
import { fetchData, getGoals } from "./fetchHelper";

const DataTable = ({ url, title, localCountries }) => {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem(url)) || []
  );

  useEffect(() => {
    async function fetchIt() {
      setLocalData(await fetchData(url));
    }
    fetchIt();
  }, []);

  const renderFlag = (url) => {
    return (
      <>
        <img
          src={url}
          alt="noFlag"
          style={{
            objectFit: "contain",
            width: "2em",
            height: "auto",
            maxWidth: "100px",
            maxHeight: "25px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "./images/dummywappen.png";
          }}
        />
      </>
    );
  };

  const showTableContent = () => {
    if (!localCountries) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    return (
      <>
        {localData.length !== 0 &&
          localData.map((match) => {
            let team1Local = localCountries.find(
              (country) => match.Team1.TeamName === country.name
            );
            let team2Local = localCountries.find(
              (country) => match.Team2.TeamName === country.name
            );
            return (
              match && (
                <tr>
                  {/* <th>{match.MatchID}</th> */}
                  <th>{match.Team1.TeamGroupName}</th>
                  <th>{match.Team1.TeamName}</th>
                  <th>{renderFlag(match.Team1.TeamIconUrl)}</th>
                  <th
                    style={{
                      color: "lightblue",
                      fontSize: "0.75em",
                      fontStyle: "oblique",
                    }}
                  >
                    {calcGoals(team1Local, team2Local)}
                  </th>
                  <th>{getGoals(match, 1)}</th>
                  <th>-</th>
                  <th>{getGoals(match, 2)}</th>
                  <th
                    style={{
                      color: "lightblue",
                      fontSize: "0.75em",
                      fontStyle: "oblique",
                    }}
                  >
                    {calcGoals(team2Local, team1Local)}
                  </th>
                  <th>{renderFlag(match.Team2.TeamIconUrl)}</th>
                  <th>{match.Team2.TeamName}</th>
                  <th>{match.Team2.TeamGroupName}</th>
                </tr>
              )
            );
          })}
      </>
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      {/* {myTools()} */}
      <Table striped hover responsive="md" variant="dark" size="sm">
        <thead>
          <tr>
            {/* <th>matchId</th> */}
            <th>Group</th>
            <th>team1</th>
            <th>{/*flag*/}</th>
            <th>oracle</th>
            <th>{/*goal*/}</th>
            <th>EndResult</th>
            <th>{/*goal*/}</th>
            <th>oracle</th>
            <th>{/*flag*/}</th>
            <th>team2</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>{showTableContent()}</tbody>
      </Table>
    </div>
  );
};

export default DataTable;
