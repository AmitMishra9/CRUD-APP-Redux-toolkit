import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/featcher/postSlice"; // Assuming you have a createPost action
import Spinner from "./Spinner";


function CreatePost() {
  const [values, setValues] = useState({ title: "", body: "" });
  const { title, body } = values;
  const [showPost, setPost] = useState(false);
  const { loading, post,error } = useSelector((state) => ({ ...state.app }));

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const showCreatepost = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          post && (
            <div className="card"> 
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          )
        )}
      </>
    );
  };
  

  const handlePost = (e) => {
    e.preventDefault();
     
    if(!title || !body){
        alert("Please fill in both the title and description");
       return;
      }
      
    dispatch(createPost({ title,body}));
    setValues({ title: "", body: "" });
    setPost(true);
  };
  
  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Enter title"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            placeholder="Add post  Description"
          />
        </div>
        <button type="submit" onClick={handlePost}>
            Submit
        </button>
        <div>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </form>

          <div>
          {showPost && <div>{showCreatepost()}</div> } 
          
          </div>
    </div>
  );
}


export default CreatePost;
