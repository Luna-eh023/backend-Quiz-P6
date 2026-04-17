const mongoose = require('mongoose');
const { Prize } = require('../models');
const logger = require('../core/logger')('seeder');

async function seedPrizes() {
  try {
    // Cek apakah database prize masih kosong
    const count = await Prize.countDocuments();
    if (count === 0) {
      logger.info('Mendeteksi koleksi Prize kosong. Memulai auto-seeding...');

      await Prize.insertMany([
        { name: 'Emas 10 gram', quota: 1, winnerCount: 0 },
        { name: 'Smartphone X', quota: 5, winnerCount: 0 },
        { name: 'Smartwatch Y', quota: 10, winnerCount: 0 },
        { name: 'Voucher Rp100.000', quota: 100, winnerCount: 0 },
        { name: 'Pulsa Rp50.000', quota: 500, winnerCount: 0 },
      ]);

      logger.info('Auto-seeding Prize berhasil ditambahkan!');
    } else {
      logger.info(
        `Koleksi Prize sudah berisi ${count} data. Melewati seeding.`
      );
    }
  } catch (err) {
    logger.error(err, 'Gagal menjalankan auto-seeding');
  }
}

// Blok ini HANYA dieksekusi jika file dijalankan manual lewat CLI
// (misal: node src/seeds/prize-seeder.js)
if (require.main === module) {
  const config = require('../core/config');
  const connectionString = new URL(config.database.connection);
  connectionString.pathname += config.database.name;

  mongoose
    .connect(connectionString.toString())
    .then(async () => {
      logger.info('Menghapus data lama untuk manual seeding...');
      await Prize.deleteMany({});
      await seedPrizes();
      process.exit();
    })
    .catch((err) => {
      logger.fatal(err, 'Gagal koneksi ke MongoDB untuk manual seeding');
      process.exit(1);
    });
}

module.exports = { seedPrizes };
