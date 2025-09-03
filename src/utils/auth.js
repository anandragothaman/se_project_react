const baseUrl = "http://localhost:3001";
const header = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

function signUp({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  }).then(checkResponse);
}

export { signUp, signIn };
