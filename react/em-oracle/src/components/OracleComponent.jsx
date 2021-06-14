import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { calcGoals } from "./EloRater";

export default function OracleComponent() {
  const [teams, setTeams] = useState(
    JSON.parse(localStorage.getItem("countries")) || []
  );
  const [customTeam1, setCustomTeam1] = useState("");
  const [customTeam2, setCustomTeam2] = useState("");

  useEffect(() => {
    setTeams(JSON.parse(localStorage.getItem("countries")));
  }, [localStorage.getItem("countries")]);

  const renderFlag = (url) => {
    return (
      <>
        <img
          //src="/images/dummywappen.png"
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

  return (
    <>
      <table>
        <tr>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-team1">
                {customTeam1 ? (
                  <>
                    {renderFlag(customTeam1.flagUrl)}
                    {customTeam1.name}
                  </>
                ) : (
                  "team1"
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ overflowY: "scroll", maxHeight: "25vh" }}>
                {teams &&
                  teams.map((team, index) => (
                    <Dropdown.Item
                      as="button"
                      value={index}
                      onClick={(e) => {
                        if (e.currentTarget.value) {
                          let country = JSON.parse(
                            localStorage.getItem("countries")
                          )[parseInt(e.currentTarget.value)];
                          setCustomTeam1(country);
                        }
                      }}
                    >
                      {team.name}
                      {renderFlag(team.flagUrl)}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </th>
          <th>{" - "}</th>
          <th>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-team2">
                {customTeam2 ? (
                  <>
                    {customTeam2.name}
                    {renderFlag(customTeam2.flagUrl)}
                  </>
                ) : (
                  "team2"
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ overflowY: "scroll", maxHeight: "25vh" }}>
                {(JSON.parse(localStorage.getItem("countries")) || []).map(
                  (team, index) => (
                    <Dropdown.Item
                      as="button"
                      value={index}
                      onClick={(e) => {
                        if (e.currentTarget.value) {
                          let country = JSON.parse(
                            localStorage.getItem("countries")
                          )[parseInt(e.currentTarget.value)];
                          setCustomTeam2(country);
                        }
                      }}
                    >
                      {team.name}
                      {renderFlag(team.flagUrl)}
                    </Dropdown.Item>
                  )
                )}
              </Dropdown.Menu>
            </Dropdown>
          </th>
        </tr>
      </table>
      <label for="oracleAnswer">Oracles Answer:</label>
      <div>
        {customTeam1 ? Math.floor(customTeam1.points) : ""}
        {customTeam1 ? renderFlag(customTeam1.flagUrl) : ""}
        {" " +
          (customTeam1 ? customTeam1.name : "") +
            " " +
            (customTeam1 ? calcGoals(customTeam1, customTeam2) : "") +
              " - " +
              (customTeam2 ? calcGoals(customTeam2, customTeam1) : "") +
                " " +
                (customTeam2 ? customTeam2.name : "") +
        " "}
        {customTeam2 ? renderFlag(customTeam2.flagUrl) : ""}
        {customTeam2 ? Math.floor(customTeam2.points) : ""}
      </div>
    </>
  );
}
