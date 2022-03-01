/* eslint-disable @typescript-eslint/no-use-before-define */
const fs = require('fs');
const childProcessLib = require('child_process');

main();

async function main() {
    const [, , mysqlHost, mysqlPort, mysqlSchema, mysqlPassword] = process.argv;
    fs.writeFileSync(
        'env.json',
        JSON.stringify({
            dialect: mysqlHost ? 'mysql' : 'sqlite',
            mysqlHost,
            mysqlPort: parseInt(mysqlPort, 10),
            mysqlSchema,
            mysqlPassword
        })
    );

    const childProcessRunning = childProcessLib.exec(
        'npx next dev',
        (error) => {
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );

    childProcessRunning.stdout.on('data', (data) => {
        console.log(data);
    });

    childProcessRunning.stderr.on('data', (data) => {
        console.log(data);
    });
}
