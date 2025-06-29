import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLenght: 5,
        maxLenght: 100
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        trim: true,
        minLenght: [0, "Price must be positive"],
    },
    currency: {
        type: String,
        enum: ['USD', 'YEN', 'NRP'],
        default: 'NRP'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['sports', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'others'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value => new Date(),
            message: "Start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: "Renewal date must be after start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {
    timestamps: true
})

subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;