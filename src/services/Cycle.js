import { request } from ".";
const url = "/ovitrampas/cycles/";

class Cycle {
  create = async (cycle) => {
    const payload = await request.post(url, cycle);
    return payload;
  };

  list = async (params) => {
    const q = new URLSearchParams(params);
    const payload = await request.get(`${url}?${q.toString()}`);
    return await payload;
  };

  show = async (id) => {
    const payload = await request.get(`${url}${id}`);
    return await payload;
  };

  update = async (cycle) => {
    const id = cycle.id;
    delete cycle.id;

    const payload = await request.put(`${url}${id}`, cycle);
    return await payload;
  };

  delete = async (id) => {
    const payload = await request.delete(`${url}${id}`);
    return await payload;
  };
}

export default new Cycle();
