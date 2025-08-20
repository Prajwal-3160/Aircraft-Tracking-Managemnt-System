import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

const AboutPage = () => {
  const [aboutText, setAboutText] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8083/api/about")
      .then((res) => res.json())
      .then((data) => setAboutText(data.description));
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* ✅ Image Carousel */}
      <Carousel fade interval={3000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://traveltradejournal.com/wp-content/uploads/2024/07/Air-India.jpeg"
            alt="Aircraft"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Welcome to Air India</h1>
            <p style={{ fontSize: "1.2rem" }}>Connecting the World with Excellence</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://etimg.etb2bimg.com/thumb/msid-106239774,imgsize-70812,width-1200,height=765,overlay-ettravel/aviation/domestic/air-india-welcomes-indias-first-airbus-a350-aircraft-in-striking-new-livery.jpg"
            alt="Airplane"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Modern Fleet</h1>
            <p style={{ fontSize: "1.2rem" }}>Boeing & Airbus for Unmatched Comfort</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.airport-technology.com/wp-content/uploads/sites/14/2024/11/Airbus-1-6.jpg"
            alt="Runway"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Global Network</h1>
            <p style={{ fontSize: "1.2rem" }}>80+ Domestic & 40+ International Destinations</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* ✅ About Content */}
      <div
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/007/008/922/large_2x/blue-sky-with-clouds-blurred-background-free-photo.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(227, 132, 16, 0.95)",
            borderRadius: "15px",
            padding: "40px",
            maxWidth: "1000px",
            margin: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              fontSize: "2.5rem",
              marginBottom: "30px",
            }}
          >
            ✈ About Air India - Our Legacy
          </h1>

          {/* ✅ Highlights Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {[
              "🌍 Operates in over 40 international and 80+ domestic destinations",
              "🛫 Fleet includes modern Boeing and Airbus aircraft",
              "🌟 Member of the Star Alliance global network",
              "🤝 Now part of the Tata Group since 2022",
            ].map((item, index) => (
              <h2
                key={index}
                style={{
                  fontSize: "1.4rem",
                  color: "#333",
                  padding: "10px",
                  borderRadius: "8px",
                  background: "rgba(13, 71, 161, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#0d47a1";
                  e.target.style.color = "#fff";
                  e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(13, 71, 161, 0.1)";
                  e.target.style.color = "#333";
                  e.target.style.boxShadow = "none";
                }}
              >
                {item}
              </h2>
            ))}
          </div>

          {/* ✅ Expandable Description */}
          <div style={{ marginTop: "25px", fontSize: "1.2rem", color: "#555", lineHeight: "1.8" }}>
            <p>
              {expanded
                ? ` Our fleet comprises state-of-the-art Boeing and Airbus aircraft, ensuring maximum comfort and operational efficiency.
              Being a proud member of the Star Alliance network, we offer unmatched connectivity to destinations worldwide.
              Now as part of the Tata Group, Air India is set for a major transformation to become one of the world’s leading airlines.
              Our future plans include advanced digital systems, sustainable fuel initiatives, and enhanced in-flight experiences.`
                : aboutText || "Air India is a global airline providing premium service and safety for decades."}
            </p>

            <button
              onClick={toggleExpand}
              style={{
                marginTop: "10px",
                backgroundColor: "#0d47a1",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1565c0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#0d47a1")}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
