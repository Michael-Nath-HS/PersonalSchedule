var today = new Date();
var things = {
    "Sleep": [1, 0, 9, 0],
    "Break0": [9, 1, 9, 59],
    "Lab": [10, 0, 15, 30],
    "Break1": [15, 31, 15, 59],
    "Schnatter's Lab": [16, 0, 18, 30],
    "Break2": [18, 31, 19, 29],
    "Chemistry Olympiad Study Time!": [19, 30, 21, 30],
    "SAT Studying (ugh)": [21, 31, 22, 0],
    "Shower Time!": [22, 0, 22, 30],
    "Eat and Relax": [22, 31, 23, 59]
};
var Keys = Object.keys(things);

window.onload = function () {
    time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    document.getElementById("timeDisplay").innerHTML = time;

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
}
setInterval(function () {
    var today = new Date();
    time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    document.getElementById("timeDisplay").innerHTML = time;
    for (var key in things) {
        if (((today.getHours() * 60) + today.getMinutes()) > (things[key][0] * 60) + things[key][1] &&
            ((today.getHours() * 60) + today.getMinutes() < ((things[key][2] * 60) + things[key][3]))) {
            var picker = document.getElementById(key);
            var highlighter = document.createAttribute("class");
            highlighter.value = "text-danger";
            picker.setAttributeNode(highlighter);
            document.getElementById("doing").innerHTML = key;
            var loc = Keys.indexOf(key);
            if (loc <= 0) {
                document.getElementById("passed").innerHTML = Keys[Keys.length - 1];
                document.getElementById("prevEvent").innerHTML = Keys[loc - 1];
            } else {
                document.getElementById("passed").innerHTML = Keys[loc - 1];
                document.getElementById("prevEvent").innerHTML = Keys[loc - 1]
            }

            if (loc === Keys.length - 1) {
                document.getElementById("passed").innerHTML = Keys[loc - 1];
                document.getElementById("upcoming").innerHTML = Keys[0];
            } else {
                document.getElementById("upcoming").innerHTML = Keys[loc + 1];
                document.getElementById("passed").innerHTML = Keys[loc - 1];
            }
            if (loc <= 0) {
                var prev = (Keys.length - 1);
            }
            else {
                var prev = Keys[loc - 1];
            }

            var tBeen = ((today.getHours() * 60) + (today.getMinutes())) - ((things[prev][2] * 60) +
                things[prev][3]);
            document.getElementById("prevEvent").innerHTML = Math.floor(tBeen / 60) + " Hours "
                + (tBeen - (Math.floor((tBeen / 60.0)) * 60)) + " Mins";

            if (loc === Keys.length - 1) {
                var next = Keys[0];
            }

            else {
                var next = Keys[loc + 1];
            }
            var tLeft = ((things[next][0] * 60 ) + (things[next][1])) -
                ((today.getHours() * 60) + today.getMinutes());

            document.getElementById("nextEvent").innerHTML = Math.floor(tLeft / 60) + " Hours "
                + (tLeft - (Math.floor((tLeft / 60.0)) * 60)) + " Mins";
        }
    }
}, 100);

