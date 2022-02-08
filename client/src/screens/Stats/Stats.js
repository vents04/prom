import React, { Component } from 'react';

import npmg from '../../assets/npmg.png';
import ApiRequests from '../../classes/ApiRequests';
import './Stats.scss';

export default class Stats extends Component {

    state = {
        showError: false,
        error: "",
        stats: {}
    }

    hotelNameById = {
        "ghs": "Grand Hotel Sofia",
        "ghm": "Grand Hotel Millennium",
        "shb": "Sofia Hotel Balkan (Sheraton)",
        "hrs": "Hyatt Regency Sofia",
        "hm": "Hotel Marinela"
    }

    componentDidMount() {
        this.getStats();
    }

    getStats = () => {
        ApiRequests.get("vote/stats", false).then((response) => {
            this.setState({ stats: response.data.stats })
        }).catch((error) => {
            console.log(error)
            this.setState({
                showError: true,
                error: (error.response.status != HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                    ? error.response.data
                    : "Грешка при обработване на зявката"
            });
        })
    }

    render() {
        return <div className="page-container">
            <div className="centered-content">
                <div className="page-topbar">
                    <img src={npmg} className="logo" />
                    <p className="page-title">НПМГ Бал 2023 резултати от гласуване</p>
                </div>
                <div className="page-content">
                    {
                        this.state.showError
                            ? <p className="error">{this.state.error}</p>
                            : <div className="section">
                                <p className="section-title">Резултати:</p>
                                <div className="section-content">
                                    <p className="hotel-title">
                                        {this.hotelNameById["ghs"]}
                                        &nbsp;&middot;&nbsp;
                                        <span className="hotel-price">{
                                            this.state.stats.hasOwnProperty("ghs")
                                                ? this.state.stats["ghs"] + " гласа"
                                                : "0 гласа"
                                        }</span>
                                    </p>
                                    <p className="hotel-title">
                                        {this.hotelNameById["ghm"]}
                                        &nbsp;&middot;&nbsp;
                                        <span className="hotel-price">{
                                            this.state.stats.hasOwnProperty("ghm")
                                                ? this.state.stats["ghm"] + " гласа"
                                                : "0 гласа"
                                        }</span>
                                    </p>
                                    <p className="hotel-title">
                                        {this.hotelNameById["shb"]}
                                        &nbsp;&middot;&nbsp;
                                        <span className="hotel-price">{
                                            this.state.stats.hasOwnProperty("shb")
                                                ? this.state.stats["shb"] + " гласа"
                                                : "0 гласа"
                                        }</span>
                                    </p>
                                    <p className="hotel-title">
                                        {this.hotelNameById["hrs"]}
                                        &nbsp;&middot;&nbsp;
                                        <span className="hotel-price">{
                                            this.state.stats.hasOwnProperty("hrs")
                                                ? this.state.stats["hrs"] + " гласа"
                                                : "0 гласа"
                                        }</span>
                                    </p>
                                    <p className="hotel-title">
                                        {this.hotelNameById["hm"]}
                                        &nbsp;&middot;&nbsp;
                                        <span className="hotel-price">{
                                            this.state.stats.hasOwnProperty("hm")
                                                ? this.state.stats["hm"] + " гласа"
                                                : "0 гласа"
                                        }</span>
                                    </p>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>;
    }
}
