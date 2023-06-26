import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.clientHeight;
      const contentHeight = fullHeight - windowHeight;

      if (scrollPosition < contentHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: isFixed ? "fixed" : "relative",
        marginTop: "50px",
        bottom: "0%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: "2",
        backgroundColor: "black",
        height: "5rem",
      }}
    >
      <div>
        <h6 className="text-center" style={{ paddingTop: "1%", color: "white" }}>
          &copy; Lapmart 2023
        </h6>
      </div>
    </div>
  );
};

export default Footer;
