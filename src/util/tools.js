// 时间转换秒数
const formatTime = (timeTemp) => {
  let m = Math.floor(timeTemp / 60);
  let s = Math.floor(timeTemp % 60);
  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
};

export {
  formatTime
};