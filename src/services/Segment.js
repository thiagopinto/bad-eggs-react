import { request } from ".";
const url = "/ovitrampas/segments/";

class Segment {
  create = async (segment) => {
    const payload = await request.post(url, segment);
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

  update = async (segment) => {
    const id = segment.id;
    delete segment.id;

    const payload = await request.put(`${url}${id}`, segment);
    return await payload;
  };

  delete = async (id) => {
    const payload = await request.delete(`${url}${id}`);
    return await payload;
  };
}

export default new Segment();
