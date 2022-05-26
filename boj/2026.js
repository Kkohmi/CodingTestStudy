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

const check = (graph, target, arr) => {
  for (let node of arr) {
    if (!graph[node].includes(target)) {
      return false;
    }
  }
  return true;
};

const solution = () => {
  const [k, n, f] = input().split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(0);
  let ans = null;

  for (let i = 0; i < f; i++) {
    const [a, b] = input().split(" ").map(Number);
    if (!graph[a].includes(b)) graph[a].push(b);
    if (!graph[b].includes(a)) graph[b].push(a);
  }

  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => a - b);
  }

  const dfs = (depth, path, now) => {
    if (ans) return;

    if (depth >= k) {
      ans = path;
      return;
    }

    for (let next_ of graph[now]) {
      if (visited[next_] === 0 && graph[next_].length >= k - 1) {
        if (check(graph, next_, path)) {
          visited[next_] = 1;
          dfs(depth + 1, [...path, next_], next_);
          visited[next_] = 0;
        }
      }
    }
  };

  for (let i = 1; i <= n; i++) {
    visited[i] = 1;
    dfs(1, [i], i);
    visited[i] = 0;
  }

  console.log(ans ? ans.join("\n") : -1);
};
solution();
