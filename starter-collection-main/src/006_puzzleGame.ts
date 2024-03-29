import { waitForKeyPress, waitForUserInput } from "./utils/input/input.utils";
import makeRandomIntLst from "./puzzleGame/initLst";
import logLst from "./puzzleGame/logLst";
import isSolved from "./puzzleGame/isSovled";
import keyCtrl from "./puzzleGame/keyCtrl";

let lst: (number | string)[][] = [];
let lstLen: number = 0;
const blockPosition: { row: number; column: number } = { row: 0, column: 0 };
let count: number = 0;
let time: number = 60;
let timeId: NodeJS.Timeout;

const convertLen = (inputString: string): number => {
  switch (inputString) {
    case "S":
      return 3;
    case "M":
      return 4;
    case "L":
      return 5;
  }
  return 0;
};

const timer = (): void => {
  logLst();
  time--;
  if (time < 0) {
    clearInterval(timeId);
    console.log("time out");
    process.exit();
  }
};

async function main() {
  let condition: boolean = false;
  let inputString: string = "";
  do {
    inputString = await waitForUserInput("SML 중에 선택해주세요");
    inputString = inputString.toLocaleUpperCase();
    condition = inputString === "S" || inputString === "M" || inputString === "L";
  } while (!condition);

  lstLen = convertLen(inputString);
  makeRandomIntLst();
  logLst();
  timeId = setInterval(timer, 1000);

  while (!isSolved()) {
    let keyInput = await waitForKeyPress();
    let keyInputCtrl: boolean = keyInput.ctrl;
    let keyInputName: string = keyInput.name;
    count++;

    if (keyInputCtrl && keyInputName === "c") {
      return;
    }
    keyCtrl(keyInput.ctrl, keyInput.name);
    logLst();
  }
  clearInterval(timeId);
  console.log("Game sovled!");
}
main();

export { lst, lstLen, blockPosition, count, time };
