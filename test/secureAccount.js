var chai = require("chai");
	expect = chai.expect,
	should = chai.should()

var server = require("../server")

describe("Secure test Suite", function(){
	it("Decryt the accounts", function(){

		var masterPassword = "masterP";
		var accounts = server.getAccounts(masterPassword)
		console.log(accounts);
		accounts.should.not.be.null;
		accounts.should.be.an("array")
		accounts.forEach(function(account){
			console.log(account);
			 account.should.have.property("name");
			 account.should.have.property("username");
			 account.should.have.property("password");
		})
		
	})

	it("shoud throw an error if mastrepassword is wrong", function(){

		var masterPassword = "masterP";
		var accounts = server.getAccounts(masterPassword)

		expect(server.getAccounts.bind(masterPassword)).to.throw(Error)
	})
})

