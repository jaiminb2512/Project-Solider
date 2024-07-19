const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Mongoose schemas
const workoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    duration: Number, // Duration in minutes
});

const workoutPlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    workouts: [workoutSchema], // Array of workouts
});
// Define mock data
const workoutPlans = [
	{
		id: 1,
		name: 'Cardio Workout',
		description: 'A high-intensity cardio workout',
		imageUrl: 'https://i.ytimg.com/vi/dj03_VDetdw/maxresdefault.jpg',
		workouts: [
			{
				name: 'Jumping Jacks',
				description: 'Start with 3 sets of 20 reps',
				duration: 5
			},
			{
				name: 'Running',
				description: 'Run for 30 minutes at a moderate pace',
				duration: 30
			},
			{
				name: 'Cycling',
				description: 'Cycle for 45 minutes at a steady pace',
				duration: 45
			},
			{
				name: 'Jump Rope',
				description: 'Jump rope for 15 minutes with intervals',
				duration: 15
			},
			{
				name: 'Swimming',
				description: 'Swim for 1 hour focusing on different strokes',
				duration: 60
			},
			{
				name: 'HIIT',
				description: 'High-Intensity Interval Training for 20 minutes',
				duration: 20
			},
		]
	},
	{
		id: 2,
		name: 'Strength Training',
		description: 'Build muscle and strength with this workout',
		imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtY13IzwHas8I0jY-bwIbcPpfkMTD-xfiaNw&s',
		workouts: [
			{
				name: 'Squats',
				description: 'Start with 3 sets of 10 reps',
				duration: 15
			},
			{
				name: 'Push-ups',
				description: 'Start with 3 sets of 15 reps',
				duration: 10
			},
			{
				name: 'Pull-ups',
				description: 'Do 3 sets of 8 pull-ups',
				duration: 20
			},
			{
				name: 'Deadlifts',
				description: 'Start with 3 sets of 5 reps',
				duration: 25
			},
			{
				name: 'Bench Press',
				description: 'Do 3 sets of 12 reps',
				duration: 20
			},
			{
				name: 'Dumbbell Rows',
				description: 'Do 3 sets of 10 reps on each arm',
				duration: 15
			},
		]
	},
	{
		id: 3,
		name: 'Yoga Routine',
		description: 'Yoga poses to improve flexibility',
		imageUrl: 'https://contents.mediadecathlon.com/s853558/k$8186072d4c359151035d64f86e31f31d/1800x0/1745pt1309/3490xcr2618/Yoga-routine-for-runners.jpg?format=auto',
		workouts: [
			{
				name: 'Sun Salutation',
				description: 'Perform 5 rounds of Sun Salutation',
				duration: 15
			},
			{
				name: 'Warrior Pose',
				description: 'Hold Warrior Pose for 1 minute on each side',
				duration: 10
			},
			{
				name: 'Downward-Facing Dog',
				description: 'Hold Downward-Facing Dog for 1 minute',
				duration: 5
			},
			{
				name: 'Tree Pose',
				description: 'Hold Tree Pose for 30 seconds on each side',
				duration: 10
			},
			{
				name: 'Child\'s Pose',
				description: 'Relax in Child\'s Pose for 3 minutes',
				duration: 20
			},
		]
	},
	{
		id: 4,
		name: 'Core Strengthening',
		description: 'Focus on strengthening the core muscles',
		imageUrl: 'https://img.freepik.com/free-vector/fitness-cardio-exercise-equipment-men-women-two-tints-flat-icons-collections_1284-10469.jpg',
		workouts: [
			{
				name: 'Plank',
				description: 'Hold plank position for 1 minute',
				duration: 10
			},
			{
				name: 'Russian Twists',
				description: 'Perform 3 sets of 20 reps',
				duration: 10
			},
			{
				name: 'Leg Raises',
				description: 'Perform 3 sets of 15 reps',
				duration: 15
			},
			{
				name: 'Crunches',
				description: 'Perform 3 sets of 20 reps',
				duration: 10
			},
			{
				name: 'Bicycle Crunches',
				description: 'Perform 3 sets of 20 reps',
				duration: 15
			},
		]
	},
	{
		id: 5,
		name: 'Pilates Routine',
		description: 'Pilates exercises for strength and flexibility',
		imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1IFPCXch-ucl-mbaFxNqodDXz8QWYLtC0A&s',
		workouts: [
			{
				name: 'Hundred',
				description: 'Perform 100 pumps of the arms while holding a V-sit',
				duration: 10
			},
			{
				name: 'Roll-Up',
				description: 'Perform 3 sets of 10 reps',
				duration: 15
			},
			{
				name: 'Single Leg Stretch',
				description: 'Perform 3 sets of 10 reps on each leg',
				duration: 15
			},
			{
				name: 'Swimming',
				description: 'Perform 3 sets of 20 reps',
				duration: 15
			},
			{
				name: 'Leg Pull Front',
				description: 'Perform 3 sets of 10 reps',
				duration: 15
			},
		]
	},
	{
		id: 6,
		name: 'Full Body Circuit',
		description: 'Workout targeting all major muscle groups',
		imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9jlcVskwCoaE2dBpsUb4AzFJ2T2Rz2AjMA&s',
		workouts: [
			{
				name: 'Burpees',
				description: 'Perform 3 sets of 10 reps',
				duration: 15
			},
			{
				name: 'Mountain Climbers',
				description: 'Perform 3 sets of 20 reps',
				duration: 10
			},
			{
				name: 'Dumbbell Lunges',
				description: 'Perform 3 sets of 10 reps on each leg',
				duration: 15
			},
			{
				name: 'Push Press',
				description: 'Perform 3 sets of 10 reps',
				duration: 15
			},
			{
				name: 'Plank with Shoulder Taps',
				description: 'Hold plank position and tap shoulders for 1 minute',
				duration: 20
			},
		]
	},

];

// Routes
app.get('/api/workout-plans', (req, res) => {
    res.json(workoutPlans);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Social Fitness App!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});