const axios = require("axios");
const csv = require("@fast-csv/parse");
const datefns = require("date-fns");
const leagues = require("./leagueTools").leagues;
const pad = require("just-left-pad");

console.log("\n");

// prediction converting engine
let getPredictionCSV = async (league) => {
  let response = await axios.get(league.url);
  let data = response.data;
  let todayGames = [];
  csv
    .parseString(data, { headers: true })
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      /* Selecting appropriate data */
      const todayDate = datefns.format(new Date(Date.now()), "yyyy-MM-dd");

      if (row.date === todayDate) {
        todayGames.push(league.extract(row));
      }
    })
    .on("end", () => {
      /* Printing the data */
      console.log("*".repeat(20));
      console.log(league.name);
      const paddedString = pad("-".repeat(70), 80);
      for (let game of todayGames) {
        const firstTeam = pad(game.team1, 30);
        const secondTeam = pad(game.team2, 30);

        console.log(
          `${firstTeam} (${game.team1Line.toPrecision(
            4
          )})${secondTeam} (${game.team2Line.toPrecision(4)})`
        );
        console.log(paddedString);
      }
      console.log();
    });
  return data;
};

/* running the function on all the leagues */
for (let betLeague of leagues) {
  getPredictionCSV(betLeague);
}
