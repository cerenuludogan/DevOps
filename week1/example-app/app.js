console.log("Helllo world")

//Veriables
var name =  "Ceren"
var age = 23
let isMarried = false

console.log(name)
console.log(age)
console.log(isMarried)

isMarried = true
console.log(isMarried)


//Sum Operation
var number1 = 10
var number2 = 20
console.log(number1 + number2)

//If-else Statement
if(age >= 18) {
    console.log("You are an adult")
} else {
    console.log("You are a child")
}

//Object 
const person = {
    name: "Ceren",
    age: 18,
    isMarried: false
};

console.log(person)
console.log(person.name)
console.log(person.age)
console.log(person.isMarried)

//Functions

function sayHello(){
    console.log("Hello")
}



function conputeSum(num1,num2){
    
    console.log(num1 + num2)
}

sayHello()
conputeSum(20,5)
