const express = require('express');
const transferRouter = express.Router();

const {envelope, envelopeList, getEnvelopeList, setEnvelopeList} = require('./bank');

transferRouter.put('/:from/:to', (req,res,next) => {
    const {amount} = req.body;
    const from = req.params.from;
    const to = req.params.to;
    if (!amount || isNaN(amount)) {
        return res.status(404).send();
    }
    
    const fromId = Number(from); 
      if (!Number.isInteger(fromId) || fromId <= 0) {
      return res.status(404).json({error: 'From id is not valid'})
      }
    
    const toId = Number(to); 
      if (!Number.isInteger(toId) || toId <= 0) {
      return res.status(404).json({error: 'To id is not valid'})
      }

    const current = getEnvelopeList();
    
    const fromEnvelope = current.find(env => Number(env.id) === fromId);
    const toEnvelope = current.find(env => Number(env.id) === toId);

    if (!fromEnvelope || !toEnvelope) {
        return res.status(404).json({ error: 'One or both envelopes not found' });
    }

    if (fromEnvelope.budget < amount) {
    return res.status(400).json({ error: 'Insufficient budget in the from envelope' });
    }

    fromEnvelope.budget -= Number(amount);
    toEnvelope.budget += Number(amount);
    setEnvelopeList(current);
    
    res.status(200).json({ fromEnvelope, toEnvelope });

});

module.exports = transferRouter;
