const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const stdin = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((line) => line.trim());

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [n, m, l] = input().split(" ").map(Number);
  const arr = [...new Set(input().split(" ").map(Number).concat([0, l]))];
  arr.sort((a, b) => a - b);
  let [left, right] = [1, l];

  while (left <= right) {
    const mid = parseInt((left + right) / 2);

    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      count += parseInt((arr[i + 1] - arr[i] - 1) / mid);
    }
    if (count > m) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  console.log(left);
};
solution();
