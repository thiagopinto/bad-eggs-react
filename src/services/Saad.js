import { request } from ".";
const url = "/saads";

class Saad {
  list = async () => {
    const payload = await request.get(`${url}`);
    return await payload;
  };
}

export default new Saad();
