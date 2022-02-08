import React, { Component } from 'react';

import './Home.scss';
import npmg from '../../assets/npmg.png';
import ApiRequests from '../../classes/ApiRequests';
import { HTTP_STATUS_CODES } from '../../../../api/global';
import { Navigate } from 'react-router-dom';

export default class Home extends Component {

    state = {
        code: "",
        email: "",
        showError: false,
        error: "",
        navigateToVote: false,
        navigateToStats: false,
    }

    login = () => {
        ApiRequests.post("code/login", false, {
            code: this.state.code,
            email: this.state.email
        }, false).then((response) => {
            localStorage.setItem("code", this.state.code);
            localStorage.setItem("email", this.state.email);
            (response.data.isUsed)
                ? this.setState({ navigateToStats: true })
                : this.setState({ navigateToVote: true });
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
            {
                this.state.navigateToVote
                    ? <Navigate to="/vote" />
                    : null
            }
            {
                this.state.navigateToStats
                    ? <Navigate to="/stats" />
                    : null
            }
            <div className="centered-content">
                <div className="page-topbar">
                    <img src={npmg} className="logo" />
                    <p className="page-title">НПМГ Бал 2023 гласуване</p>
                </div>
                <div className="section">
                    <p className="section-title">Вход:</p>
                    <div className="section-content">
                        <input type="text" className="input" placeholder="Индивидуален код:" onInput={(evt) => {
                            this.setState({ code: evt.target.value, showError: false, error: "" })
                        }} />
                        <br />
                        <br />
                        <input type="email" className="input" placeholder="Имейл:" onInput={(evt) => {
                            this.setState({ email: evt.target.value, showError: false, error: "" });
                        }} />
                        <p className="hint">Имейл адресът ви ще се използва, за да съобщаваме неща относно бала.</p>
                        {
                            this.state.showError
                                ? <p className="error">{this.state.error}</p>
                                : null
                        }
                        <button className="action-button" onClick={() => { this.login() }}>Продължи напред</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}
