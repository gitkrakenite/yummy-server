const Food = require("../models/foodModel");
const User = require("../models/userModel");

// create post
const createFood = async (req, res) => {
  const {
    title,
    price,
    category,
    description,
    vendor,
    image,
    quantity,
    available,
    onOffer,
  } = req.body;

  if (
    !title ||
    !vendor ||
    !price ||
    !description ||
    !category ||
    !image ||
    !quantity ||
    !available
  ) {
    res.status(404).send("Details missing");
    return;
  }

  try {
    const food = await Food.create({
      title,
      price,
      vendor,
      category,
      description,
      image,
      quantity,
      available,
      onOffer,
    });

    if (food) {
      res.status(201).send(food);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

// const fetchFood = async (req, res, next) => {
//   try {
//     const food = await Food.find();
//     res.status(200).send(food);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// Function to shuffle an array randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fetchFood = async (req, res, next) => {
  try {
    // Get all food items from the database
    const allFood = await Food.find();

    // Randomly shuffle the array of food items
    const shuffledFood = shuffleArray(allFood);

    res.status(200).send(shuffledFood);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteFood = async (req, res, next) => {
  // check if food exist

  const food = await Food.findById(req.params.id);

  if (!food) {
    res.status(400).json({ message: "food not found" });
    return;
  }

  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete food" });
  }
  // console.log(req.params);
};

const fetchFoodBasedOnSth = async (req, res) => {
  const { vendor } = req.body;
  try {
    const food = await Food.find({
      vendor: vendor,
    });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchFoodOnOffer = async (req, res) => {
  const { onOffer } = req.body;
  try {
    const food = await Food.find({
      onOffer,
    });
    res.status(200).json(food);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnFood = async (req, res) => {
  try {
    // const { postId } = req.params;
    const { username, comment } = req.body;

    // console.log(username);

    // Find the post by ID
    const food = await Food.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the post doesn't exist, return an error
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      comment,
    };

    // Add the comment to the post's comments array
    food.comments.push(newComment);

    // Save the updated post with the new comment
    await food.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

const likeFood = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the food item by ID
    const food = await Food.findById(req.params.id);

    // If the food doesn't exist, return an error
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked this food
    const hasLiked = food.likes.some((like) => like.username === username);

    if (hasLiked) {
      // If the user has already liked it, remove their like
      food.likes = food.likes.filter((like) => like.username !== username);
      await food.save();
      res.status(200).json({ message: "Unliked successfully" });
    } else {
      // If the user hasn't liked it yet, add their like
      const newLike = {
        username,
      };
      food.likes.push(newLike);
      await food.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Like" });
  }
};

const fetchSpecificFood = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.id });
    res.status(200).send(food);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createFood,
  fetchFood,
  likeFood,
  fetchFoodBasedOnSth,
  deleteFood,
  commentOnFood,
  fetchSpecificFood,
  updateSpecificFood,
  fetchFoodOnOffer,
};
