// const { Genre } = require("./models/genre");
const { Ventilator } = require("./models/ventilator");
const mongoose = require("mongoose");
const config = require("config");



const data = [
  {
    ventilators: [
      {
        title: "Nasal Cannula",
        description:"A  to  or breathing insufficiently. Wikipedia",
         dailyRentalRate:"v-4.jpg"
      },
      {
        title: "Nasal some",
        description:"A  to  or breathing insufficiently. Wikipedia",
        dailyRentalRate: "v-5.jpg"
      },
      {
        title: "some Cannula",
        description:"A  to  or breathing insufficiently. Wikipedia",
        dailyRentalRate: "v-6.jpg"
      }
       ],
  }
   
];

async function seed() {
  await mongoose.connect(config.get("db"));
  await Ventilator.deleteMany({});
  for (let genre of data) {
      const ventilators = genre.ventilators.map(ventilator => ({
      ...ventilator
      
    }));
    await Ventilator.insertMany(ventilators);
  }

  mongoose.disconnect();

  console.info("Congratulation you are connected!");
}

seed();
