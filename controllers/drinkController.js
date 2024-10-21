const Drink = require("../models/drinkModel");
const User = require("../models/userModel");

// create post
const createDrink = async (req, res) => {
  const { title, price, category, description, image, quantity, available } =
    req.body;

  if (
    !title ||
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
    const drink = await Drink.create({
      title,
      price,
      category,
      description,
      image,
      quantity,
      available,
    });

    if (drink) {
      res.status(201).send(drink);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

const fetchDrinks = async (req, res, next) => {
  try {
    const drink = await Drink.find();
    res.status(200).send(drink);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteDrink = async (req, res, next) => {
  // check if drink exist

  const drink = await Drink.findById(req.params.id);

  if (!drink) {
    res.status(400).json({ message: "drink not found" });
    return;
  }

  try {
    await Drink.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete drink" });
  }
  // console.log(req.params);
};

const fetchDrinkBasedOnSth = async (req, res) => {
  const { category } = req.body;
  try {
    const drink = await Drink.find({
      category,
    }).sort({ $natural: -1 });
    res.status(200).json(drink);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnDrink = async (req, res) => {
  try {
    // const { postId } = req.params;
    const { username, comment } = req.body;

    // console.log(username);

    // Find the post by ID
    const drink = await Drink.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the drink doesn't exist, return an error
    if (!drink) {
      return res.status(404).json({ error: "Drink not found" });
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
    drink.comments.push(newComment);

    // Save the updated post with the new comment
    await drink.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

const likeDrink = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the drink by ID
    const drink = await Drink.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the drink doesn't exist, return an error
    if (!drink) {
      return res.status(404).json({ error: "drink not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Check if the user has already liked the drink item
    const alreadyLiked = drink.likes.some((like) => like.username === username);

    if (alreadyLiked) {
      // User has already liked the drink, remove the like
      drink.likes = drink.likes.filter((like) => like.username !== username);
      await drink.save();
      res.status(200).json({ message: "Like removed" });
    } else {
      // User hasn't liked the drink, add the like
      drink.likes.push({ username });
      await drink.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Like" });
  }
};

const fetchSpecificDrink = async (req, res) => {
  try {
    const drink = await Drink.findOne({ _id: req.params.id });
    res.status(200).send(drink);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificDrink = async (req, res) => {
  try {
    const updatedDrink = await Drink.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    // console.log(req.params.id);
    res.status(200).json(updatedDrink);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createDrink,
  fetchDrinks,
  likeDrink,
  fetchDrinkBasedOnSth,
  deleteDrink,
  commentOnDrink,
  fetchSpecificDrink,
  updateSpecificDrink,
};
