import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getPost,
  setEdit,
  updatePost,
} from "../redux/featcher/postSlice";
import Spinner from "./Spinner";

function Post() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const [textBody, setTextBody] = useState("");

  // Destructure relevant pieces of state from the Redux store
  const { loading, post, body, edit } = useSelector((state) => ({
    ...state.app,
  }));

  // Update the textBody state whenever the body state changes
  useEffect(() => {
    if (body) {
      setTextBody(body);
    }
  }, [body]);

  /**
   * Handles fetching the post data based on the ID input by the user.
   * If the ID is not provided, an alert is shown. Otherwise, it dispatches
   * the getPost action to fetch the post data from the server.
   */
  const handleFetchData = (e) => {
    e.preventDefault();
    if (!id) {
      window.alert("Please enter the post ID");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  /**
   * Handles deleting the post. It dispatches the deletePost action
   * with the current post's ID and reloads the page upon success.
   */
  const handleDelete = () => {
    dispatch(deletePost({ id: post.id }));
    window.location.reload();
    window.alert("Post Deleted!");
  };

  return (
    <div>
      <label>Search By Id: </label>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
      />

      <div>
        <button onClick={handleFetchData} type="submit">
          Find Post
        </button>

        <button>Fetch-Post</button>

        <button onClick={() => navigate("/createpost")}>Create Post</button>
      </div>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          post && (
            <div className="card">
              <h1>{post.title}</h1>
              {edit ? (
                <div>
                  <textarea
                    value={textBody}
                    onChange={(e) => setTextBody(e.target.value)}
                  />
                  <button onClick={() => {dispatch(updatePost({id: post.id,title: post.title,body: textBody,})); dispatch(setEdit({ edit: false, body: "" }));}}>Save</button>

                  <button onClick={() => dispatch(setEdit({ edit: false, body: "" }))}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>{post.body}</p>
                </div>
              )}

              {!edit && (
                <div>
                  <button onClick={() =>dispatch(setEdit({ edit: true, body: post.body }))}>Edit</button>
                  <button onClick={handleDelete}>Remove</button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Post;
