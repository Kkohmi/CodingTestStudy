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
  const str1 = " " + input();
  const str2 = " " + input();
  const str3 = " " + input();

  const dp = Array.from({ length: str1.length }, () =>
    Array.from({ length: str2.length }, () => Array(str3.length).fill(0))
  );

  for (let z = 1; z < str1.length; z++) {
    for (let y = 1; y < str2.length; y++) {
      for (let x = 1; x < str3.length; x++) {
        if (str1[z] === str2[y] && str1[z] === str3[x]) {
          dp[z][y][x] = dp[z - 1][y - 1][x - 1] + 1;
        } else {
          dp[z][y][x] = Math.max(
            dp[z - 1][y][x],
            dp[z][y - 1][x],
            dp[z][y][x - 1]
          );
        }
      }
    }
  }
  console.log(dp[str1.length - 1][str2.length - 1][str3.length - 1]);
};
solution();
