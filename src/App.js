import React from "react";
import "./styles/App.css";

import axios from "axios"; // used for API stuff



import * as d3 from "d3";
import Header from "./components/Header";
import Contents from "./components/Contents";
// import Features from "./components/Features";
import Footer from "./components/Footer";

class App extends React.Component {
    // you can create class-scope fields in here like in Java
    constructor(props) {
        super();
        this.state = {

            currentDate: new Date("1950-11-01"), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
            dataIsLoaded: false,
        };
    }

    render() {
        return (
            <div id="app" className="app-container">
                <div id="page-wrapper">
                    <Header />
                    <Contents />
                    {/* <Features /> */}
                    <Footer />
                </div>


            </div>
        );
    }

    componentDidMount() {
        // this is called when the page is initially loaded/mounted
        // console.log("Parent Mounted");
        //this.loadData(); // comment this out if using static files; loadData() will make API requests

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // when re-render occurs, componentDidUpdate() is called
        // console.log("Parent Updated");
    }

    loadData() {
        const fetchData = async () => {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"; // proxy url that is used in combination with real url

            let promises = []; // make an array of promises
            this.props.urls.split(",").forEach(function (url) {
                promises.push(axios(proxyurl + url)); // push request onto promise array
            });

            // order of promises is retained; reference: https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values/28066851
            await Promise.all(promises)
                .then((result) => {
                    console.log("Request successful");

                })
                .catch((error) => {
                    console.log(error);
                    console.log("Switching to static files");

                });


            this.setState({ dataIsLoaded: true }); // calling this.setState(...) forces re-render
        };
        fetchData();
    }



}

export default App;
