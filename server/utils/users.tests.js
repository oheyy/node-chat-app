var expect = require("expect");
var {Users} = require("./users");

describe("Users", ()=>{
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

    it("Should add a new user", ()=>{
        var users = new Users();
        var user = {
            id: 1, 
            name: "Daniel", 
            room: "nba"
        }
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(resUser.id).toBe(user.id);
        expect(resUser.name).toBe(user.name);
        expect(resUser.room).toBe(user.room);
        expect(users.users).toEqual([user]);
    });
    
    it("Should return a list of names for node course", ()=>{
        
        var userList = users.getUserList("Node Course");
        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it("Should return a list of names for React course", ()=>{
        
        var userList = users.getUserList("React Course");
        expect(userList).toEqual(['Jen']);
    });

    it("Should remove a user", ()=>{
        var user = users.removeUser('2');
        expect(user.name).toBe('Jen');
        expect(users.users.length).toBe(2);
    });

    it("Should not remove a user", ()=>{
        var user = users.removeUser('44');
        expect(user).toNotExist();
    });

    it("Should get a user", ()=>{
        var user = users.getUser('2');
        expect(user.id).toBe('2');
    });

    it("Should not find a user", ()=>{
        var user = users.removeUser('44');
        expect(user).toNotExist();
    });
});