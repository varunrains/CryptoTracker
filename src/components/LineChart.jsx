import React, { Fragment } from "react";

import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import millify from "millify";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, inr }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price * inr);
    coinTimeStamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in INR",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Fragment>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change} %
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: Rs {millify(currentPrice)}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </Fragment>
  );
};

export default LineChart;
