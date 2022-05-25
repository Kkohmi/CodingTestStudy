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

const recur = (depth, index, arr, path, comb) => {
  if (depth <= 0) {
    comb.push(path);
    return;
  }

  for (let i = index; i < arr.length; i++) {
    recur(depth - 1, i + 1, arr, [...path, arr[i]], comb);
  }
};

const bfs = (board, v, n) => {
  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];
  const q = Array.from({ length: v.length }, (_, index) => [...v[index]]);
  const visited = Array.from({ length: n }, (_, index) => [...board[index]]);
  let count = 0;

  for (let i = 0; i < v.length; i++) {
    const [x, y] = v[i];
    visited[y][x] = 2;
  }

  while (q.length > 0) {
    let len = q.length;
    while (len > 0) {
      const [x, y] = q.shift();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (visited[ny][nx] === 0) {
          visited[ny][nx] = 2;
          q.push([nx, ny]);
        }
      }
      len -= 1;
    }
    count += 1;
  }
  for (let y = 0; y < n; y++) {
    if (visited[y].includes(0)) {
      return Infinity;
    }
  }
  return count - 1;
};

const solution = () => {
  const [n, m] = input().split(" ").map(Number);
  const board = [];
  const virus = [];
  let ans = Infinity;
  for (let y = 0; y < n; y++) {
    const line = input().split(" ").map(Number);
    for (let x = 0; x < n; x++) {
      if (line[x] === 2) {
        virus.push([x, y]);
        line[x] = 0;
      }
    }
    board.push(line);
  }
  const comb = [];
  recur(m, 0, virus, [], comb);

  for (let i = 0; i < comb.length; i++) {
    ans = Math.min(ans, bfs(board, comb[i], n));
  }
  if (ans === Infinity) {
    console.log(-1);
  } else {
    console.log(ans);
  }
};

solution();
