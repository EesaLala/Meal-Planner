document.getElementById("page1btn").onclick = function() {
    document.getElementById("page1").classList.add("hidden");
    document.getElementById("page2").classList.remove("hidden");

    let activeBalls = document.getElementsByClassName("b1")
    let activeBalls2 = document.getElementsByClassName("b2")
    console.log(activeBalls)
    var i = 0

    for (i=0;i < activeBalls.length; i++) {
        activeBalls[i].classList.remove("active-page")
        
    }
    
    for (i=0;i < activeBalls2.length; i++) {
        activeBalls2[i].classList.add("active-page")
        console.log("test")
    }


}

document.getElementById("nutrition-info").onclick = function() {
    document.getElementById("breakfast-page").classList.add("hidden")
    document.getElementById("lunch-page").classList.add("hidden")
    document.getElementById("dinner-page").classList.add("hidden")
    document.getElementById("page4").classList.remove("hidden")

        let activeBalls3 = document.getElementsByClassName("b3")
        let activeBalls4 = document.getElementsByClassName("b4")
        var i = 0

        for (i=0;i < activeBalls3.length; i++) {
            activeBalls3[i].classList.remove("active-page")
            
        }
        
        for (i=0;i < activeBalls4.length; i++) {
            activeBalls4[i].classList.add("active-page")
            console.log("test")
        }
}


document.getElementById("calculate2").onclick = function() {
      const height = document.getElementById("height").value
      const weight = document.getElementById("weight").value
      const age = document.getElementById("age").value
      const gender = document.getElementById("gender").value
      const activity = document.getElementById("activity").value
      const goal = document.getElementById("goal").value
      const values = [height,weight,age,gender,activity]
      console.log(values)

        let activeBalls2 = document.getElementsByClassName("b2")
        let activeBalls3 = document.getElementsByClassName("b3")
        var i = 0

        for (i=0;i < activeBalls2.length; i++) {
            activeBalls2[i].classList.remove("active-page")
            
        }
        
        for (i=0;i < activeBalls3.length; i++) {
            activeBalls3[i].classList.add("active-page")
            console.log("test")
        }
      
      if (gender == "Male") {
        let bcalories = ((weight*10) + (height*6.25) - (5*age) + 5) * activity;
        values.push(bcalories)
      } else {
        bcalories = ((weight*10) + (height*6.25) - (5*age) - 161) * activity;
        values.push(bcalories)
      }
      
      if (goal == "gain") {
          values[5] = values[5] + 500
      } else if (goal == "lose") {
          values[5] = values[5] - 500
      }
      
      console.log(values)
      
      let targetCalories = Math.floor(values[5])
      
      console.log(targetCalories)

      document.getElementById("target-message").innerHTML = `You Should Eat ${targetCalories} Calories`;

      document.getElementById("page2").classList.add("hidden")

      document.getElementById("breakfast-page").classList.remove("hidden")
      document.getElementById("lunch-page").classList.remove("hidden")
      document.getElementById("dinner-page").classList.remove("hidden")

      function displayMeals(apiData) {
          document.getElementById("breakfast").innerHTML = apiData.meals[0].title;
          document.getElementById("lunch").innerHTML = apiData.meals[1].title;
          document.getElementById("dinner").innerHTML = apiData.meals[2].title;
          let carbs = apiData.nutrients.carbohydrates;
          let fat = apiData.nutrients.fat;
          let protein = apiData.nutrients.protein;

          new Chart(document.getElementById("pie-chart"), {
            type: 'pie',
            data: {
            labels: ["Carbohydrates", "Fat", "Protein"],
            datasets: [{
                label: "grams:",
                backgroundColor: ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"],
                data: [carbs,fat,protein]
            }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            title: {
                display: true,
                text: `${targetCalories} Calories`
            }
            }
        });

        let breakfastId = apiData.meals[0].id;
        let lunchId = apiData.meals[1].id;
        let dinnerId = apiData.meals[2].id;
            
        displayMealsInfo(breakfastId, "breakfastInfo");
        displayMealsInfo(lunchId, "lunchInfo");
        displayMealsInfo(dinnerId, "dinnerInfo");
    
        
      }
    
    function displayMealsInfo (id,info) {

        const api2 = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=2ce90c069d8043aeadcf789227296dd1`

        fetch(api2)
            .then(response => {
                return response.json();
            })
            .then (data2 => {
                console.log(data2);
                var node = document.createElement("LI");
                var textnode = document.createTextNode(`${data2.calories} Calories`);
                node.appendChild(textnode);
                document.getElementById(info).appendChild(node);

                var node1 = document.createElement("LI");
                var textnode1 = document.createTextNode(`${data2.carbs} Carbohydrates`);
                node1.appendChild(textnode1);
                document.getElementById(info).appendChild(node1);

                var node2 = document.createElement("LI");
                var textnode2 = document.createTextNode(`${data2.fat} Fat`);
                node2.appendChild(textnode2);
                document.getElementById(info).appendChild(node2);

                var node3 = document.createElement("LI");
                var textnode3 = document.createTextNode(`${data2.protein} Protein`);
                node3.appendChild(textnode3);
                document.getElementById(info).appendChild(node3);
                
            })

    }
      
      
      const api = `https://api.spoonacular.com/mealplanner/generate?apiKey=2ce90c069d8043aeadcf789227296dd1&targetCalories=${targetCalories}&timeFrame=day`;

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then (data => {
                console.log(data);
                displayMeals(data);
                
            })
}