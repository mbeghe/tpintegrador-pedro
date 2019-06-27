const createTeamTest = require('./createTeamTest');

const serverUrl = 'http://127.0.0.1:8080/api';

async function main(){
    await createTeamTest(serverUrl)
}

main()