import React from "react";
import { Row, Col, Progress } from "antd";
import Good from "../assets/Good.png";
import Moderate from "../assets/Moderate.png";
import Poor from "../assets/Poor.png";
import Unhealthy from "../assets/Unhealthy.png";
import Severe from "../assets/Severe.png";
import Hazardous from "../assets/Hazardous.png";

const SixBoxesGrid = () => {
  const data = [
    {
      image: Good,
      heading: "Good Level",
      paragraph:
        "The air is fresh and free from toxins. People are not exposed to any health risk.",
    },
    {
      image: Moderate,
      heading: "Moderate Level",
      paragraph:
        "Acceptable air quality for healthy adults but mild threat to sensitive individuals.",
    },
    {
      image: Poor,
      heading: "Poor Level",
      paragraph:
        "Inhaling such air can cause slight discomfort and difficulty in breathing.",
    },
    {
      image: Unhealthy,
      heading: "Unhealthy Level",
      paragraph:
        "This could be typically problematic for children, pregnant women and the elderly.",
    },
    {
      image: Severe,
      heading: "Severe Level",
      paragraph:
        "Exposure to air can cause chronic morbidities or even organ impairment.",
    },
    {
      image: Hazardous,
      heading: "Hazardous Level",
      paragraph:
        "Beware! Your life is in danger. Prolonged exposure can lead to premature death.",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Air Quality Index Scale
      </h1>
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
        Know about the category of air quality index (AQI) your ambient air
        falls in and what it implies.
      </h4>

      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} span={12}>
            <div
              style={{
                background: "#f0f0f0",
                padding: "20px",
                fontSize: "18px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center", // Align items in flex center
              }}
            >
              <img
                src={item.image}
                alt={item.heading}
                style={{ width: "30%", marginRight: "20px" }} // Adjust image size and margin
              />
              <div>
                <h3>{item.heading}</h3>
                <p>{item.paragraph}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SixBoxesGrid;
