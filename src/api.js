// src/api.js
const BASE_URL = process.env.REACT_APP_API_URL;
export default BASE_URL;

export const getBooks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createBook = async (book) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const updateBook = async (id, book) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
