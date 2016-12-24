var person ={
	name : 'Andrew',
	age: 24,
};

var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);


var personObject = JSON.parse(personJSON);

console.log(personObject);
console.log(personObject.name);
console.log(typeof personObject);


console.log("Challenge Area")

var animal ='{"name" : "Umamaheswararao"}';

var animalObject = JSON.parse(animal);

animalObject.city = "Bengaluru";;

animal = JSON.stringify(animalObject);

console.log(animal);
console.log(typeof animal);