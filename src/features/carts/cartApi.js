import { baseRequest } from "@/utils/baseApi";

const BASE_URI = import.meta.env.VITE_CARTS_BASE_URI;

function request(endpoint = "", method = "GET", body = undefined) {
  return baseRequest(BASE_URI + endpoint, method, body);
}

export function getCart() {
  return request("/1");
}

export function addToCart(productId) {
  return request("/1", "PATCH", {
    userId: 1,
    products: [{ productId, quantity: 1 }],
  });
}

export function removeFromCart(productId) {
  return request("/1", "PATCH", {
    userId: 1,
    products: [{ productId, quantity: 0 }],
  });
}

export function setQuantity(productId, quantity) {
  return request("/1", "PATCH", {
    userId: 1,
    products: [{ productId, quantity }],
  });
}
