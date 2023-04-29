import {
  DELETETHOUGHT,
  FAILED,
  GETALLTHOUGHTS,
  LOADING,
  THOUGHTADDEDSUCCESSFULLY,
} from "../actiontypes/Thoughttypes";
import axios from "axios";

const baseURL = "http://localhost:4500";

/**
 * @route POST /Thought/add
 * @description add new Thought
 * @access public
 */

export const postThought = (thoughtData, start) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const res = await axios.post(baseURL + "/Thought/add", thoughtData);

    alert(`${res.data.msg}`);
    dispatch({ type: THOUGHTADDEDSUCCESSFULLY });
    start();
  } catch (error) {
    dispatch({ type: FAILED, payload: error });
    console.log(error);
    alert(`${error.response.data.msg}`);
  }
};

/**
 * @route get /Thought/
 * @description get all thoughts
 * @access public
 */

export const getAllThoughts = () => async (dispatch) => {
  dispatch({ type: LOADING });

  try {
    const { data } = await axios.get(baseURL + "/Thought/");
    dispatch({ type: GETALLTHOUGHTS, payload: data });
  } catch (error) {
    dispatch({ type: FAILED, payload: error });
    console.log(error);
  }
};

/**
 * @route delete /Thought/delete
 * @description delete  thought
 * @access protected(password)
 */
export const deletThought = (thoughtID) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const { data } = await axios.delete(
      baseURL + `/Thought/delete/${thoughtID}`
    );

    alert(`${data.msg}`);
    dispatch({ type: DELETETHOUGHT });
    dispatch(getAllThoughts());
  } catch (error) {
    dispatch({ type: FAILED, payload: error });
    console.log(error);
  }
};
