import React, { useEffect } from "react";
import Filters from "../components/Filters";
import BookTable from "../components/BookTable";
import styles from "./MainPage.module.scss";
import axios from "axios";

const MainPage: React.FC = () => {
  useEffect(() => {
    async function fetchBookData(isbn: string) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/book/${isbn}`
        );

        const bookData = response.data;
        console.log(`The book data is: `, bookData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    }

    fetchBookData("0131103709"); // Example ISBN
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Filters />
      <BookTable />
    </div>
  );
};

export default MainPage;
