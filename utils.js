async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function genRandomEmail(count) {
  const MAX = 1000000000;
  let arr = [];
  let n = count || 1000;
  while(n-- > 0) {
    let randomQQ = Math.floor(Math.max(100000000, Math.random() * MAX));
    arr.push(randomQQ);
  }
  arr = Array.from(new Set(arr)).map(item => {
    return item += '@qq.com'; 
  });
  return arr;
}

module.exports = {
  sleep,
  genRandomEmail
}