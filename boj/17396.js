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

class Heap {
  constructor() {
    this.h = [null];
  }

  heappush(item) {
    this.h.push(item);

    let index = this.h.length - 1;

    while (index > 1) {
      let parent = parseInt(index / 2);
      if (this.h[parent][0] > this.h[index][0]) {
        [this.h[parent], this.h[index]] = [this.h[index], this.h[parent]];
        index = parent;
      } else {
        break;
      }
    }
  }
  heappop() {
    if (this.h.length <= 1) return;
    else if (this.h.length === 2) return this.h.pop();

    const ret = this.h[1];
    const last = this.h.pop();
    this.h[1] = last;

    let index = 1;
    while (index < this.h.length) {
      const [left, right] = [index * 2, index * 2 + 1];
      let min = index;

      if (left < this.h.length && this.h[left][0] < this.h[index][0]) {
        min = left;
      }
      if (right < this.h.length && this.h[right][0] < this.h[min][0]) {
        min = right;
      }
      if (min === index) {
        break;
      }

      [this.h[index], this.h[min]] = [this.h[min], this.h[index]];
      index = min;
    }
    return ret;
  }
}

const dij = (n, board, check) => {
  const heap = new Heap();
  heap.heappush([0, 0]);
  const dist = Array(n).fill(Infinity);
  dist[0] = 0;

  while (heap.h.length > 1) {
    const now = heap.heappop();
    if (now[0] > dist[now[1]]) continue;
    for (let i = 0; i < board[now[1]].length; i++) {
      const next = board[now[1]][i];
      if (check[next[1]] === 1 && next[1] !== n - 1) continue;
      if (dist[next[1]] > now[0] + next[0]) {
        dist[next[1]] = now[0] + next[0];
        heap.heappush([dist[next[1]], next[1]]);
      }
    }
  }
  return dist[n - 1];
};

const solution = () => {
  const [n, m] = input().split(" ").map(Number);
  const check = input().split(" ").map(Number);
  const board = Array.from({ length: n }, () => []);

  for (let i = 0; i < m; i++) {
    const [a, b, t] = input().split(" ").map(Number);
    board[a].push([t, b]);
    board[b].push([t, a]);
  }

  const ans = dij(n, board, check);
  if (ans === Infinity) {
    console.log(-1);
  } else {
    console.log(ans);
  }
};

solution();
