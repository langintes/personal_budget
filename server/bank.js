let envelopeCounter = 1;

let envelopeList = [];

const getEnvelopeList = () => {
    return envelopeList;
};

const setEnvelopeList = (newList) => {
    envelopeList = newList;
}

const envelope = (budget,title) => {
    return {
        id: `${envelopeCounter++}`,
        budget: budget,
        title: title
      }
};

module.exports = {envelope, envelopeList, getEnvelopeList, setEnvelopeList}