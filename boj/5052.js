const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const stdin = fs
  .readFileSync(filePath, "utf8")
  .toString()
  .split("\n")
  .map((line) => line.trim());

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const t = Number(input());

for (let i = 0; i < t; i++) {
  const n = Number(input());
  const arr = [];
  let check = true;

  for (let j = 0; j < n; j++) {
    const number = input();
    arr.push(number);
  }

  arr.sort();

  for (let k = 0; k < n - 1; k++) {
    if (arr[k + 1].startsWith(arr[k])) {
      check = false;
    }
  }
  console.log(check ? "YES" : "NO");
}
