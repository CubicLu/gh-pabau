require('dotenv-flow').config({path:'hasura'});require('child_process').execSync('npx apollo ' + process.argv.splice(1).join(' '), {stdio: 'inherit'})
