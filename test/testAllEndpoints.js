const createTeamTest = require('./createTeamTest');
const createTournmanetTest = require('./createTournamentTest');
const createPlayerTest = require('./createPlayerTest');
const createMatchesTest = require('./createMatchesTest.js');
const createFixtureTest = require('./generateFixtureTest');

const serverUrl = 'http://localhost:3000';

async function main(){

    await createTeamTest(serverUrl)
    await createTournmanetTest(serverUrl);
    await createFixtureTest(serverUrl);
    await createMatchesTest(serverUrl);
    await createPlayerTest(serverUrl);
}

main()