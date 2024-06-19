import Tour from "../models/tourModel.js";
import { StatusCodes } from "http-status-codes";

// GET TOURS
const getAllTours = async (req, res) => {
  // start with query params;
  const { title, city, country, sort } = req.query;
  const queryParamsObject = {
    createdBy: req.user.userId,
  };
  // if city  passed
  if (title) {
    queryParamsObject.$or = [
      {
        title: { $regex: title, $options: "i" },
      },
    ];
  }
  if (city) {
    queryParamsObject.$or = [
      {
        city: { $regex: city, $options: "i" },
      },
    ];
  }
  // if country passed
  if (country) {
    queryParamsObject.$or = [
      {
        country: { $regex: country, $options: "i" },
      },
    ];
  }
  // sorting
  const sortOptions = {
    "a-z": "title",
    "z-a": "-title",
    newest: "-createdAt",
    oldest: "createdAt",
  };

  // pagination
  const page = Number(req.query.page) || 1;
  // tours per page
  const limit = 9;
  const skip = (page - 1) * limit;

  const tours = await Tour.find(queryParamsObject)
    .sort(sortOptions[sort ?? "a-z"])
    .skip(skip)
    .limit(limit);

  const numOfTours = await Tour.countDocuments(queryParamsObject);

  const totalPageNumber = Math.ceil(numOfTours / limit);

  // const toursNumber=

  res
    .status(StatusCodes.OK)
    .json({ numOfTours, currentPage: page, totalPageNumber, tours });
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
  let { city, country } = req.params;

  const tour = await Tour.findOne({
    city,
    country,
    createdBy: req.user.userId,
  });

  if (tour) {
    res.status(StatusCodes.OK).json({ tour });
    return;
  }
  res.status(StatusCodes.OK).json({ tour: null });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour };
