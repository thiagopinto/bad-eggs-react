export const fetchWrapper = (options) => {
  const optionsDefault = {
    urlBase: null,
    interceptor: null,
  };

  const access_token = localStorage.getItem("access_token");
  let isAutenticated = false;

  const opt = { ...optionsDefault, ...options };

  const { urlBase, interceptor } = opt;

  const handleResponse = (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      
      if (!response.ok) {
        if (interceptor !== null) {
          interceptor(response);
        }
        const error = (data && data.detail) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  };

  function request(method) {
    return async (url, body) => {
      const requestOptions = {
        method,
      };
      if (url != null) {
        url = urlBase + url;
      }
      requestOptions.headers = {
        mode: "cors",
        // "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      };
      if (access_token != null) {
        isAutenticated = true;
        requestOptions.headers.Authorization = `Bearer ${access_token}`;
      }

      if (body) {
        if (body instanceof FormData) {
          // requestOptions.headers["Content-Type"] = "multipart/form-data";
          requestOptions.body = body;
        } else {
          requestOptions.headers["Content-Type"] = "application/json";
          requestOptions.body = JSON.stringify(body);
        }
        
      }
        
      return await fetch(url, requestOptions).then(handleResponse);
    };
  }

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
    isAutenticated,
  };
};
