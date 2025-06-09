let envelopeCounter = 1;

const envelope = (budget,title) => {
    return {
        id: `${envelopeCounter++}`,
        budget: budget,
        title: title
      }
};

module.exports = {envelope}