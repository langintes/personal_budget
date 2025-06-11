const express = require('express');
const envelopeRouter = express.Router();

const {envelope, envelopeList, getEnvelopeList, setEnvelopeList} = require('./bank');
const { get } = require('../server');

// Mount your existing envelopeRouter below at the '/envelopes' path.
const transferRouter = require('./transfer');
envelopeRouter.use('/transfer',transferRouter);

// Validate ID
envelopeRouter.param('id', (req,res,next,id) => {
  const idNum = Number(id); 
  if (!Number.isInteger(idNum) || idNum <= 0) {
      return res.status(404).json({error: 'Id is not valid'})
    } else {
      req.idNum = idNum;
      next();
    }
});

// GET all the envelopes
envelopeRouter.get('/',(req,res,next) => {
  const current = getEnvelopeList();  
  res.status(200).json(current);
});

//GET a specific envelope
envelopeRouter.get('/:id',(req,res,next) => {
  const idNum = Number(req.idNum);
  const current = getEnvelopeList();
  const idExists = current.some(env => Number(env.id) === idNum);
  if (!idExists) {
    return res.status(404).json({error:'Envelope not found'});
  }
  res.status(200).json(current[idNum -1]);

});

//POST request that generates individual budget envelopes. Expects "budget" and "title" as parameters
envelopeRouter.post('/', (req,res,next) => {
    const {budget, title} = req.body;
    if (!title || isNaN(budget) || typeof budget !== 'number' || typeof title !== 'string') {
        return res.status(400).json({error: 'Data not valid.'});
    }
    const newEnvelope = envelope(budget,title);
    const current = getEnvelopeList();
    current.push(newEnvelope);
    setEnvelopeList(current);
    res.status(201).json(newEnvelope);
});

//PUT request, can updated both budget and title
envelopeRouter.put('/:id', (req,res,next) => {
    const idNum = req.idNum;
    const current = getEnvelopeList();
    const envelope = current.find(env => Number(env.id) === idNum);
    if (!envelope) {
      return res.status(404).json({ error: 'Envelope not found' });
    };

    const {budget, title} = req.body;
    if (budget) {
      if (isNaN(budget) || typeof budget !== 'number') {
        return res.status(400).json({error: 'Budget data not valid.'});
      } else {
          envelope.budget = budget;
      }
    }
    if (title) {
      if (typeof title !== 'string') {
        return res.status(400).json({error: 'Title data not valid.'});
      } else {
        envelope.title = title;
      }
    }
    
    res.status(200).json(envelope);

});

// DELETE request
envelopeRouter.delete('/:id',(req,res,next) => {
  const idNum = req.idNum;
  const currentList = getEnvelopeList();


  const envelope = currentList.find(env => Number(env.id) === idNum);
  if (!envelope) {
      return res.status(404).json({ error: 'Envelope not found' });
  };

  const newList = currentList.filter(envelope => Number(envelope.id) !== idNum);
  setEnvelopeList(newList);
  console.log('newList:',newList)
  res.status(204).send();

})


module.exports = envelopeRouter;


