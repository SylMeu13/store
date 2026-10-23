export function baseRequest(uri, method = "GET", body = undefined) {
  return fetch(uri, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => {
    if (res.ok) return res.json();
    else
      return res.text().then((text) => {
        throw text;
      });
  });
}
