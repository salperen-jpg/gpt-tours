import Tour from "../models/tourModel.js";
import { StatusCodes } from "http-status-codes";

// GET TOURS
const getAllTours = async (req, res) => {
  const tours = await Tour.find({});
  res.status(StatusCodes.OK).json({ tours });
};

// POST TOUR
const createTour = async (req, res) => {
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

export { getAllTours, createTour, getTour, updateTour, deleteTour };
