import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logo from "../assets/Logo.svg";
import { useDispatch } from "react-redux";
import { postThought } from "../JS/actions/thoughtactions";
import NoteAudio from "../assets/Note.mp3";

const ThoughtForm = ({ setShow }) => {
  let audio = new Audio(NoteAudio);

  const start = () => {
    audio.play();
  };

  const dispatch = useDispatch();
  const [thoughtData, setThoughtData] = useState({
    name:"",
    thought:""
  });
  const handleChange = (e) => {
    setThoughtData({ ...thoughtData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (thoughtData.name === "admin" && thoughtData.thought === "admin") {
      setThoughtData("");
      setThoughtData({
        name:"",
        thought:""
      });
      return setShow(true);
    }
   
    Object.keys(thoughtData).forEach((key) => {
      if (thoughtData[key] === "") {
        delete thoughtData[key];
      }
    });
    dispatch(postThought(thoughtData, start));
    setThoughtData({
      name:"",
      thought:""
    });
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <div
      style={{
        width: "90%",

        display: "flex",
        gap: "10%",
        alignItems: "center",
        padding: "3%",
        background: "white",
        borderRadius: "30px",
        margin: "2% auto",
      }}
    >
      <img src={Logo} alt="Logo" style={{ width: "15vw" }} />
      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <FloatingLabel
          controlId="floatingInput"
          label="اسمك"
          className="mb-3"
          onChange={handleChange}
        >
          <Form.Control
            name="name"
            type="text"
            placeholder="name@example.com"
            value={thoughtData.name}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="ميساجك"
          onChange={handleChange}
        >
          <Form.Control name="thought" type="text" placeholder="Password" value={thoughtData.thought} />
        </FloatingLabel>
      </div>
      <Button
        onClick={handleSubmit}
        style={{ width: "100%", height: "70%", fontSize: "2rem" }}
        variant="success"
      >
        نشر الفكرة أو الخواطر
      </Button>
    </div>
  );
};

export default ThoughtForm;
