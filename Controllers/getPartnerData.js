const becomePartner = require('../models/becomePartner');

exports.getPartnerData = async (req, res) => {
    try {
        const data = await becomePartner.find({});
        res.status(200).json(
            {
                success: true,
                data: data,
                message: "data fetched"
            }
        )
    }
    catch (err) {
        console.log("error", err);
        res.status(500).json(
            {
                success: false,
                data: "failed to fetch data",
                message: err.message
            }
        )
    }
};

exports.getPartnerDataByDate = async (req, res) => {
    try {
      const date = new Date(req.params.date);
    //   console.log(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const startOfDay = new Date(year, month - 1, day);
      const endOfDay = new Date(year, month - 1, day + 1);

      const data = await becomePartner.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });
      res.status(200).json({
        success: true,
        data: data,
        message: "data fetched",
      });
    } catch (err) {
      console.log("error", err);
      res.status(500).json({
        success: false,
        data: "failed to fetch data",
        message: err.message,
      });
    }
};