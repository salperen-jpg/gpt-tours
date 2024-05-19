import Tour from "../models/tourModel.js";
import { StatusCodes } from "http-status-codes";

// GET TOURS
const getAllTours = async (req, res) => {
  const tours = await Tour.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ tours });
};

// POST TOUR
const createTour = async (req, res) => {
  req.body.createdBy = req.user.userId;
  await Tour.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Created successfully!" });
};

// GET TOUR
const getTour = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.status(StatusCodes.OK).json({ tour });
};

// UPDATE TOUR
const updateTour = async (req, res) => {
  const newTourBody = req.body;
  await Tour.findByIdAndUpdate(req.params.id, newTourBody, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Updated successfully!" });
};

// DELETE TOUR
const deleteTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "Deleted successfully!" });
};

export const getTourByCityAndCountry = async (req, res) => {
  console.log("correct placement!");
  const { city, country } = req.params;
  const tour = await Tour.findOne({ city, country });
  console.log(tour);
  if (tour) {
    res.status(StatusCodes.OK).json({ tour });
    return;
  }
  res.status(StatusCodes.OK).json({ tour: null });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour };
