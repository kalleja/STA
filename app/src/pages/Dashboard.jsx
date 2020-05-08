import React, { Component } from "react";
import QuizList from "../containers/QuizList";
import Header from "../containers/Header";
import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

export default class Dashboard extends Component {
    render() {
        return (
            <Theme tag="main">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <Typography use="headline4" tag="h1">
                            Quiz List
                         </Typography>
                        <Typography use="headline6" tag="h2">
                           
                    Lest all agreed that using Graphqil page (https://node125266-quizapp.jelastic.metropolia.fi/graphql) on this app is forbbiden,
                    because users can usit to se what are the question and find the answers. May Ilkka and Patrick set high score for use to beat.
                    
                        </Typography>
                        <QuizList />
                    </div>
                </div>
            </Theme>
        );
    }
}
