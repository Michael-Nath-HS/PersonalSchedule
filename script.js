window.onload = function() {
    var today = new Date();
    time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    console.log(time);
    document.getElementById("timeDisplay").innerHTML += time;


    var things = {
        "Sleep": [1, 0, 9, 0],
        "Lab": [10, 0, 15, 30],
        "Schnatter's Lab": [16, 0, 18, 30],
        "Chemistry Olympiad Study Time!": [19, 30, 21, 30],
        "SAT Studying (ugh)": [21, 31, 22, 0],
        "Shower Time!": [22, 0, 22, 30],
        "Eat and Relax": [22, 31, 23, 59]
    };
    var Keys = Object.keys(things);

    for (var key in things) {
        var allThings = document.createElement("h4");
        var toDo = document.createTextNode((key + ": " + things[key][0] + ":" +
            (things[key][1] < 10 ? '0' : '') +
            things[key][1] + "-" + things[key][2] + ":" +
            (things[key][3] < 10 ? "0" : '') + things[key][3]));
        var thingContainer = document.getElementById("things");
        allThings.appendChild(toDo);
        thingContainer.appendChild(allThings);
        var allColor = document.createAttribute("class");
        var discern = document.createAttribute("id");
        allColor.value = "text-success";
        discern.value = key;
        allThings.setAttributeNode(allColor);
        allThings.setAttributeNode(discern);
    }

    for (var key in things) {
        if (((today.getHours() * 60) + today.getMinutes()) > (things[key][0] * 60) + things[key][1] &&
            ((today.getHours() * 60) + today.getMinutes() < ((things[key][2] * 60) + things[key][3]))) {
            var picker = document.getElementById(key);
            var highlighter = document.createAttribute("class");
            highlighter.value = "text-danger";
            picker.setAttributeNode(highlighter);
            document.getElementById("doing").innerHTML += key;
            var loc = Keys.indexOf(key);
            console.log(Keys[Keys.length]);
            if (loc <= 0) {
                document.getElementById("passed").innerHTML += Keys[Keys.length - 1];
            }
            else {
                document.getElementById("passed").innerHTML += Keys[loc - 1];
            }

            if (loc === Keys.length - 2) {
                document.getElementById("passed").innerHTML += Keys[0];
            }
            else {
                document.getElementById("upcoming").innerHTML += Keys[loc + 1];
            }
        }
    }
};