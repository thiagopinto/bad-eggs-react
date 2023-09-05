import { request } from ".";
const url = "/users";

class User {
  create = async (user) => {
    const payload = await request.post(url, user);
    return payload;
  };

  list = async (params) => {
    const q = new URLSearchParams(params);
    const payload = await request.get(`${url}?${q.toString()}`);
    return await payload;
  };

  show = async (id) => {
    const payload = await request.get(`${url}/${id}`);
    return await payload;
  };

  update = async (user) => {
    const payload = await request.put(`${url}/${user.id}`);
    return await payload;
  };

  delete = async (id) => {
    const payload = await request.delete(`${url}/${id}`);
    return await payload;
  };
}

export default new User();
