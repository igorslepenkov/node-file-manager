import readline from "readline";
import os from "os";
import path from "path";
import { getInputValue } from "./utils/getInputValue.js";
import { up, cd, list } from "./navigation/navigation.js";
import { read, create, rename, copy, move, remove } from "./fs/fs-exports.js";

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
      if (await up(currentDirectory)) {
        currentDirectory = await up(currentDirectory);
      }
      displayCurrentDirectory();
    } else if (userInput.startsWith("cd")) {
      const newPath = userInput.match(/^cd\s(.+)/)[1];
      if (await cd(currentDirectory, newPath, true)) {
        currentDirectory = await cd(currentDirectory, newPath);
      }
      displayCurrentDirectory();
    } else if (userInput === "list") {
      list(currentDirectory);
      displayCurrentDirectory();
    } else if (userInput.startsWith("cat")) {
      const pathToFile = await cd(
        currentDirectory,
        getInputValue(userInput, "cat"),
        true
      );
      read(pathToFile);
      displayCurrentDirectory();
    } else if (userInput.startsWith("add")) {
      const pathToFile = await cd(
        currentDirectory,
        getInputValue(userInput, "add")
      );
      if (path.extname(pathToFile)) {
        create(pathToFile);
      } else {
        console.log(new Error("Invalid input"));
      }
    } else if (userInput.startsWith("rn")) {
      const oldPath = await cd(
        currentDirectory,
        getInputValue(userInput, "rn")[0]
      );
      const newPath = path.join(
        path.dirname(oldPath),
        getInputValue(userInput, "rn")[1]
      );
      rename(oldPath, newPath);
    } else if (userInput.startsWith("cp")) {
      const oldPath = await cd(
        currentDirectory,
        getInputValue(userInput, "cp")[0]
      );
      const newPath = await cd(
        currentDirectory,
        getInputValue(userInput, "cp")[1]
      );
      copy(oldPath, newPath, true);
    } else if (userInput.startsWith("mv")) {
      const oldPath = await cd(
        currentDirectory,
        getInputValue(userInput, "mv")[0]
      );
      const newPath = await cd(
        currentDirectory,
        getInputValue(userInput, "mv")[1]
      );
      move(oldPath, newPath);
    } else if (userInput.startsWith("rm")) {
      const pathToFile = await cd(
        currentDirectory,
        getInputValue(userInput, "rm")
      );
      remove(pathToFile);
    } else if (userInput === "os --EOL") {
      console.log(JSON.stringify(os.EOL));
    } else if (userInput === "os --cpus") {
      console.log(os.cpus().length);
      os.cpus().forEach((cpu) =>
        console.log(cpu.model + "\n", `${cpu.speed / 1000} GHz`)
      );
    } else if (userInput === "os --homedir") {
      console.log(os.homedir());
    } else if (userInput === "os --username") {
      console.log(os.userInfo().username);
    } else if (userInput === "os --architecture") {
      console.log(os.arch());
    }
  });
}

handleOperations();
