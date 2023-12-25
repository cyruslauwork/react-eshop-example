// import React from "react";

// interface Book {
//   id: string;
//   title: string;
//   isBestSeller: boolean;
// }

// const book1: Book = {
//   id: "b001",
//   title: "To Kill a Mockingbird",
//   isBestSeller: true,
// };

// const book2: Book = {
//   id: "b002",
//   title: "1984",
//   isBestSeller: false,
// };

// const book3: Book = {
//   id: "b003",
//   title: "The Great Gatsby",
//   isBestSeller: false,
// };

// // const Library: React.FC = function () {
// //   return (
// //     <div>
// //       <MyBook {...book1} />
// //       <MyBook {...book2} />
// //       <MyBook {...book3} />
// //     </div>
// //   );
// // };

// const MyBook: React.FC<Book> = function ({ id, title, isBestSeller }) {
//   return (
//     <>
//       <p>Book Title: {title}</p>
//       <p>Is Best Seller?: {isBestSeller ? "Yes" : "No"}</p>
//     </>
//   );
// };

// const bookArray = [book1, book2, book3];

// const Books: React.FC = function () {
//   function getBook(book) {
//     return <MyBook {...book} />;
//   }

//   return (
//     <div>
//       {bookArray.map((book) => {
//         return <div key={book.id}>{getBook(book)}</div>;
//       })}
//     </div>
//   );
// };

// export default Books;

// // export default Library;

// import React, { useState } from "react";

// const CircleArea: React.FC = function () {
//   const [r, setR] = useState(0);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setR(value);
//   };

//   return (
//     <div>
//       <p>
//         {" "}
//         radius:{" "}
//         <input type="number" name="r" value={r} onChange={handleChange} />{" "}
//       </p>
//       <p> The circle area with radius of r is {r}. </p>
//     </div>
//   );
// };

// export default CircleArea;

// import React, { useState, CSSProperties } from "react";

// const blue: CSSProperties = {
//   color: "blue",
// };
// const fifthteen: CSSProperties = {
//   color: "yellow",
//   backgroundColor: "blue",
// };

// const Click: React.FC = function () {
//   const [click, setClick] = useState(0);

//   const handle = () => {
//     setClick(click + 1);
//   };

//   return (
//     <div>
//       <p style={click == 15 ? fifthteen : blue}>Welcome Everyone!</p>
//       <p> You clicked {click} times. </p>
//       <p>
//         <div onClick={handle}>Click me</div>
//       </p>
//     </div>
//   );
// };

// export default Click;
