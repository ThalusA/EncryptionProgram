const readline = require('readline');
const fs = require('fs');
const dictionaryencrypt = JSON.parse(fs.readFileSync('./dictionaryencrypt.json'));
const dictionarydecrypt = JSON.parse(fs.readFileSync('./dictionarydecrypt.json'));
const xor = require('bitwise-xor');

var stringtoencrypt = "";
var stringencrypted = [];
var methodofencryption = "";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What method of encryption/decryption do you want to use ?\n1: Dictionary Basic Encryption (DBED)\n2: Dictionary Basic Decryption (DBED)\n3: Nesulah Encryption (Nesulah)\n4: Nesulah Decryption (Nesulah)\n', (answer) => {
    if (answer != 1 && answer != 2 && answer != 3 && answer != 4) {
        console.log("This isn't a proper index number of encryption");
        process.exit();
        reject();
    } else {
        methodofencryption = answer;
        rl.close();
        const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl2.question('What message do you want to encrypt/decrypt ?\n', (answer2) => {
            stringtoencrypt = answer2;
            rl2.close();
            if (methodofencryption == 1) {
                encryptDictionary();
            }
            if (methodofencryption == 2) {
                decryptDictionary();
            }
            if (methodofencryption == 3) {
                const rl3 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl3.question('Which key do you want for encrypting your message ?\n', (answer3) => {
                    rl3.close();
                    NesulahEncrypt(answer3);
                });
            }
            if (methodofencryption == 4) {
                    const rl3 = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl3.question('Which key did you use for encrypting your message ?\n', (answer3) => {
                    rl3.close();
                    NesulahDecrypt(answer3);
                });   
            }
        });
    }
});


function encryptDictionary() {
    var stringtoshow = '';
    for (var char in Array.from(stringtoencrypt)) {
        if (dictionaryencrypt[Array.from(stringtoencrypt)[char].toUpperCase()] != undefined) {
            stringtoshow = stringtoshow + dictionaryencrypt[Array.from(stringtoencrypt)[char].toUpperCase()] + ' ';
        } else {
            stringtoshow = stringtoshow + dictionaryencrypt[" "] + ' ';
        }
    }
    console.log(stringtoencrypt + " => " + stringtoshow);
}

function decryptDictionary(){
    var stringtoshow = '';
    for (var char in stringtoencrypt.split(" ")) {
        if (dictionarydecrypt[stringtoencrypt.split(" ")[char]] != undefined) {
            stringtoshow = stringtoshow + dictionarydecrypt[stringtoencrypt.split(" ")[char]];
        } else {
            console.log("This isn't a thing encrypted by DBED or maybe you missed the space between each object");
            process.exit();
        }
    }
    console.log(stringtoencrypt + " => " + stringtoshow);
}

function NesulahEncrypt(encryptionkey){
    console.log(stringtoencrypt + " => " + Buffer.from(xor(Buffer.from(Buffer.from(stringtoencrypt).toString('utf-8')).toString('binary'), Buffer.from(Buffer.from(encryptionkey).toString('utf-8')).toString('binary'))).toString('hex'));
}

function NesulahDecrypt(encryptionkey) {
    console.log(stringtoencrypt + " => " + Buffer.from(xor(Buffer.from(stringtoencrypt).toString('binary'), Buffer.from(Buffer.from(encryptionkey).toString('utf-8')).toString('binary'))).toString('utf-8'));
}
