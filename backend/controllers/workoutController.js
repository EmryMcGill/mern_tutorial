const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {
    // get all workouts from db
    const workouts = await Workout.find({}).sort({createdAt: -1})

    // return the workouts
    res.status(200).json(workouts)
}

// get single workout
const getSingleWorkout = async (req, res) => {
    // get the id of the target workout from the request parameters
    const { id } = req.params

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    // find the workout by its id
    const workout = await Workout.findById(id)

    if (!workout) {
        // workout not found so return error response
        return res.status(404).json({error: "no such workout"})
    }

    // return the found workout
    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    // get the workout data from the request
    const {title, load, reps} = req.body

    // add doc to db
    try {
        // create a new workout document
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        // something went wrong so return an error
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    // get id from request parameters
    const { id } = req.params

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    // find doc to delete
    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        // workout not found so return error response
        return res.status(404).json({error: "no such workout"})
    }

    // return deleted workout
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    // get id from request parameters
    const { id } = req.params

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    // find doc to update
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!workout) {
        // workout not found so return error response
        return res.status(404).json({error: "no such workout"})
    }

    // return updated workout
    res.status(200).json(workout)
}


module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}