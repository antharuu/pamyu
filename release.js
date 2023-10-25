import pkg from './package.json' assert {type: 'json'};
import fs from 'node:fs';
import {exec} from 'child_process';
import release from "release-it";

const isAlpha = true;

const allowedArgs = ['major', 'minor', 'patch'];

const args = process.argv.slice(2);
const options = args.reduce((acc, arg) => {
    if (allowedArgs.includes(arg)) {
        acc[arg] = true;
    }
    return acc;
}, {});

allowedArgs.forEach(arg => {
    if (options[arg] === undefined) {
        options[arg] = false;
    }
});

const version = pkg.version;
const versionParts = version.split('.').map(part => parseInt(part, 10));

if (options.major) {
    versionParts[0] += 1;
    versionParts[1] = 0;
    versionParts[2] = 0;
} else if (options.minor) {
    versionParts[1] += 1;
    versionParts[2] = 0;
} else if (options.patch) {
    versionParts[2] += 1;
}

function upTauriVersion(newVersion) {
    const tauriConf = "./src-tauri/tauri.conf.json";
    const data = fs.readFileSync(tauriConf, "utf8");
    const jsonData = JSON.parse(data);
    jsonData.package.version = newVersion;
    const newJson = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(tauriConf, newJson, "utf8");
}

const newVersion = versionParts.join('.');
upTauriVersion(newVersion);

function tauriBuild() {
    exec("pnpm tauri build", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    });
}

tauriBuild();
const releaseName = isAlpha ? `Alpha ${versionParts[2]}` : `Version ${versionParts[0]}.${versionParts[1]}`;
const opts = {
    increment: newVersion, releaseName: releaseName,
}

if (isAlpha) {
    opts.preRelease = releaseName;
}

release({
    ...opts,
    ci: true,
}).then(output => {
    console.log(`🚀 Release : ${newVersion}`);
});