import Request from '../core/request';

export const getNewSong = () => {
  //return Request.post(`${baseApiUrl}management/repurchasestat/statistics.do`, data);
  //return get({url: '/kugou/?json=true'})
  // return post({
  //   url: '/repurchase/activity/phoneEntrance.do',
  //   body: data
  // })
  return Request.get({
    url: '/kugou/?json=true'
  })
};

export const getSongPlay = () => {
  return Request.get({
    url: '/kugou/plist/index&json=true'
  })
};

export const getRankList = () => {
  return Request.get({
    url: '/kugou/rank/list&json=true'
  })
};

export const getSingerCategory = () => {
  return Request.get({
    url: '/kugou/singer/class&json=true'
  })
};

export const getSingerPlayList = (data) => {
  return Request.get({
    url: `/kugou/plist/list/${data}?json=true`
  })
}

export const getSongDetail = (id) => {
  return Request.get({
    url: `/kugou/app/i/getSongInfo.php/?cmd=playInfo&hash=${id}`
  })
}