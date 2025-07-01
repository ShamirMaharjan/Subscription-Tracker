import { SERVER_URL } from "../config/env.js";
import { workflowCLient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        const { workflowRunId } = await workflowCLient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })
        res.status(201).json({
            success: true,
            data: {
                subscription,
                workflowRunId
            }
        })

    } catch (error) {
        next(error);
    }
}

export const getuserSubscription = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You can only access your own subscription")
            error.status = 403
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id })

        res.status(201).json({
            success: true,
            data: subscriptions
        })
    } catch (error) {
        next(error)
    }
}

export const getAllSubscription = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(201).json({
            success: true,
            data: subscriptions
        })

    } catch (error) {
        next(error)
    }
}

export const getSuscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        res.status(201).json({
            success: true,
            data: subscription
        })

    } catch (error) {
        next(error)
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You can only access your own subscription")
            error.status = 403
            throw error;
        }

        const subscription = await Subscription.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(201).json({
            success: true,
            data: subscription
        })

    } catch (error) {
        next(error)
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You can only access your own subscription")
            error.status = 403
            throw error;
        }

        const subscription = await Subscription.findByIdAndDelete(req.params.id)

        res.status(201).json({
            success: true,
            data: subscription
        })

    } catch (error) {
        next(error)
    }
}