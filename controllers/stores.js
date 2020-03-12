const Store = require("../models/Store");

module.exports = {
  getStores: async (req, res, next) => {
    try {
      const stores = await Store.find();
      return res.status(200).json({
        success: true,
        count: stores.length,
        data: stores
      });
    } catch (err) {
      return res.status(500).json({ err: err });
    }
  },
  addStore: async (req, res, next) => {
    try {
      const store = await Store.create(req.body);
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ error: "This store already exists" });
      }
      res.status(500).json({ err: err });
    }
  }
};
