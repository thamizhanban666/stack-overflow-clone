import { Button } from 'bootstrap';
import React, { useContext, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import "./addQuestion.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { myContext } from '../../App';
import editorModules from '../editorQuill'

function AddQuestion() {
    const usercontext = useContext(myContext);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags,setTags] = useState([]);

    const navigate = useNavigate();

    const handleQuill = (value) => {
        setBody(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usercontext.user.email) {
            if (title !== "" && body !== "") {
                setLoading(true);
                const bodyJSON = {
                    title: title,
                    body: body,
                    tags: tags,
                    user: usercontext.user
                }
                await axios.post('https://stack-overflow-thamizhanban.herokuapp.com/api/question', bodyJSON,
                    {
                        headers: {
                            Authorization: window.localStorage.getItem("myToken")
                        }
                    }
                ).then((res) => {
                    alert("question added successfully");
                    navigate('/home')
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                alert("Enter the Question Title and the Body to post your question")
            }
        }
        else {
            alert("Login into your account to post answer")
        }
    }

    return (
        <div className='add-question'>
            <div className='add-question-container'>
                <div className='head-title'>
                    <h1>Ask a public question</h1>
                </div>
                <div className='question-container'>
                    <div className='question-options'>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Title</h3>
                                <small>
                                    Be specific and imaging you're asking a question to another person
                                </small>
                                <input value={title} onChange={(e=>setTitle(e.target.value))} type="text" placeholder='Add question title' />
                            </div>
                        </div>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Body</h3>
                                <small>
                                    Be specific and imaging you're asking a question to another person
                                </small>
                                <ReactQuill
                                    value={body}
                                    onChange={handleQuill}
                                    modules={editorModules}
                                    className="react-quill"
                                    theme="snow"
                                />
                            </div>
                        </div>
                        <div className='question-option'>
                            <div className='title'>
                                <h3>Tags</h3>
                                <small>
                                    Add up to 5 tags to describe what your question is about
                                </small>
                                <TagsInput value={tags} onChange={setTags} name='tags' placeHolder='press enter to add new tag' />
                            </div>
                        </div>
                    </div>
                </div>
                <button disabled={loading} type='submit' onClick={handleSubmit} className='button'>{
                    loading?'Adding question...' : 'Post your question'
                }</button>
            </div>
        </div>
    )
}

export default AddQuestion;