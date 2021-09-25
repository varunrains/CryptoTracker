import { Col, Row, Avatar, Typography, Divider, Input } from "antd";
import React, { useState, useEffect } from "react";

import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";

import Loader from "./Loader";

const { Text, Title } = Typography;

const VolumeDetails = () => {
  let { data: cryptosList, isFetching } = useGetCryptosQuery(100);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //if (isFetching) return <Loader />;

  let coins = [...cryptosList?.data?.coins];
  let coinsSorted = coins
    .sort((a, b) => (b.volume > a.volume ? 1 : -1))
    .map((coin, index) => ({ ...coin, volumeRank: index + 1 }));

  useEffect(() => {
    const filteredData = coinsSorted.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchTerm]);

  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="search-crypto">
        <Input placeholder="Search Cryptocurrency" onChange={onChangeHandler} />
      </div>
      <Row>
        <Col xs={6} sm={4} lg={4}>
          <Title level={5}>Volume Rank</Title>
        </Col>
        <Col xs={6} sm={4} lg={4}>
          <Title level={5}>Actual Rank</Title>
        </Col>
        <Col xs={12} sm={4} lg={4}>
          <Title level={5}>Coin/Token Name</Title>
        </Col>
      </Row>

      {cryptos?.map((currency) => (
        <Row key={currency.id}>
          {/* <Link to={`/crypto/${currency.id}/${inrUrlValue}`}> */}
          <Col xs={6} sm={4} lg={4}>
            <Text>
              <strong>{currency.volumeRank}</strong>
            </Text>
          </Col>
          <Col xs={6} sm={4} lg={4}>
            <Text>
              <strong>{currency.rank}</strong>
            </Text>
          </Col>
          <Col xs={12} sm={4} lg={4}>
            <Avatar className="exchange-image" src={currency.iconUrl} />
            <Text>
              <strong>{currency.name}</strong>
            </Text>
          </Col>
          <Divider />
        </Row>
      ))}
    </>
  );
};

export default VolumeDetails;
