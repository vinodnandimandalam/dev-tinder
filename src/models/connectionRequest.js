const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignore', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is not a valid status'
        }
    },

}, {
    timestamps: true,
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre('save', async function (next) {
    const connectionRequest = this;
    // Check if from and to user are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('Cannot send connection request to self');
    }
    next();
}
);

const connectionRequestModel = new mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = connectionRequestModel;