import React, { useState, useEffect } from "react";
import EzReactTable from "ez-react-table";

export default function App() {
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };
  useEffect(() => {
    fetchCoins();
  }, []);
  const columns = [
    {
      title: "Name",
      key: "name",
      width: 200,
      render: (value, object) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img height="20px" width="20px" src={object?.image} alt="coin" />
            <span style={{ marginLeft: "10px" }}>{object?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Symbol",
      center: true,
      key: "symbol",
      width: 120,
      render: (value, object) => <div>{value.toUpperCase()}</div>,
    },
    {
      title: "Price",
      key: "current_price",
      width: 100,
      render: (value, object) => <div>{`$${value}`}</div>,
    },
    {
      title: "Change",
      key: "price_change_percentage_24h",
      width: 100,
      render: (value, object) => {
        return (
          <div style={{ color: /-/i.test(value) ? "#ff0374" : "#06a847" }}>
            {value}%
          </div>
        );
      },
    },
  ];
  return (
    <EzReactTable
      cols={columns}
      data={coins}
      darkMode
      title="Crypto Tracker"
      defaultSort="name"
      accentColor="#ffbc03"
      tableHeight={300}
    />
  );
}
