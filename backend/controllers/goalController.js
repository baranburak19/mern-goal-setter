const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')

// @desc  Get goals
// @route GET /api/goals
// @acces Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()

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
        text: req.body.text
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

    await goal.deleteOne()
    
    res.json({deletedId: req.params.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}