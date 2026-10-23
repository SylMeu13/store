import { baseRequest } from "@/utils/baseApi";

const BASE_URI = import.meta.env.VITE_PRODUCTS_BASE_URI;

function request(endpoint = "", method = "GET", body = undefined) {
  return baseRequest(BASE_URI + endpoint, method, body);
}

export function getProducts() {
  return request();
}

export function getProduct(id) {
  return request("/" + id);
}

export function getCategories() {
  return request("/categories");
}

export function getProductsInCategory(category, limit = undefined) {
  return request(`/category/${category}${limit ? `?limit=${limit}` : ""}`);
}

export function editProduct(productId, data) {
  return request("/" + productId, "PUT", data);
}

export function deleteProduct(productId) {
  return request("/" + productId, "DELETE");
}
