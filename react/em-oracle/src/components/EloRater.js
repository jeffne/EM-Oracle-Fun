/**
 * Calculates the winning-chance of a team with rating1 against a team with rating2.
 * Used algorithm: "elo rating"
 * @param {*} rating1 : Rating of the Team 1.
 * @param {*} rating2 : Rating of the Team 2.
 * @returns : winningchance in decimal-value from 0.0 to 1.0 against Opponent Team with rating2.
 */
export const calcWinningChance = (rating1, rating2) => {
  let chance = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400));
  return chance;
};

/**
 * Calculates the new points of the Team  with rating1 according to the opponent Team with rating2 and the result of the game.
 * Used algorithm: "elo rating"
 * @param {*} rating1: Rating points of Team 1.
 * @param {*} rating2: Rating points of Team 2(Opponent).
 * @param {*} p1_result: Result is either; 1=win, 0=lose, 0.5=draw.
 * @returns : The new calculated points of Team 1.
 */
export const calcNewPoints = (rating1, rating2, p1_result) => {
  let winChance = calcWinningChance(rating1, rating2);
  let result = rating1 + 30 * (p1_result - winChance);
  return result;
};

export const calcGoals = (team1, team2) => {
  if (!(team1 && team2)) { return -1}
      const diff = Math.abs(team1.points - team2.points);
      const pWin = calcWinningChance(team1.points, team2.points);
      return Math.floor((pWin * diff) / 10);
}