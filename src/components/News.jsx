import React, { useState,useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card,Input } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {

  const { data: cryptoNews, isFetching:isNewsFetching } = useGetCryptoNewsQuery({
    
    count: simplified ? 6 : 200,
  });
  const { data, isFetching } = useGetCryptosQuery(100);
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!isFetching && !isNewsFetching) {
    const filteredData = cryptoNews?.filter((coin) =>
      coin?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNewsData(filteredData);
    }
  }, [searchTerm, cryptoNews]);

  if (isFetching || isNewsFetching) return <Loader />;




  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          {/* <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => (
              <Option value={coin.name} key={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select> */}
           <div className="search-crypto">
          <Input
            placeholder="Search News"
            onChange={onChangeHandler}
          />
        </div>
        </Col>
      )}
      {newsData?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={news.title}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      
                      demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name">
                    {/* {news?.provider[0]?.name} */}
                  </Text>
                </div>
                <Text>
                  {moment(news.date).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
