import { checkResponse } from "./api";
const baseUrl = "http://localhost:3001";
const baseHeaders = { "Content-Type": "application/json" };

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

function signUp({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email,
      password,
      name,
      avatar,
    }),
  }).then(checkResponse);
}

export { signUp, signIn };
