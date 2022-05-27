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

const solution = () => {
  const [n, m, r] = input().split(" ").map(Number);
  const itemCnt = input().split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < r; i++) {
    const [a, b, l] = input().split(" ").map(Number);
    graph[a].push([l, b]);
    graph[b].push([l, a]);
  }

  const dij = (start) => {
    const h = new Heap();
    h.heappush([0, start]);
    const dist = Array(n + 1).fill(Infinity);
    dist[start] = 0;

    while (h.h.length > 1) {
      const [total, now] = h.heappop();
      if (total > dist[now]) continue;
      for (let i = 0; i < graph[now].length; i++) {
        const [cost, next_] = graph[now][i];
        if (dist[next_] > total + cost) {
          dist[next_] = total + cost;
          h.heappush([total + cost, next_]);
        }
      }
    }
    return dist.slice(1);
  };

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    const dist = dij(i);
    let temp = 0;
    for (let j = 0; j < n; j++) {
      if (dist[j] <= m) {
        temp += itemCnt[j];
      }
    }
    ans = Math.max(ans, temp);
  }
  console.log(ans);
};
solution();
