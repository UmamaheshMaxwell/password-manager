console.log("Starting password manager ...!!!")
var crypto = require("crypto-js");
var storage = require("node-persist");
storage.initSync();

var argv = require("yargs")
	.command("create", "Create a New Account", function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, facebook)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				description: "Acoount username or email",
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				description: 'Account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias : 'm',
				description: 'Master password',
				type: 'String'
			}
		}).help("help")
	})
	.command("get", "Get an existing account", function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Account name (eg: Twitter, facebook)',
				type: 'string'			
			},
			masterPassword: {
				demand: true,
				alias : 'm',
				description: 'Master password',
				type: 'String'
			}			
		}).help("help");
	})
	.help("help")
	.argv;

var command = argv._[0]


function getAccounts(masterPassword){
	var encryptedAccount =storage.getItemSync("accounts");
	var accounts =[];

	if( typeof encryptedAccount !== 'undefined'){
		var bytes =crypto.AES.decrypt(encryptedAccount, masterPassword);
		accounts =  JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	return accounts;
}

function saveAccounts(accounts, masterPassword){
	var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	storage.setItemSync("accounts", encryptedAccounts.toString());
	return accounts;
}

function createAccount(account, masterPassword){
	var accounts =getAccounts(masterPassword);
	console.log("Creating Account !!!")
	accounts.push(account);
	saveAccounts(accounts, masterPassword);
	return accounts;
}

function getAccount(accountName, masterPassword){
	var accounts =getAccounts(masterPassword);
	var matchedAccount ;

	accounts.forEach(function(account){
		if(account.name === accountName){
			matchedAccount = account;
		}		
	})

	return matchedAccount;
}

if(command === 'create'){
	try{
		var createdAccount = createAccount({
			name: argv.name,
			username: argv.username,
			password: argv.password		
		}, argv.masterPassword)		
		console.log("Account created !!!")
	}
	catch(err){
		console.log("Account Creation Failed !!")
		console.log(err.message)
	}

}else if(command === 'get'){
	try {
		var fetchedAccount = getAccount(argv.name, argv.masterPassword)

		if(typeof fetchedAccount === 'undefined'){
			console.log("Account not found")
		}
		else{
			console.log("Account found !!!")
			console.log(fetchedAccount);
		}		
	}
	catch(err){
		console.log(err.message);
	}	
}

module.exports = {
	getAccounts : getAccounts,
	saveAccounts: saveAccounts
}