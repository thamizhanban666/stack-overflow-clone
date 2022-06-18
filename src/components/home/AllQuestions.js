import { Avatar } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import "./allQuestions.css";
import ReactHtmlParser from "react-html-parser"

function AllQuestions(props) {
    const truncate = (str,n) => {
        return str?.length > n ? str.substr(0, n) + " ..." : str;
    }
    return (
        <div className="all-questions">
            <div className="w-100">
                <div className="all-questions-left">
                    <div className="d-flex">
                        <div className="all-option">
                            <span>{0} votes</span>
                            {/* <span>votes</span> */}
                        </div>
                        <div className="ms-3 all-option">
                            <span>{props.question?.answerDetails?.length }  answers</span>
                            {/* <span>answers</span> */}
                        </div>
                        <div className="ms-3 all-option">
                            <span>2 views</span>
                        </div>
                    </div>
                </div>
                <div className="question-answer">
                    <Link to={`/view-question/${props.question?._id}`} className="text-decoration-none"> {props.question?.title}
                    </Link>

                    <div
                        style={{
                            maxWidth: "90%",
                        }}
                    >
                        <div className='text-wrap'>{ReactHtmlParser(truncate(props.question?.body,200))}</div>
                    </div>
                    <div className='d-flex flex-wrap' >
                        {
                            props.question?.tags.map((tag) => {
                                return (
                                    <span className='question-tags'>{ tag }</span>
                                )
                            })
                        }
                    </div>
                    <div className="author">
                        <small>{ new Date(props.question?.created_at).toLocaleString() }</small>
                        <div className="author-details">
                            <Avatar>{props.question?.user?.name[0]}</Avatar>
                            <p>{props.question?.user?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllQuestions; 