import config from "../config";

const parseJson = async res => {
  try {
    let data = await res.json();
    return data;
  } catch (e) {
    throw new Error("服务器错误");
  }
};

export const obj2query = obj => {
  let queryString = "";
  for (let [key, value] of Object.entries(obj)) {
    queryString += `&${key}=${encodeURIComponent(value)}`;
  }
  return queryString.substr(1);
};

export const request = (url, options) => {
  url = `${config.apiRoot}${url}`;
  return fetch(url, options).then(parseJson);
};

export const getPosts = datas => {
  const { query } = datas;
  return request(`posts/?${obj2query(query)}`);
};

export const getAttachments = datas => {
  const { query } = datas;
  return request(`attachments/?${obj2query(query)}`);
};

export const getWeather = datas => {
  return request(`weather`);
};
