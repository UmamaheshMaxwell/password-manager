var argv = require("yargs")
	.command('hello', 'Greets the user', function(yargs){
		yargs.options({
			firstName: {
				demand: true,
				alias: 'f',
				description: 'your first name goes here',
				type: 'string'
			},
			lastName: {
				demand: true,
				alias: 'l',
				description: 'your last name goes here',
				type: 'string'
			}			
		}).help('help')
	})
	.help('help')
	.argv;

var command = argv._[0];
console.log(argv);

if(command === "hello" && 
	typeof argv.firstName !== 'undefined' &&
	typeof argv.lastName !== 'undefined'){
	console.log("Hello " + argv.firstName + ' ' + argv.lastName + '!!');
}
else if(command === "hello" && typeof argv.firstName !== 'undefined'){
	console.log("Hello " + argv.firstName + '!!')
}
else{
	console.log("Hello World !!")
}
