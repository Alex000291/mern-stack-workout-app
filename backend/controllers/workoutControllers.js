const mongoose  = require('mongoose');
const Workout = require('../models/workoutModel');

//get all workouts
async function getWorkouts(req, res) {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
}

//get a single workout
async function getWorkout(req, res) {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid workout id" });
  }

  const workout = await Workout.findById(id);
  
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
}

//create a workout
async function createWorkout(req, res) {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//delete a workout
async function deleteWorkout(req, res) {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid workout id" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json({ message: "Workout deleted successfully" });
}

//update a workout
async function updateWorkout(req, res) {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid workout id" });
  }
  
  const workout = await Workout.findOneAndUpdate({ _id: id},{
    ...req.body
  })

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json({ message: "Workout updated successfully" });
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};