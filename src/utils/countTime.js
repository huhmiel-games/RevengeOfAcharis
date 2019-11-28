export default (e) => {
  const secondTimestamp = new Date().getTime();
  const result = secondTimestamp - e;
  let elapsedTime = localStorage.getItem('time');
  elapsedTime = JSON.parse(elapsedTime);
  localStorage.setItem('time', elapsedTime + result);
  return new Date().getTime();
};
