import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Thought from "./components/Thought";
import ThoughtForm from "./components/Form";
import * as Realm from "realm-web";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllThoughts } from "./JS/actions/thoughtactions";
import LiveThoughts from "./components/LiveThoughts";
import Spinner from "react-bootstrap/Spinner";

const app = new Realm.App({ id: "afkar-nzlxp" });

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("thoughts"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);

  useEffect(() => {
    dispatch(getAllThoughts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const thoughts = useSelector((state) => state.thoughts);
  const loading = useSelector((state) => state.loading);
  const [show, setShow] = useState(false);
  console.log(loading);
  return (
    <div className="Container">
      <div className="Container">
        <ThoughtForm setShow={setShow} />
        {loading ? (
          <Spinner
            style={{
              color: "white",
              width: "250px",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            {thoughts.map((thought) => (
              <Thought data={thought} key={thought._id} show={show} />
            ))}
          </>
        )}

        {!!user &&
          events.map((thought) => (
            <LiveThoughts
              key={Math.random()}
              events={thought.fullDocument}
              show={show}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
