import React, { useEffect, useState } from 'react';
import "./home.css";
import FilterList from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions.js";
import { Link, } from "react-router-dom";
import axios from 'axios';

function Home() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getQuestion() {
            await axios.get("https://stack-overflow-clone-thamizhanban.vercel.app/api/question").then((res) => {
                setQuestions(res.data.reverse());
            }).catch((err) => {
                console.log(err);
            });
        }
        getQuestion();
    }, []);

  return (
    <div className="stack-index">
      <div className="mx-sm-5">

        <div className="main">
            <div className="main-container">
                <div className="main-top">
                    <h2>All Questions</h2>
                        <Link to={"/add-question"} ><button>Ask Question</button></Link>
                </div>
                <div className="main-desc">
                    <p>{questions.length } questions</p>
                    <div className="main-filter">
                        <div className="main-tabs">
                            <div className="main-tab">
                                <Link to="#" className='text-decoration-none'>Newest</Link>
                            </div>
                            <div className="main-tab">
                                <Link to="#" className='text-decoration-none'>Active</Link>
                            </div>
                            <div className="main-tab">
                                <Link to="#" className='text-decoration-none'>More</Link>
                            </div>
                        </div>
                        <div className="main-filter-item">
                            <FilterList />
                            <p>Filter</p>
                        </div>
                    </div>
                </div>
                <div className="questions">
                    {
                        questions.map((question, index) => {
                            return (
                                <div className="question">
                                    <AllQuestions key={question._id} question={question}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Home;