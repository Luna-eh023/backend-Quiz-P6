// Wrap export dengan function berparameter (db)
module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      name: String,
      quota: Number,
      winnerCount: {
        type: Number,
        default: 0,
      },
    })
  );
