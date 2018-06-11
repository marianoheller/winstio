const crypto = require('crypto');

/**
 * https://stackoverflow.com/questions/19156636/node-js-and-socket-io-creating-room?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 */

module.exports = {
  /**
   * Creates unique hash
   */
  createHash: () => {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    return crypto.createHash('sha1').update(current_date + random).digest('hex');
  },

  /**	Creates a callback that proxies node callback style arguments to an Express Response object.
   *	@param {express.Response} res	Express HTTP Response
  *	  @param {number} [status=200]	Status code to send on success
  *
  *	  @example
  *		list(req, res) {
  *			collection.find({}, toRes(res));
  *		}
  */
  toRes: (res, status=200) => {
    return (err, thing) => {
      if (err) return res.status(500).send(err);
  
      if (thing && typeof thing.toObject==='function') {
        thing = thing.toObject();
      }
      res.status(status).json(thing);
    };
  }
}
