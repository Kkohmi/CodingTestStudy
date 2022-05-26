const fs = require("fs");
const path = require("path");
const base = path.resolve(__dirname);
console.log(base);

const main = () => {
  const args = process.argv;
  if (args.length !== 3) throw new Error("입력 오류!");

  const number = args[2];
  fs.exists(`${base}/boj/${number}.js`, (e) => {
    if (e) {
      throw new Error("이미 존재하는 문제!!");
    }
  });

  const stdin = fs.readFileSync(`${base}/template.txt`).toString();
  fs.writeFileSync(`${base}/boj/${number}.js`, stdin, (err) => {
    if (err) throw err;
  });
};

main();
