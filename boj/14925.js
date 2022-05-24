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

const solution = () => {
  const [n, m] = input().split(" ").map(Number);
  const board = [];
  let ans = 0;
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 0; i < n; i++) {
    board.push(input().split(" ").map(Number));
  }

  for (let y = 1; y < n + 1; y++) {
    for (let x = 1; x < m + 1; x++) {
      if (board[y - 1][x - 1] === 0) {
        dp[y][x] = Math.min(dp[y - 1][x], dp[y][x - 1], dp[y - 1][x - 1]) + 1;
        ans = Math.max(ans, dp[y][x]);
      }
    }
  }
  console.log(ans);
};
solution();
