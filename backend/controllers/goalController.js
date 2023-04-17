const asyncHandler = require('express-async-handler');

// @desc  Get goals
// @route GET /api/goals
// @acces Private
const getGoals = asyncHandler(async (req, res) => {
    res.json({message: 'Get goals'})
})

// @desc  Set goals
// @route POST /api/goals
// @acces Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }
    
    res.status(200).json({message: 'Set goals'})
})

// @desc  Update goals
// @route PUT /api/goals/:id
// @acces Private
const updateGoal = asyncHandler(async (req, res) => {
    res.json({message: `Update goal ${req.params.id}`})
})

// @desc  Delete goals
// @route DELETE /api/goals/:id
// @acces Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.json({message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}