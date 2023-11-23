// file to contain all workout routes
const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getSingleWorkout,
    getAllWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// GET all workouts
router.get('/', getAllWorkouts)

// GET single workout
router.get('/:id', getSingleWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout)

// POST a new workout
router.patch('/:id', updateWorkout)

module.exports = router