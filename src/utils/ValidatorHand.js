function getRanksOnly(hand) {
    return hand.map(card => card.rank);
}

function tallyRanks(hand) {
    var ranks = getRanksOnly(hand);

    return ranks.reduce((acc, val) => {
        if (!acc.hasOwnProperty(val)) acc[val] = 0;
        acc[val]++;
        return acc;
    }, {});
}

function isFlush(hand) {
    var suit = hand[0].suit;
    for (let i = 0; i < 5; i++) {
        if (hand[i].suit !== suit) return false;
    }
    return true;
}

function isStraight(hand) {
    if (isRoyalStraight(hand)) return true;
    hand = ValidatorHand.sortAscending(hand);
    var start = hand[0].rank;
    for (let i = 0; i < 4; i++) {
        var thisCard = hand[i].rank;
        var nextCard = hand[i + 1].rank;
        if (nextCard === thisCard + 1) continue;
        return false;
    }
    return true;
}

function isRoyalStraight(hand) {
    var ranks = getRanksOnly(hand);
    if (!ranks.includes(10)) return false;
    if (!ranks.includes(11)) return false;
    if (!ranks.includes(12)) return false;
    if (!ranks.includes(13)) return false;
    if (!ranks.includes(14)) return false;
    return true;
}

function isRoyalStraightFlush(hand) {
    if (isRoyalStraight(hand) && isFlush(hand)) return true;
    return false;
}

function isStraightFlush(hand) {
    if (isStraight(hand) && isFlush(hand)) return true;
    return false;
}

function isFourOfaKind(hand) {
    var tally = tallyRanks(hand);

    for (let prop in tally) {
        if (tally[prop] === 4) return true;
    }

    return false;
}

function isFullHouse(hand) {
    var tally = tallyRanks(hand);

    for (let prop in tally) {
        if (tally[prop] !== 3 && tally[prop] !== 2) return false;
    }

    return true;
}

function isThreeOfaKind(hand) {
    var tally = tallyRanks(hand);

    for (let prop in tally) {
        if (tally[prop] === 3) return true;
    }

    return false;
}

function isTwoPair(hand) {
    var tally = tallyRanks(hand);
    var count = 0;

    for (let prop in tally) {
        if (!tally.hasOwnProperty(prop)) continue;
        count++;
        if (tally[prop] !== 1 && tally[prop] !== 2) return false;
    }

    if (count > 3) return false;

    return true;
}

function isOnePair(hand) {
    var tally = tallyRanks(hand);
    var pair = 0;

    for (let prop in tally) {
        if (tally[prop] > 1) pair = ++pair;
    }

    if (pair > 10 || pair === 1) return true;
    return false;
}

const ValidatorHand = {
    sortAscending: (originalHand) => {
        var hand = JSON.parse(JSON.stringify(originalHand));
        return hand.sort((a, b) => {
            if (a.rank < b.rank) return -1;
            if (a.rank > b.rank) return 1;
            return 0;
        });
    },
    getBestHand: (hand) => {
        if (isRoyalStraightFlush(hand)) return 'royal straight flush';
        if (isStraightFlush(hand)) return 'straight flush';
        if (isFourOfaKind(hand)) return 'four of a kind';
        if (isFullHouse(hand)) return 'full house';
        if (isFlush(hand)) return 'flush';
        if (isStraight(hand)) return 'straight';
        if (isThreeOfaKind(hand)) return 'three of a kind';
        if (isTwoPair(hand)) return 'two pair';
        if (isOnePair(hand)) return 'one pair';
        return 'high card';
    }
};
export default ValidatorHand;