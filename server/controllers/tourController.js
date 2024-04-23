import { StatusCodes } from "http-status-codes";

// GET TOURS
const getAllTours = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "AllTours" });
};

// POST TOUR
const createTour = async (req, res) => {
  res.status(StatusCodes.CREATED).json({ msg: "Created" });
};

// GET TOUR
const getTour = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Tour" });
};

// UPDATE TOUR
const updateTour = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Updated" });
};

// DELETE TOUR
const deleteTour = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Tour" });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour };
