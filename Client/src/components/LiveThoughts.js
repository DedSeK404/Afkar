import React from "react";
import "./Thought.css";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { deletThought } from "../JS/actions/thoughtactions";
import Button from "react-bootstrap/Button";

const LiveThoughts = ({ events, show }) => {
  const dispatch = useDispatch();
  return (
    <AnimatePresence>
      <motion.div
        animate={{
          rotate: [10, 0, 10],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.3, 0.3, 0.3, 0.3],
          repeat: 2,
        }}
        className="Wall"
      >
        {events ? (
          <div
            className={events.style}
            style={{ rotate: `${events.rotate}deg` }}
          >
            {events.name === "مجهول" ? (
              <p style={{ color: "darkGray" }}>{events.name}</p>
            ) : (
              <p style={{ color: "#5E9EFF" }}>{events.name}</p>
            )}
            <p>{events.thought}</p>
            <p style={{ color: "gray", fontSize: "1vw" }}>
              {events.creationDate.toString().slice(0, -37)}
            </p>
            {show ? (
              <Button
                onClick={() => dispatch(deletThought(events._id))}
                variant="outline-danger"
              >
                X
              </Button>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveThoughts;
