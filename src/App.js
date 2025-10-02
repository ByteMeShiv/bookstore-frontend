import { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "./api";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data.data || []);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (!title || !author) return alert("Enter title and author");
    await createBook({ title, author });
    setTitle("");
    setAuthor("");
    fetchBooks();
  };

  const handleUpdateBook = async (id) => {
    const newTitle = prompt("New title:");
    const newAuthor = prompt("New author:");
    if (!newTitle && !newAuthor) return;
    await updateBook(id, { title: newTitle || undefined, author: newAuthor || undefined });
    fetchBooks();
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      fetchBooks();
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>BookStore</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{book.title}</strong> by {book.author}{" "}
            <button onClick={() => handleUpdateBook(book.id)}>Edit</button>{" "}
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
