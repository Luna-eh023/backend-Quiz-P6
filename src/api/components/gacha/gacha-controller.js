const service = require('./gacha-service');

async function play(req, res, next) {
  try {
    const { userId, userName } = req.body;

    const result = await service.play(userId, userName);

    res.status(200).json({
      message: result,
    });
  } catch (err) {
    next(err);
  }
}

async function history(req, res, next) {
  try {
    const data = await service.history(req.params.userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function prizes(req, res, next) {
  try {
    res.json(await service.prizes());
  } catch (err) {
    next(err);
  }
}

async function winners(req, res, next) {
  try {
    res.json(await service.winners());
  } catch (err) {
    next(err);
  }
}

// Ubah dari ES Modules (export) menjadi CommonJS (module.exports)
module.exports = {
  play,
  history,
  prizes,
  winners,
};
