import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../redux/actions";
import selectors from "../redux/selectors";
import { Button, LinearProgress } from "rmwc";
import {
    DataTable,
    DataTableContent,
    DataTableHead,
    DataTableBody,
    DataTableHeadCell,
    DataTableRow,
    DataTableCell
} from "@rmwc/data-table";
import "@rmwc/data-table/data-table.css";

class QuizList extends Component {
    static propTypes = {
        data: PropTypes.object,
        usersOnline: PropTypes.number,
        getQuizList: PropTypes.func.isRequired,
        getUsersOnline: PropTypes.func,
        isPending: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired
    };

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);

        this.handleQuizClick = this.handleQuizClick.bind(this);
    }

    componentDidMount() {
        this.props.getQuizList();
    }

    handleQuizClick({ _id, usersCount }) {
        if (usersCount ) {
            return;
        }

        this.props.history.push(`/play/${_id}`);
    }

    render() {
        const { data, isError, isPending } = this.props;

        return (
            <DataTable>
                <DataTableContent style={{ minWidth: "420px" }}>
                    <DataTableHead>
                        <DataTableRow>
                            <DataTableHeadCell>Name</DataTableHeadCell>
                           
                        </DataTableRow>
                    </DataTableHead>
                    <DataTableBody>
                        {isPending ? (
                            <DataTableRow>
                                <DataTableCell alignMiddle colSpan="2">
                                    <LinearProgress determinate={false} />
                                </DataTableCell>
                            </DataTableRow>
                        ) : null}
                        {isError ? (
                            <DataTableRow activated>
                                <DataTableCell alignMiddle colSpan="2">
                                    Try again later
                                </DataTableCell>
                            </DataTableRow>
                        ) : null}
                        {Object.values(data).length > 0
                            ? Object.values(data)
                                  .sort((a, b) =>
                                      a.name < b.name
                                          ? -1
                                          : a.name > b.name
                                          ? 1
                                          : 0
                                  )
                                  .map((quiz, index) => (
                                      <DataTableRow
                                          key={index}
                                          activated={
                                              quiz.usersCount 
                                          }
                                      >
                                          <DataTableCell>
                                              {quiz.name}
                                          </DataTableCell>
                                          <DataTableCell alignEnd>
                                          <Button
                                                  raised
                                                  dense
                                                  disabled={
                                                      quiz.usersCount 
                                                  }
                                                  onClick={() =>
                                                      this.handleQuizClick(quiz)
                                                  }
                                              >
                                                                                                  
                                                  Start the quiz
                                                 
                                              </Button>
                                          </DataTableCell>
                                      </DataTableRow>
                                  ))
                            : null}
                    </DataTableBody>
                </DataTableContent>
            </DataTable>
        );
    }
}

const mapStateToProps = state => ({
    data: selectors.getQuizList(state),
    isPending: selectors.getQuizListIsPending(state),
    isError: selectors.getQuizListIsError(state),
    usersOnline: selectors.getUsersOnline(state)
});

const mapDispatchToProps = {
    getQuizList: actions.getQuizList
};

const ConnectedQuizList = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(QuizList)
);

export default ConnectedQuizList;
