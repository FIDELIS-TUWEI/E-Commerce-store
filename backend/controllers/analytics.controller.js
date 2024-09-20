const Order = require("../model/order.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const logger = require("../utils/logger");

const analytics = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData
        });

    } catch (error) {
        logger.error("Error occured on analytics controller:", error.message);
        res.status(500).json({ status: "error", message: error.message || "Internal Server Error" });
    }
}

async function getAnalyticsData (){
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null, // groups all documents together
                totalSales: { $sum: 1 },
                totalRevenue: { $sum: "totalAmount" },
            }
        }
    ]);

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    };
};

async function getDailySalesData (startDate, endDate) {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
    
        const dateArray = getDatesInRange(startDate, endDate);
    
        return dateArray.map(date => {
            const foundData = dailySalesData.find(item => item._id == date);
    
            return {
                date,
                sales: foundData?.sales || 0,
                revenue: foundData?.revenue || 0
            }
        });
    } catch (error) {
        throw error;
    }
};

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    };

    return dates;
}

module.exports = { analytics };