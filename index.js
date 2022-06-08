import fs from "fs/promises";
import readline from "readline";
import os from "os";
import path from "path";
import { up, cd, list } from "./src/navigation/navigation.js";

let currentDirectory = os.homedir();
const currentUsername = process.argv[2].match(/^--username=(.+)/)[1];

function displayCurrentDirectory() {
  process.stdout.write(`You are currently in ${currentDirectory}\n`);
}

async function greeting(username) {
  process.stdout.write(`Welcome to the File Manager, ${username}!\n\n`);
  displayCurrentDirectory();
}

async function handleOperations() {
  greeting(currentUsername);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    const userInput = input.trim();
    if (userInput.startsWith("up")) {
      currentDirectory = await up(currentDirectory);
      displayCurrentDirectory();
    } else if (userInput.startsWith("cd")) {
      const newPath = userInput.match(/^cd\s(.+)/)[1];
      currentDirectory = await cd(currentDirectory, newPath);
      displayCurrentDirectory();
    } else if (userInput === "list") {
      list(currentDirectory);
      displayCurrentDirectory();
    }
  });
}

handleOperations();
