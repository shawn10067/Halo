const nbaExtract = (row) => {
  let team1Prob = row.elo_prob1;
  let team2Prob = row.elo_prob2;
  let team1Line;
  let team2Line;
  try {
    team1Line = 1 / Number.parseFloat(team1Prob);
    team2Line = 1 / Number.parseFloat(team2Prob);
  } catch (_) {
    console.log("error");
  }
  return {
    team1: row.team1,
    team1Prob,
    team2: row.team2,
    team2Prob,
    team1Line,
    team2Line,
  };
};

const soccerExtract = (row) => {
  let team1Prob = row.prob1;
  let team2Prob = row.prob2;
  let team1Line;
  let team2Line;
  try {
    team1Line = 1 / Number.parseFloat(team1Prob);
    team2Line = 1 / Number.parseFloat(team2Prob);
  } catch (_) {
    console.log("error");
  }
  return {
    team1: row.team1,
    team1Prob,
    team2: row.team2,
    team2Prob,
    team1Line,
    team2Line,
  };
};

const nhlExtract = (row) => {
  let team1Prob = row.home_team_winprob;
  let team2Prob = row.away_team_winprob;
  let team1Line;
  let team2Line;
  try {
    team1Line = 1 / Number.parseFloat(team1Prob);
    team2Line = 1 / Number.parseFloat(team2Prob);
  } catch (_) {
    console.log("error");
  }
  return {
    team1: row.home_team,
    team1Prob,
    team2: row.away_team,
    team2Prob,
    team1Line,
    team2Line,
  };
};

const notInUse = [];

const leagues = [
  {
    name: "NBA",
    url: "https://projects.fivethirtyeight.com/nba-model/nba_elo.csv",
    extract: nbaExtract,
  },
  {
    name: "NHL",
    url: "https://projects.fivethirtyeight.com/nhl-api/nhl_elo.csv",
    extract: nhlExtract,
  },
  {
    name: "Soccer",
    url: "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv",
    extract: soccerExtract,
  },
];

module.exports = {
  leagues,
};
