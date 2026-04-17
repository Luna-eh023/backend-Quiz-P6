// Wrap export dengan function berparameter (db) agar sesuai dengan desain
// auto-loader yang ada di src/models/index.js
module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      userId: String,
      userName: String,
      prize: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );
