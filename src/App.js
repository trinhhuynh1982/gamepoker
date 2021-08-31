import { useState } from 'react';
import './App.scss';
import Card from './components/card/Card';
import Hand from './components/hand/Hand';
import ValidatorHand from './utils/ValidatorHand';
import { deckArray } from "./utils/DeckArray";
import { playerArray } from "./utils/PlayerArray";

const shuffle = ([...cards]) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const drawCards = (n, deckVal) => {
  const shuffled = deckVal.sort(()=>0.5-Math.random());
  let selectedSubArray = shuffled.slice(0,n);
  return selectedSubArray;
}

const CARD_NUMBER = 5;

function App() {

  const [deck, setDeck] = useState(() => {
    let initCards = [...shuffle(deckArray)];
    return initCards;
  });

  const [drawCardsState, setDrawCards] = useState([]);
  const [bestHand, setBestHand] = useState('');

  const handleOnclickDraw = () => {
    let drawCardsVal = drawCards(CARD_NUMBER, deckArray);
    let newDeck = [...shuffle(deckArray)];

    drawCardsVal.forEach((item) => {
      newDeck = newDeck.filter((curItem) => {
        return item.index !== curItem.index;
      })
    });

    let bestHand = ValidatorHand.getBestHand(drawCardsVal);
    drawCardsVal = ValidatorHand.sortAscending(drawCardsVal);
    
    setBestHand(bestHand);
    setDeck(newDeck);
    setDrawCards(drawCardsVal);
  }

  return (
    <div className="poker animated slideInDown">
      <h1>Deck:</h1>
      <div className="deck">
        {deck && deck.map((card, index) => {
          return (
            <Card key={index} suit={card.suit} rank={card.rank} color={card.color} />
          );
        })}
      </div>
      <div className="btn-wrap">
        <button onClick={handleOnclickDraw}>Draw</button>
      </div>
      <div className="hands">
        <Hand player={playerArray[0]} bestHand={bestHand} drawCards={drawCardsState} />
      </div>
    </div>
  );
}

export default App;
