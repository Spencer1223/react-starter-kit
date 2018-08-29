import 'whatwg-fetch';
import 'es6-promise';
import { stringify } from 'query-string';

// export function get(url, method, params) {
//   // let header = {
//   //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//   //   //"accesstoken": token //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
//   // };

//   if (method === 'post') {
//     const defaults = {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//       method,
//       body: stringify(params)
//     }
//   } else {
//     const defaults = {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//       method,
//     }
//   }

//   console.log('request url:',url, params); //打印请求参数
//   return new Promise(function(resolve, reject){
//     fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//       method,
//     }).then((response) => response.json())
//     .then((responseData) => {
//       console.log('res:',url,responseData); //网络请求成功返回的数据
//       resolve(responseData);
//     })
//     .catch((err) => {
//       console.log('err:',url, err); //网络请求失败返回的数据
//       reject(err);
//     })
//   })
// }


const _fetch = (requestPromise, timeout) => {
  let timeoutAction = null;
  const timerPromise = new Promise((resolve, reject) => {
    timeoutAction = () => {
      reject('请求超时');
    }
  })
  setTimeout(()=>{
    timeoutAction()
  }, timeout)
  return Promise.race([requestPromise,timerPromise]);
}

const post = (params) => {
  const { url,body } = params;
  const jsonBody = stringify(params.body)
  const myFetch = fetch(url,{
      method: 'post',
      headers:{
          "Accept": "application/json",
          "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
      },
      body:jsonBody,
 })
 return new Promise((resolve, reject) => {
      _fetch(myFetch, 30000)
      .then(response => {
          return response.json();
      })
      .then(responseData=>{
          resolve(responseData)
      })
      .catch(error=>{
          reject(error);
       });
  });
}

const get = (params) => {
  const { url } = params;
  const myFetch = fetch(url)
 return new Promise((resolve, reject) => {
      _fetch(myFetch, 30000)
      .then(response => {
          return response.json();
      })
      .then(responseData=>{
          resolve(responseData)
      })
      .catch(error=>{
          reject(error);
       });
  });
}

const asyncGet = (params) => {
  const { url } = params;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(responseData=>{
        resolve(responseData)
    })
    .catch(error=>{
        reject(error);
     });
  });
};

export default {get, post, asyncGet};