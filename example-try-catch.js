function doWork(){
	throw new Error("Unable to do work")
}

try{
	doWork();
}
catch(err) {
	console.log(err.message)
}
finally {
	console.log("Finally block executed !!!")
}

console.log("try catch ended")