class User{
	protected username:string

	constructor(username:string){
		this.username = username;
	}
}

class Admin extends User{
	constructor(username:string){
		super(username)
	}
	showUsername():void{
		
		console.log(this.username)
	}


}

let admin = new Admin("Mahesh")
admin.showUsername()