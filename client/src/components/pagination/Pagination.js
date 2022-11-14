import { useEffect, useState } from "react";
import "./Pagination.scss";
import {
  QNT_PAGES,
  ARR_FOR_PAGES,
  ARR_FOR_PAGES_MOBILE,
  MAX_SIZE_WINDOW
} from "../../helpers/constants";

const Pagination = ({ setPage, maxPage, page }) => {
  const [sizeWindow] = useState(window.innerWidth);
  const [arrPages, setArrayPages] = useState(
    sizeWindow < MAX_SIZE_WINDOW ? ARR_FOR_PAGES_MOBILE : ARR_FOR_PAGES
  );
  useEffect(() => {
    if (maxPage < 6) {
      setArrayPages(Array.from({ length: maxPage }, (_, index) => index + 1));
    } else
      setArrayPages(sizeWindow < MAX_SIZE_WINDOW ? ARR_FOR_PAGES_MOBILE : ARR_FOR_PAGES);
  }, [maxPage]);

  const choosePage = (e) => {
    setPage(e.target.value);
  };

  const goNextPage = () => {
    if (arrPages[arrPages.length - 1] + 1 >= maxPage) return;
    const newArr = arrPages.map((item) => item + QNT_PAGES);
    const index = newArr.indexOf(maxPage);
    if (index !== -1) {
      newArr.splice(index);
      setArrayPages(newArr);
      setPage(maxPage - 1);
      return;
    } else {
      setArrayPages(newArr);
      setPage(page + QNT_PAGES);
    }
  };

  const goPrevPage = () => {
    if (page <= QNT_PAGES) return;
    if (arrPages.length < QNT_PAGES) {
      const newArr = arrPages.map((item) => item - arrPages.length);
      setPage(page - newArr.length);
      for (let i = newArr.length; i < QNT_PAGES; i += 1) {
        newArr.unshift(newArr[0] - 1);
      }
      setArrayPages(newArr);
    } else {
      setArrayPages(arrPages.map((item) => item - QNT_PAGES));
      setPage(page - QNT_PAGES);
    }
  };

  return (
    <div className="Pagination">
      <button
        onClick={goPrevPage}
        className={
          page <= QNT_PAGES
            ? "Pagination__btn-left"
            : "Pagination__btn-left-active"
        }
      ></button>
      <ul className="Pagination__pages">
        {arrPages.map((item) => (
          <li
            key={item}
            value={item}
            onClick={choosePage}
            style={
              item === page
                ? {
                    backgroundColor: "var(--bg-blue)",
                    border: "2px solid var(--bg-blue)",
                  }
                : null
            }
            className="Pagination__pages-item"
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={goNextPage}
        className={
          arrPages.includes(maxPage - 1)
            ? "Pagination__btn-right"
            : "Pagination__btn-right-active"
        }
      ></button>
    </div>
  );
};

export default Pagination;
