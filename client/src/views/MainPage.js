import { useEffect, useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import SearchForm from "../components/searchForm/SearchForm";
import Table from "../components/table/Table";
import Pagination from "../components/pagination/Pagination";
import { getAllTransactions } from "../api/api";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  useEffect(() => {
    getAllTransactions(query, null).then((data) => {
      setPage(1);
      setData(data.result);
      setMaxPage(data.pages);
    });
  }, [query]);

  useEffect(() => {
    getAllTransactions(query, page).then((data) => {
      setData(data.result);
      setMaxPage(data.pages);
    });
  }, [page]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <MainContainer>
        <SearchForm setPage={setPage} setQuery={setQuery} />
        <Table data={data} />
        {maxPage > 0 && (
          <Pagination setPage={setPage} maxPage={maxPage} page={page} />
        )}{" "}
      </MainContainer>
      <Footer />
    </div>
  );
};

export default MainPage;
