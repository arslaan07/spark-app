const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    url: { type: String, required: true},
    application: { type:String, enum: ['Instagram', 'Facebook', 'Youtube', 'X', 'Others'], required: true },
    isActive: { type:Boolean, default: true },
    clickData: [{
        timestamp: { type: Date, default: Date.now },
        ipAddress: String,
        userAgent: String,
        device: String,
        os: String,
        referrer: String,
        userIdentifier: String
      }]
},
 { timestamps: true })

module.exports = mongoose.model('Link', linkSchema)