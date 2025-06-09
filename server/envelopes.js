const express = require('express');
const envelopeRouter = express.Router();

const {envelope} = require('./bank');

// A list of all envelopes
const envelopeList = [];

// GET all the envelopes
envelopeRouter.get('/',(req,res,next) => {
    res.status(200).json(envelopeList);
});

//POST request that generates individual budget envelopes. Expects "budget" and "title" as parameters
envelopeRouter.post('/', (req,res,next) => {
    const {budget, title} = req.body;
    if (!title || isNaN(budget) || typeof budget !== 'number' || typeof title !== 'string') {
        return res.status(400).json({error: 'Data not valid.'});
    }
    const newEnvelope = envelope(budget,title);
    envelopeList.push(newEnvelope);
    res.status(201).json(newEnvelope);
});


module.exports = envelopeRouter;

// PARAM, unfinished!
/*
apiRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});
*/
