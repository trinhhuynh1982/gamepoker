import React from "react";
import PropTypes from "prop-types";

import heart from "../../assets/images/heart.png";
import diamond from "../../assets/images/diamond.png";
import club from "../../assets/images/club.png";
import spade from "../../assets/images/spade.png";

import "./Card.scss";

const Card = (props) => {

  const { suit, rank, color } = props;

  const getCardSymbol = (suit) => {
    let symbol;
    switch (suit) {
      case "Diamond":
        return symbol = diamond;
      case "Heart":
        return symbol = heart;
      case "Club":
        return symbol = club;
      case "Spade":
        return symbol = spade;
      default:
        return symbol;
    };
  };

  const transformRank = (rank) => {
    switch (rank) {
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      case 14:
        return 'A';
      default:
        return rank ? rank.toString() : '';
    }
  };

  const cardSymbol = getCardSymbol(suit);
  return (
    <div className="card-container" style={{ color: `${color}` }}>
      <div style={{ position: "absolute", top: 5, left: 5 }}>
        <div style={{ maxWidth: 15 }}>{transformRank(rank)}</div>
        <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 15 }} />
      </div>
      <div>
        <img src={cardSymbol} alt="suit-symbol" style={{ height: 30, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      </div>
      <div style={{ position: "absolute", bottom: 5, right: 5, transform: "rotate(-180deg)" }}>
        <div style={{ maxWidth: 15 }}>{transformRank(rank)}</div>
        <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 15 }} />
      </div>
    </div>
  );
};

Card.propTypes = {
  suit: PropTypes.string,
  card: PropTypes.string,
  front: PropTypes.bool,
  color: PropTypes.string
};

export default Card;