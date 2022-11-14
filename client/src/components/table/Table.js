import { Fragment } from "react";
import "./Table.scss";
import { ARR_HEAD_TABL, MATRIX_NUMBER } from "../../helpers/constants";

const Table = ({ data = [] }) => {
  return (
    <div className="Table__container">
      <table className="Table">
        <thead>
          <tr className="Table__head">
            {ARR_HEAD_TABL.map((item, i) => (
              <Fragment key={i}>
                <td className="Table__head-item">{item}</td>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length
            ? data.map((item, i) => (
                <Fragment key={i}>
                  <tr className="Table__body">
                    <td className="Table__body-item">
                      {parseInt(item.blockNumber, MATRIX_NUMBER)}
                    </td>
                    <td className="Table__body-item">
                      <a
                        className="Table__body-link"
                        href={`https://etherscan.io/tx/${item.hash}`}
                      >
                        {item.hash}
                      </a>
                    </td>
                    <td className="Table__body-item">{item.from}</td>
                    <td className="Table__body-item">{item.to}</td>
                    <td className="Table__body-item">{item.blockConfirm}</td>
                    <td className="Table__body-item">{item.timestamp}</td>
                    <td className="Table__body-item">
                      {parseInt(item.value, MATRIX_NUMBER)}
                    </td>
                    <td className="Table__body-item">
                      {parseInt(item.gas, MATRIX_NUMBER)}
                    </td>
                  </tr>
                </Fragment>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
