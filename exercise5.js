// Complete the below questions using this array:
const array = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },

];

//Create an array using forEach that has all the usernames with a "!" to each of the usernames

let a1=array.forEach(function(value)
 {
    array[i].username+="!";
 });

//Create an array using map that has all the usernames with a "? to each of the usernames

arr= array.map(function(value){value.username+="?";return value.username;});

//Filter the array to only include users who are on team: red

arr= array.filter(function(value){if(value.team=='red'){return value;}});

//Find out the total score of all users using reduce

total=array.reduce(function(total,val) 
 {
   return total+val;
 });

// (1), what is the value of i?
// (2), Make this map function pure:
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
	console.log(num, i);
	alert(num);
	return num * 2;
})

//BONUS: create a new list with all user information, but add "!" to the end of each items they own.
var arr=array.map((val)=>
{
  val.items=val.items.map((value)=>
  {
    return (value+"!");
  });
  return val;
});
