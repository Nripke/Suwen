var dateDay = 0;
var favorites = [];
var messages = ["Suwen, I love you so much. You are so beautiful, don't stop being yourself!",
"You're a light that shines so bright Suwen, I love you.", "Remember when you said your hand was cold in Paris hehehe.",
"You are so smart Suwen, go be an academic weapon today.", "Wait, are you ok? Looks like you just fell from heaven ;)",
"You may not be the fastest racer, but you sure make my heart beat fast <3", "You are looking beautiful today, oh wait, that's how you look everyday ;)",
"Whatever you want to get done today, go do it, I'll always have your back.", "JHU? More like I love U hehe.", "So wait, you are smart, pretty, funny, and.. what's the downside? Nothing?",
"When you are doing your math homework, just pretend it's me. Oh wait, that would make it harder... oops!", "Super Secret Message (Confidential): I love you.", "You're Chinese and I'm Indian, so when we're together it means (practically) the whole world to us.",
"Stop! Drop! And roll your way on down to New Haven ;)", "Some prefer the Xbox, but I prefer to play on you.", "Who let you be this beautiful? Like really doe, you gotta cover that for me.",
"Je t'aime plus que la nourriture", "Suwen, you are doing so well in college and beyond! Go out and be amazing!", "Did you do your laundry yet? Good because it's about to get dirty ;)",
"So where's the beauty pageant? It's over? Suwen won? Not surprised.", "Raising Canes has some good food, but it's a better descriptor of me when I'm around you."
];
var allGivenMessages = [];
var allLove = [];
var allDates = [];
var currentIndex = 0;
var totalClicks = 0;


const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentDate = new Date();

function save()
{
    //Dictionary of variables
    var save = {
        favorites: favorites,
        dateDay: dateDay,
        allGivenMessages: allGivenMessages,
        totalClicks: totalClicks,
        allLove: allLove,
        allDates: allDates
    }

    localStorage.setItem("save", JSON.stringify(save));
    console.log("Game Saved!");
}

function load()
{
    var savedata = JSON.parse(localStorage.getItem("save"));

    if (typeof savedata.favorites !== "undefined" && savedata.favorites !== null) {favorites = savedata.favorites;}else {favorites = [];}
    if (typeof savedata.dateDay !== "undefined") {dateDay = savedata.dateDay;}else {dateDay = 0;}
    if (typeof savedata.allGivenMessages !== "undefined" && savedata.allGivenMessages !== null) {allGivenMessages = savedata.allGivenMessages;}else {allGivenMessages = [];}
    if (typeof savedata.totalClicks !== "undefined" && savedata.totalClicks !== null) {totalClicks = savedata.totalClicks;}else {totalClicks = 0;}
    if (typeof savedata.allLove !== "undefined" && savedata.allLove !== null) {allLove = savedata.allLove;}else {allLove = [];}
    if (typeof savedata.allDates !== "undefined" && savedata.allDates !== null) {allDates = savedata.allDates;}else {allDates = [];}

    currentIndex = allGivenMessages.length-1;
    checkNewDate();
    updateMessage();
    updateDateText();
    updateColor();
}

function reset()
{
    dateDay = 0;
    favorites = [];
    allGivenMessages = [];
    totalClicks = 0;
    allLove = [];
    allDates = [];

    save();
    load();
}

function heartPress()
{
    totalClicks++;
    if (allLove[currentIndex] < 100) {allLove[currentIndex]++;}
    updateColor();
}

function updateColor()
{
    var maxClicks = 100;
    if (allLove[currentIndex] > maxClicks) {return;}
    document.getElementById("love-percent").textContent = Math.floor(100*(allLove[currentIndex]/maxClicks)) + "%";

    const startColor = {
        r: 250,
        g: 236,
        b: 241
      };
    
      // Final color red #ff0000 in RGB
      const endColor = {
        r: 255,
        g: 0,
        b: 0
      };
    
      // Calculate the interpolated RGB values
      const redValue = Math.floor(startColor.r + ((endColor.r - startColor.r) * (allLove[currentIndex] / maxClicks)));
      const greenValue = Math.floor(startColor.g + ((endColor.g - startColor.g) * (allLove[currentIndex] / maxClicks)));
      const blueValue = Math.floor(startColor.b + ((endColor.b - startColor.b) * (allLove[currentIndex] / maxClicks)));
    
      // Set the new color
      const newColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

      document.getElementById('message-text').style.color = newColor;
      document.getElementById('love-percent').style.color = newColor;
}

function checkNewDate()
{
    if (dateDay == currentDate.getDay()) {return;}

    dateDay = currentDate.getDay();

    allLove.push(0);
    allDates.push(retrieveDate());
    getNewMessage();
}

function getNewMessage()
{
    //Assign current message to a randomly chosen one from all the saved messages
    var index = Math.floor(Math.random()*messages.length);

    while (allGivenMessages.includes(messages[index]))
    {
        index = Math.floor(Math.random()*messages.length);
    }

    allGivenMessages.push(messages[index]);
    
    currentIndex = allGivenMessages.length-1;

    updateMessage();
    updateColor();
    updateDateText();
}

function updateMessage()
{
    document.getElementById("message-text").textContent = allGivenMessages[currentIndex];
}

function updateDateText()
{
    document.getElementById("date-text").textContent = allDates[currentIndex];
}

function retrieveDate()
{
    return months[currentDate.getMonth()] + " " + currentDate.getDate();
}

function goLeft()
{
    if (currentIndex <= 0) {return;}
    currentIndex--;
    updateMessage();
    updateColor();
    updateDateText();
}

function goRight()
{
    if (currentIndex >= allGivenMessages.length-1) {return;}
    currentIndex++;
    updateMessage();
    updateColor();
    updateDateText();
}

//Auto save
setInterval(function autoSave() {
    save();
}, 10000);