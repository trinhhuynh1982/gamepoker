import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/Card';
import "./Hand.scss";
import avatarIcon from "../../assets/images/user.png";

const Hand = (props) => {
    const { player, bestHand, drawCards } = props;
    return (
        <div className="hand">
            <p className="bestHand animated">{bestHand}</p>
            <div className="hand-inner">
                <div className="playerInfo">
                    <img src={avatarIcon} />
                    <span className="name">{player.name}</span>
                </div>
                <div className="cards">
                    {drawCards && drawCards.map((card, index) => {
                        return (
                            <Card key={index} suit={card.suit} rank={card.rank} color={card.color} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

Hand.propTypes = {};

export default Hand;