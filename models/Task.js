const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
