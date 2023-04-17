const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc  Get goals
// @route GET /api/goals
// @acces Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})

    res.json(goals)
})

// @desc  Set goals
// @route POST /api/goals
// @acces Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }
    
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

// @desc  Update goals
// @route PUT /api/goals/:id
// @acces Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal id not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the goal's user
    if(goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.json(updatedGoal)
})

// @desc  Delete goals
// @route DELETE /api/goals/:id
// @acces Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal id not found')
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the goal's user
    if(goal.user.toString() != user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.deleteOne()
    
    res.json({deletedId: req.params.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}