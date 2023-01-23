import "./viewQuestion.css"
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { Bookmark, History } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import editorModules from '../editorQuill'
import axios from "axios";
import ReactHtmlParser from 'react-html-parser'
import { myContext } from "../../App";

function ViewQuestion() {
    const [questionData, setQuestionData] = useState({});
    const [answer, setAnswer] = useState("");
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);
    const [counter, setCounter] = useState(0);
    
    const userContext = useContext(myContext);
    let params = useParams();
    let id = params.id;

    const handleQuill = (value) => {
        setAnswer(value);
    };

    const handleAnswer = async (e) => {
        e.preventDefault()
        if (userContext.user.email) {
            if (answer.length >=10) {
                const body = {
                    question_id: id,
                    answer: answer,
                    user: userContext.user
                }    
                await axios.post('https://stack-overflow-clone-thamizhanban.vercel.app/api/answer', body,
                    {
                        headers: {
                            Authorization: window.localStorage.getItem("myToken"),
                            "Content-Type": "application/json"
                        }
                    }
                    ).then((res) => {
                        setAnswer("")
                        alert("answer added successfully");
                        setCounter(counter + 1);
                    }).catch((err) => {
                        console.log(err)
                    })
            }
            else {
                alert("answer must be more than 10 characters")
            }
        }
        
        else {
            alert("login into your accout to answer")
        }
    }

    const handleComment = async () => {
        if (comment !== "") {
            const body = {
                question_id: id,
                comment: comment,
                user: userContext.user
            }
            try {
                await axios.post(`https://stack-overflow-clone-thamizhanban.vercel.app/api/comment/${id}`, body,
                    {
                        headers: {
                            Authorization: window.localStorage.getItem("myToken"),
                            "Content-Type": "application/json"
                        }
                    })
                setComment("");
                setShow(false);
                setCounter(counter + 1);
            } catch (error) {
                alert("error: could not add the comment due to server error")
            }
        }
    }

    useEffect(() => {
        async function getQuestionData() {
            await axios.get(`https://stack-overflow-clone-thamizhanban.vercel.app/api/question/${id}`)
                .then((res) => setQuestionData(res.data[0]))
                .catch((err) => console.log(err));
            }
            getQuestionData();
    }, [id,counter]);

    return (
      <div className="stack-index">
        <div className="stack-index-content">
          
          <div className="main">
            <div className="main-container">
                <div className="main-top">
                            <h2 className="main-question">{ questionData?.title }</h2>
                    <Link to="/add-question">
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className="main-desc">
                    <div className="info">
                        <p>{new Date(questionData?.created_at).toLocaleString()}</p>
                        <p>
                            Active<span>today</span>
                        </p>
                        <p>
                            Viewed<span>43times</span>
                        </p>
                    </div>
                </div>
                <div className="all-questions">
                    <div className="all-questions-container">
                        <div className="all-questions-left">
                            <div className="all-options">
                                <div className="arrow">▲</div>
                                <div className="arrow">0</div>
                                <div className="arrow">▼</div>
                                <Bookmark />
                                <History />
                            </div>
                        </div>
                        <div className="question-answer">
                            <p>{ReactHtmlParser(questionData?.body) }</p>
                            <div className="author">
                                <small>
                                    asked {new Date(questionData?.created_at).toLocaleString()}
                                </small>
                                <div className="author-details">
                                    <Avatar>{questionData?.user?.name[0] }</Avatar>
                                    <p>{questionData?.user?.name }</p>
                                </div>
                            </div>
                            <div className="comments">
                                {
                                    questionData?.comments?.map((_c) => (
                                        <div className="comment">
                                            <p> {_c.comment} -  
                                                <span> {_c.user.name} </span>
                                                <small>
                                                    {new Date(_c.created_at).toLocaleString() }
                                                </small>
                                            </p>
                                        </div>
                                    ))
                                }                                
                                <p onClick={() => setShow(!show)}>Add a comment</p>
                                {show && (
                                    <div className="title">
                                        <textarea
                                            style={{
                                                margin: "5px 0px",
                                                padding: "10px",
                                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                                borderRadius: "3px",
                                                outline: "none",
                                            }}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            type="text"
                                            placeholder="Add your comment..."
                                            rows={5}
                                        />
                                        <button
                                            onClick={handleComment}
                                            style={{
                                                maxWidth: "fit-content",
                                            }}
                                        >
                                            Add comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        flexDirection: "column",
                    }}
                    className="all-questions"
                >
                    <p
                        style={{
                            marginBottom: "20px",
                            fontSize: "1.3rem",
                            fontWeight: "300",
                        }}
                    >
                                {questionData?.answerDetails?.length } Answers
                    </p>
                    {questionData?.answerDetails?.map((_a) => (
                        <div
                            style={{borderBottom: "1px solid #eee"}}
                            key={_a._id}
                            className="all-questions-container"
                        >
                            <div className="all-questions-left">
                                <div className="all-options">
                                    <div className="arrow">▲</div>
                                    <div className="arrow">0</div>
                                    <div className="arrow">▼</div>

                                    <Bookmark />
                                    <History />
                                </div>
                            </div>
                            <div className="question-answer mt-1">
                                {ReactHtmlParser(_a.answer)}
                                <div className="author">
                                    <small>
                                        asked {new Date(_a.created_at).toLocaleString() }
                                    </small>
                                    <div className="d-flex align auth-details">
                                        <Avatar>{_a.user?.name[0]}</Avatar>
                                        <p className="text-primary ms-1 mt-1">{_a.user?.name }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-answer">
                <h3
                    style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: "400",
                    }}
                >
                    Your Answer
                </h3>
                <ReactQuill
                    value={answer}
                    onChange={handleQuill}
                    modules={editorModules}
                    className="react-quill"
                    theme="snow"
                    style={{
                        height: "200px",
                    }}
                />
            </div>
            <button
                onClick={handleAnswer}
                style={{
                    marginTop: "100px",
                    maxWidth: "fit-content",
                }}
            >
                Post your answer
            </button>
          </div>          

        </div>
      </div>
    )
}

export default ViewQuestion;