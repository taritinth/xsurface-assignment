import axios from "@utils/axios";

function getParams(options) {
  if (!options) return;

  let params = [];
  Object.entries(options).forEach(([key, value]) =>
    params.push(`${key}=${value}`)
  );
  return params.join("&");
}

const methods = {
  async addProduct(data) {
    const { data: response } = await axios.post(`/api/v1/products`, {
      data,
    });
    return response.data;
  },
  async getProducts(options = {}) {
    const params = getParams(options);
    const { data: response } = await axios.get(`/api/v1/products/?${params}`);
    return response.data.results;
  },
  async getProductByID(id) {
    const { data: response } = await axios.get(`/api/v1/products/${id}`);
    return response.data;
  },
};

export default { ...methods };
