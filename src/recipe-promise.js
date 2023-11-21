const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());
app.listen(3000, () => {
  console.log("Welcome to the kitchen: http://localhost:3000");
});

const readAllRecipes = async () => {
  return JSON.parse(await fs.readFile("../data/recipea-data.json", "utf8"));
};

const readRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = JSON.parse(data);
  return recipes.find((recipe, i) => i === id);
};

const deleteRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = JSON.parse(data).filter((recipe, i) => i !== id);
  const jsonVersion = JSON.stringify(recipes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonVersion, "utf8");
};

app.get("/read-all-recipes", async (req, res) => {
  const recipes = await readAllRecipes();
  res.send(JSON.stringify(recipes, null, 2));
});

app.get("/read-recipe/:id", async (req, res) => {
  const recipes = await readRecipe(Number(req.params.id));
  res.send(JSON.stringify(recipes));
});

app.get("/delete-recipe/:id", async (req, res) => {
  await deleteRecipe(Number(req.params.id));
  res.send("Successfully deleted recipe.");
});