import React, { useEffect, useState } from "react";
import "./Thought.css";
import Button from "react-bootstrap/Button";
import { deletThought } from "../JS/actions/thoughtactions";
import { useDispatch } from "react-redux";

const Thought = ({ data, show }) => {
  const dispatch = useDispatch();
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="Wall">
      {showTopBtn && (
        <button
          type="button"
          className="icon-position icon-style"
          id="btn-back-to-top"
          onClick={goToTop}
        >
          ↑
        </button>
      )}
      <div className={data.style} style={{ rotate: `${data.rotate}deg` }}>
        {data.name === "مجهول" ? (
          <p style={{ color: "darkGray" }}>{data.name}</p>
        ) : data.role === "admin" ? (
          <p style={{ color: "green" }}>{data.name}</p>
        ) : (
          <p style={{ color: "#5E9EFF" }}>{data.name}</p>
        )}

        <p>{data.thought}</p>
        <p style={{ color: "gray", fontSize: "1vw" }}>
          {data.creationDate.toString().slice(0, -5)}
        </p> 
        {show ? (
          <Button
            onClick={() => dispatch(deletThought(data._id))}
            variant="outline-danger"
          >
            X
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Thought;
