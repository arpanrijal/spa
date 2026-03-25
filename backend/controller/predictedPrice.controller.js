import { Each_Price_Table_Creation } from '../db/EachPricePredictTable.js'
import { predicted_price_data_upload } from '../db/query/setPredictedTableValues.js'

const predicted_Price = async (req, res) => {
    const { predicted_price, stock, current_price, date } = req.body

    try {
        const responses = await Each_Price_Table_Creation(stock)
        if (!responses.status) {
            return res.status(500).json({
                status: false,
                message: `Table creation failed: ${responses.message}`
            })
        }

        const priceResponse = await predicted_price_data_upload(predicted_price, stock, current_price, date)
        if (!priceResponse.status) {
            return res.status(500).json({
                status: false,
                message: `Price upload failed: ${priceResponse.message}`
            })
        }

        return res.status(200).json({
            status: true,
            message: 'Predicted price table created and data uploaded successfully'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: false,
            message: `Server error: ${error.message}`
        })
    }
}

export { predicted_Price }