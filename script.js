var today = new Date();
var things = {
    "Sleep": [0, 1, 8, 30],
    "Break0": [8, 31, 9, 59],
    "Chemsitry Olympiad Study Time!": [10, 0, 13, 30],
    "Break1": [13, 31, 15, 30],
    "SAT Study Time!": [15, 31, 16, 30],
    "Break2": [17, 31, 19, 29],
    "C.S. Project Time!": [19, 30, 21, 30],
    "Shower Time!": [21, 31, 22, 0],
    "Eat and Relax": [22, 1, 23, 59]
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
            console.log(loc);
            if (loc <= 0) {
                document.getElementById("passed").innerHTML = Keys[Keys.length - 1];
                document.getElementById("prevEvent").innerHTML = Keys[loc - 1];
                document.getElementById("upcoming").innerHTML = Keys[loc + 1];
            } else if (loc === Keys.length - 1) {
                document.getElementById("passed").innerHTML = Keys[loc - 1];
                document.getElementById("upcoming").innerHTML = Keys[0];
                document.getElementById("prevEvent").innerHTML = Keys[loc - 1]
            } else {
                document.getElementById("upcoming").innerHTML = Keys[loc + 1];
                document.getElementById("passed").innerHTML = Keys[loc - 1];
                document.getElementById("prevEvent").innerHTML = Keys[loc - 1]
            }


            console.log(loc);
            if (loc <= 0) {
                var prev = Keys[Keys.length - 1];
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

