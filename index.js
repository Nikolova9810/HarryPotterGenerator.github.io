$(".generate").on("click", function () {
  generateCharacter();
});

function generateCharacter() {
  let isFirst = true;
  let $informationToDisplay;
  let spanColor = "";
  const characterName = $("input").val();

  $.get("https://hp-api.onrender.com/api/characters", function (data) {
    const isNameIncluded = data.some((obj) =>
      obj.name.toLowerCase().includes(characterName.toLowerCase())
    );
    if (isNameIncluded) {
      const index = data.findIndex((obj) =>
        obj.name.toLowerCase().includes(characterName.toLowerCase())
      );
      const fullName = data[index].name;
      const gender = data[index].gender;
      const house = data[index].house;
      let dateOfBirth = data[index].dateOfBirth;
      let alive = data[index].alive;
      let patronus = data[index].patronus;
      let image = data[index].image;

      let $image = $("<img/>");
      $image.attr("src", image);
      $image.on("error", function () {
        $image.attr("src", "https://i.imgflip.com/8bxyby.jpg");
      });

      if (alive === false) {
        alive = "No";
      } else {
        alive = "Yes";
      }

      if (dateOfBirth === null) {
        dateOfBirth = "Unknown";
      } else {
        dateOfBirth = dateOfBirth.split("-")[2];
      }

      if (patronus === null || patronus === "") {
        patronus = "Unknown";
      }

      switch (house.toLowerCase()) {
        case "gryffindor":
          spanColor = "red";
          break;
        case "hufflepuff":
          spanColor = "yellow";
          break;
        case "ravenclaw":
          spanColor = "blue";
          break;
        case "slytherin":
          spanColor = "green";
          break;
        default:
          spanColor = "white";
      }

      $("h1").addClass(`${spanColor}`);

      if (isFirst) {
        isFirst = false;
        $informationToDisplay = $(".image-wrapper");
      } else {
        $informationToDisplay = $(".character-info");
      }
      $informationToDisplay.fadeOut("slow", function () {
        $informationToDisplay.html(
          `<div class="character-info">
                  <div class="character">
                      <h5><span class="info ${spanColor}">Name: </span>${fullName}</h5>
                      <h5><span class="info ${spanColor}">Gender: </span>${gender}</h5> 
                      <h5><span class="info ${spanColor}">House: </span>${house}</h5> 
                      <h5><span class="info ${spanColor}">Year of Birth: </span>${dateOfBirth}</h5>
                      <h5><span class="info ${spanColor}">Alive: </span>${alive}</h5> 
                      <h5><span class="info ${spanColor}">Patronus: </span>${patronus}</h5>
                  </div>
                  <div class="photo">
                    ${$image.prop("outerHTML")} 
                  </div>
                </div>`
        );

        $informationToDisplay.fadeIn("slow");
      });
    } else {
      alert("Character not found! Try again with a valid name.");
    }
  });
}
