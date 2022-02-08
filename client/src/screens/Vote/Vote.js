import React, { Component } from 'react';

import npmg from '../../assets/npmg.png';
import './Vote.scss';

import { Navigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import ApiRequests from '../../classes/ApiRequests';
import { HTTP_STATUS_CODES } from '../../../../api/global';

export default class Vote extends Component {

    state = {
        navigateToHome: false,
        navigateToStats: false,
        optionChosenId: null,
        showConfirmationModal: false,
        showError: false,
        error: ""
    }

    hotelNameById = {
        "ghs": "Grand Hotel Sofia",
        "ghm": "Grand Hotel Millennium",
        "shb": "Sofia Hotel Balkan (Sheraton)",
        "hrs": "Hyatt Regency Sofia",
        "hm": "Hotel Marinela"
    }

    componentDidMount() {
        if (localStorage.getItem('code') == null || localStorage.getItem('email') == null) {
            this.setState({ navigateToHome: true });
        }
    }

    handleVoteChange = (changeEvent) => {
        this.setState({
            optionChosenId: changeEvent.target.value,
        });
    };

    vote = () => {
        ApiRequests.post("vote", {}, {
            code: localStorage.getItem('code'),
            email: localStorage.getItem('email'),
            optionChosenId: this.state.optionChosenId
        }).then((response) => {
            this.setState({ showConfirmationModal: false, navigateToStats: true })
        }).catch((error) => {
            console.log(error)
            this.setState({
                showConfirmationModal: false,
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
                this.state.navigateToHome
                    ? <Navigate to="/" />
                    : null
            }
            {
                this.state.navigateToStats
                    ? <Navigate to="/stats" />
                    : null
            }
            {
                this.state.showConfirmationModal
                    ? <div className="modal">
                        <div className="modal-topbar">
                            <p className="modal-title">Потвърждение</p>
                            <IoMdClose size={18} onClick={() => { this.setState({ showConfirmationModal: false }) }} />
                        </div>
                        <p className="modal-text">Сигурни ли сте, че ще гласувате за {this.hotelNameById[this.state.optionChosenId]}. Веднъж гласували, няма да може да промените своя вот.</p>
                        <button className="action-button" onClick={() => { this.vote() }}>Да, сигурен/на съм</button>
                    </div>
                    : null
            }
            <div className="centered-content">
                <div className="page-topbar">
                    <img src={npmg} className="logo" />
                    <p className="page-title">НПМГ Бал 2023 гласуване</p>
                </div>
                <div className="page-content">
                    <div className="section">
                        <p className="section-title">Оферти:</p>
                        <div className="section-content">
                            <div className="hotel">
                                <p className="hotel-title">
                                    Grand Hotel Sofia
                                    &nbsp;&middot;&nbsp;
                                    <span className="hotel-price">149лв.</span>
                                </p>
                                <p className="important">Важно: Хотелът може да побере всички ученици само в градината!</p>
                                <a href="https://resources.uploy.app/ghs.pdf" className="link" target="_blank" className="text">Линк към офертата</a>
                            </div>
                            <div className="hotel">
                                <p className="hotel-title">
                                    Grand Hotel Millennium
                                    &nbsp;&middot;&nbsp;
                                    <span className="hotel-price">169лв.</span>
                                </p>
                                <a href="https://resources.uploy.app/ghm.pdf" className="link" target="_blank" className="text">Линк към офертата</a>
                            </div>
                            <div className="hotel">
                                <p className="hotel-title">
                                    Sofia Hotel Balkan (Sheraton)
                                    &nbsp;&middot;&nbsp;
                                    <span className="hotel-price">199лв.</span>
                                </p>
                                <p className="hint">Хотелът все още не е предложил оферта, а само ориентировъчна цена</p>
                            </div>
                            <div className="hotel">
                                <p className="hotel-title">
                                    Hyatt Regency Sofia
                                    &nbsp;&middot;&nbsp;
                                    <span className="hotel-price">180лв.</span>
                                </p>
                                <a href="https://resources.uploy.app/hrs.pdf" className="link" target="_blank" className="text">Линк към офертата</a>
                            </div>
                            <div className="hotel">
                                <p className="hotel-title">
                                    Hotel Marinela
                                    &nbsp;&middot;&nbsp;
                                    <span className="hotel-price">140лв.</span>
                                </p>
                                <a href="https://resources.uploy.app/hm.jpg" className="link" target="_blank" className="text">Линк към офертата</a>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <p className="section-title">Гласувам балът да се проведе в:</p>
                        <div className="section-content">
                            <div className="vote-choice-container">
                                <input type="radio" name="vote" id="ghs" value="ghs"
                                    checked={this.state.optionChosenId == 'ghs'}
                                    onChange={this.handleVoteChange} />
                                <label for="ghs" className="vote-choice-title">{this.hotelNameById.ghs}</label>
                            </div>
                            <div className="vote-choice-container">
                                <input type="radio" name="vote" id="ghm" value="ghm"
                                    checked={this.state.optionChosenId == 'ghm'}
                                    onChange={this.handleVoteChange} />
                                <label for="ghm" className="vote-choice-title">{this.hotelNameById.ghm}</label>
                            </div>
                            <div className="vote-choice-container">
                                <input type="radio" name="vote" id="shb" value="shb"
                                    checked={this.state.optionChosenId == 'shb'}
                                    onChange={this.handleVoteChange} />
                                <label for="shb" className="vote-choice-title">{this.hotelNameById.shb}</label>
                            </div>
                            <div className="vote-choice-container">
                                <input type="radio" name="vote" id="hrs" value="hrs"
                                    checked={this.state.optionChosenId == 'hrs'}
                                    onChange={this.handleVoteChange} />
                                <label for="hrs" className="vote-choice-title">{this.hotelNameById.hrs}</label>
                            </div>
                            <div className="vote-choice-container">
                                <input type="radio" name="vote" id="hm" value="hm"
                                    checked={this.state.optionChosenId == 'hm'}
                                    onChange={this.handleVoteChange} />
                                <label for="hm" className="vote-choice-title">{this.hotelNameById.hm}</label>
                            </div>
                            {
                                this.state.showError
                                    ? <p className="error">{this.state.error}</p>
                                    : null
                            }
                            <button className="action-button" onClick={() => {
                                (this.state.optionChosenId)
                                    ? this.setState({ showConfirmationModal: true, showError: false, error: null })
                                    : this.setState({ showError: true, error: "Изберете опция преди да гласувате" })
                            }}>Гласувай</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
