import "./SearchForm.scss";
import { useState } from "react";
import {convertNumber} from '../../helpers/functions'

const SearchForm = ({ setQuery }) => {
  const [value, setValue] = useState("");
  const [select, setSelect] = useState("from");

  const onChange = (e) => setValue(e.target.value.trim());
  const onSelect = (e) => setSelect(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert("Enter value")
      return
    }

    const obj = {};
    if (!value.includes("0x")) {
      obj[select] = convertNumber(+value);
    } else obj[select] = value;
    setQuery(obj);
    setValue('')
  };

  return (
    <div className="Search">
      <form onSubmit={onSubmit} className="Search__form">
        <label className="Search__form-label">
          <input
            onChange={onChange}
            value={value}
            className="Search__form-input"
            type="text"
            placeholder="Search..."
          />

          <select
            className="Search__form-select"
            onChange={onSelect}
            value={select}
          >
            <option value="from">Adress sender</option>
            <option value="to">Adress recipient</option>
            <option value="hash">Transaction Id</option>
            <option value="blockNumber">Block Number</option>
          </select>
          <div className="Search__form-select-btn"></div>
        </label>
        <button className="Search__btn-submit" type="submit"></button>
      </form>
    </div>
  );
};

export default SearchForm;
