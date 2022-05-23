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
  const [n, k] = input().split(" ").map(Number);
  const q = [[n, 0]];
  const visited = Array(100001).fill(0);
  const dist = Array(100001).fill(0);
  const ans = [];
  let prev;

  while (q.length > 0) {
    const [now, count] = q.shift();
    if (now === k) {
      prev = now;
      break;
    }
    const range = [now + 1, now - 1, now * 2];
    for (let i = 0; i < 3; i++) {
      const next_ = range[i];
      if (next_ >= 0 && next_ <= 100000 && dist[next_] === 0) {
        visited[next_] = now;
        dist[next_] = count + 1;
        q.push([next_, count + 1]);
      }
    }
  }
  for (let i = 0; i <= dist[k]; i++) {
    ans.push(prev);
    prev = visited[prev];
  }
  console.log(dist[k]);
  console.log(ans.reverse().join(" "));
};

solution();
