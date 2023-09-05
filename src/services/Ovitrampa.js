import { request } from ".";
const url = "/ovitrampas";

class Ovitrampa {
  create = async (ovitrampa) => {
    const payload = await request.post(url, ovitrampa);
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

  update = async (ovitrampa) => {
    const id = ovitrampa.id;
    delete ovitrampa.id;
    if (ovitrampa.saad) {
      delete ovitrampa.saad;
    }

    const payload = await request.put(`${url}/${id}`, ovitrampa);
    return await payload;
  };

  delete = async (id) => {
    const payload = await request.delete(`${url}/${id}`);
    return await payload;
  };
}

export default new Ovitrampa();
