/** @format */

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("no password provided!");
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://serkfol:${password}@cluster0.25uoifl.mongodb.net/phonebook_app?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log("added", result.name, "number", result.number, "to phonebook");
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    if (result.length > 0) {
      console.log("phonebook:", result.length);
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
    } else {
      console.log("phonebook is empty");
    }
    mongoose.connection.close();
  });
}
