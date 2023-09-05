import { request } from ".";
const url = "/ovitrampas/images";

class Image {
  create = async (image) => {
    const payload = await request.post(url, image);
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

  update = async (image) => {
    const id = image.id;
    delete image.id;

    const payload = await request.put(`${url}/${id}`, image);
    return await payload;
  };

  delete = async (id) => {
    const payload = await request.delete(`${url}/${id}`);
    return await payload;
  };
}

export default new Image();
