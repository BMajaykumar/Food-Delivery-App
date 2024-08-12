const API_KEY = "d0aef524cfc14d6ba3f35bc68ab620b9";
        const recipeListEl = document.getElementById("recipe-list");

        async function fetchRecipes(category = '') {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/random?number=10&tags=${category}&apiKey=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                displayRecipes(data.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                alert('Error fetching recipes. Please try again later.');
            }
        }

        function displayRecipes(recipes) {
            recipeListEl.innerHTML = "";
            recipes.forEach((recipe) => {
                const recipeItemEl = document.createElement("li");
                recipeItemEl.classList.add("recipe-item");

                const recipeImageEl = document.createElement("img");
                recipeImageEl.src = recipe.image;
                recipeImageEl.alt = "recipe image";

                const recipeTitleEl = document.createElement("h2");
                recipeTitleEl.innerText = recipe.title;

                const recipeIngredientsEl = document.createElement("p");
                recipeIngredientsEl.innerHTML = `
                    <strong>Ingredients:</strong> ${recipe.extendedIngredients
                        .map((ingredient) => ingredient.original)
                        .join(", ")}
                `;

                const recipeLinkEl = document.createElement("a");
                recipeLinkEl.href = recipe.sourceUrl;
                recipeLinkEl.innerText = "View Recipe";
                recipeLinkEl.target = "_blank";

                recipeLinkEl.addEventListener("click", (event) => {
                    event.stopPropagation();
                });

                recipeItemEl.appendChild(recipeImageEl);
                recipeItemEl.appendChild(recipeTitleEl);
                recipeItemEl.appendChild(recipeIngredientsEl);
                recipeItemEl.appendChild(recipeLinkEl);

                recipeListEl.appendChild(recipeItemEl);
            });
        }

        async function searchRecipes() {
            const query = document.getElementById("search-input").value;
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const recipeResults = data.results.map(result => ({
                    image: result.image,
                    title: result.title,
                    extendedIngredients: result.extendedIngredients,
                    sourceUrl: result.sourceUrl
                }));
                displayRecipes(recipeResults);
            } catch (error) {
                console.error('Error searching recipes:', error);
                alert('Error searching recipes. Please try again later.');
            }
        }

        document.getElementById("search-input").addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchRecipes();
            }
        });

        fetchRecipes(); // Initially load recipes