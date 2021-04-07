import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import app from '../firebaseconfig';
import FirebaseService from '../firebaseservice';
import ButtonAppBar from './Home.js'
import './common.css'

let userAuth = app.auth().currentUser;
console.log(userAuth);
export default class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Info: {
                FirstName: "",
                LastName: "",
                Email: "",
                EmpID: "",
                EmpDept: ""
            },
            isLoading: true
        }
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getInfo(userAuth.uid).on("value", this.onDataChange);

            } else {
                console.log("User not logged in")
            }
        });
        if (this.state.isLoading === true) {
            this.setState({ isLoading: false })
        }
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }
    }

    componentWillUnmount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getInfo(userAuth.uid).on("value", this.onDataChange);

            } else {
                console.log("User not logged in")
            }
        });
        if (this.state.isLoading === true) {
            this.setState({ isLoading: false })
        }
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }
    }

    onDataChange = (item) => {
        console.log(item);
        let data = item.val();
        let info = {
            FirstName: data.FirstName,
            LastName: data.LastName,
            Email: data.Email,
            EmpID: data.EmpID,
            EmpDept: data.EmpDept
        };

        this.setState({
            Info: info,
            isLoading: false
        });

        console.log(this.state.Info);
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <ButtonAppBar /><br />
                <h3 className="navTitle"> Information </h3>
                <h4>Your Information</h4>
                <p>First Name: {this.state.Info.FirstName}</p>
                <p>Last Name: {this.state.Info.LastName}</p>
                <p>Email Address: {this.state.Info.Email}</p>
                <p>FDM Employee ID: {this.state.Info.EmpID}</p>
                <p>FDM Department: {this.state.Info.EmpDept}</p>
                <Button variant="outlined" color="primary">
                    Edit your Information
                </Button>
            </div>
        )
    }
}