import React, { Component } from "react";
import Header from "../containers/Header";
import { Theme, TopAppBarFixedAdjust, Typography } from "rmwc";

export default class About extends Component {
    render() {
        return (
            <Theme tag="main" use="primary-bg on-primary">
                <Header />
                <TopAppBarFixedAdjust />
                <div className="page">
                    <div className="container">
                        <Typography use="headline4" tag="h1">
                            About
                        </Typography>
                        <Typography use="body1" tag="p">
                        This is a online exam app with public and protected links for
                            access control, handled by Passport on the back-end.
                            Registered student can take part in universty exams in
                            real-time remotly. All the exam
                            interactions are done through WebSocket with JWT
                            authentication. Student can even use this app to
                            practise for the upp coming exam trough quiz games.
                            Ther are even initial quiz questions and answers
                            are downloaded from OpenTDB, parsed and inserted
                            into database.
                        </Typography>
                    </div>
                </div>
            </Theme>
        );
    }
}
