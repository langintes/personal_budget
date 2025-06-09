const express = require('express');
const apiRouter = express.Router();

// Mount your existing envelopeRouter below at the '/envelopes' path.
const envelopeRouter = require('./envelopes');
apiRouter.use('/envelopes',envelopeRouter);


module.exports = apiRouter;