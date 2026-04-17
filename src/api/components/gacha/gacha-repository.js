const { Gacha, Prize } = require('../../../models');

async function getTodayCount(userId) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: start, $lte: end },
  });
}

async function getAvailablePrize() {
  return Prize.find({
    $expr: { $lt: ['$winnerCount', '$quota'] },
  });
}

async function saveResult(data) {
  return Gacha.create(data);
}

async function addWinner(id) {
  // Atomic update menggunakan findOneAndUpdate untuk mencegah race condition.
  // Akan mengembalikan null jika di detik yang sama kuota sudah penuh oleh proses lain.
  return Prize.findOneAndUpdate(
    { _id: id, $expr: { $lt: ['$winnerCount', '$quota'] } },
    { $inc: { winnerCount: 1 } },
    { new: true }
  );
}

async function getHistory(userId) {
  return Gacha.find({ userId });
}

async function getPrizes() {
  return Prize.find();
}

async function getWinners() {
  return Gacha.find({
    prize: { $ne: null },
  });
}

module.exports = {
  getTodayCount,
  getAvailablePrize,
  saveResult,
  addWinner,
  getHistory,
  getPrizes,
  getWinners,
};
