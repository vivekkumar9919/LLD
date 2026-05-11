
/**
 **solid_2**
(OCP): Build an `AuthenticationService` that 
can support `OAuthLogin`, `EmailLogin`, and `SSOLogin` 
without ever modifying the core orchestrator. 
 */


/** 
class AuthenticationService{

    login(data){
        throw new Error("Login Flow should be implemented");
    }
}

class OAuthLogin extends AuthenticationService {
    login(data){
        console.log("User is logged in through OAuthLogin", {data});
    }
}
class EmailLogin extends AuthenticationService {
    login(data){
        console.log("User is logged in through EmailLogin", {data});
    }
}
class SSOLogin extends AuthenticationService {
    login(data){
        console.log("User is logged in through SSOLogin",{data});
    }
}

const data  = {"name":"vivek", "email":"vns@gmail.com"}
const oauthlogin = new OAuthLogin();
oauthlogin.login(data);

const emaillogin = new EmailLogin();
emaillogin.login(data);

const ssologin = new SSOLogin();
emaillogin.login(data);

*/

/**
 * 🎙️ INTERROGATION - LLD REVIEWER
 * 
 * 1. The Orchestration Challenge: Refactor this so that there is a central 
 *    AuthManager class. If I want to log in, I call authManager.execute(provider). 
 *    How do you ensure AuthManager never has to change when I add a new provider?
 * 
 * 2. Misleading Question: Why are you using inheritance (extends AuthenticationService)? 
 *    In JavaScript, we have Duck Typing. Can't I just pass any object that 
 *    has a .login() method? Is your inheritance actually adding any value 
 *    or just adding "Java-style" boilerplate?
 * 
 * 3. The Factory Question: Should the AuthManager be responsible for 
 *    creating the OAuthLogin instance, or should it be passed in? 
 *    Which choice better respects OCP?
 * 
 * --- VIVEK'S ANSWERS ---
 * 
 * 1. Refactoring using OCP done below
 * 2. Misleading Question: in js we have duck typing, so inheritance is not at all required.
 *    We can just pass any object that has a .login() method.
 * 3. The Factory Question: we shoud pass the login method to the  will be better choice as 
 *    AuthenticationService will be responsible for processing the login method and
 *    not for creating the login method.
 * 
 */





// Good Example (Follows OCP using Extension)

class OAuthLogin {
    constructor(data) {
        this.data = data
    }
    login() {
        console.log("User is logged in through OAuthLogin", { data: this.data });
    }
}
class EmailLogin {
    constructor(data) {
        this.data = data
    }
    login() {
        console.log("User is logged in through EmailLogin", { data: this.data });
    }
}
class SSOLogin {
    constructor(data) {
        this.data = data
    }
    login() {
        console.log("User is logged in through SSOLogin", { data: this.data });
    }
}

class AuthenticationService {
    process(loginMethod) {
        loginMethod.login();
    }
}


const data = { "name": "vivek", "email": "vns@gmail.com" }

const authenticationService = new AuthenticationService();

const oauthlogin = new OAuthLogin(data);
authenticationService.process(oauthlogin)

const emaillogin = new EmailLogin(data);
authenticationService.process(emaillogin)

const ssologin = new SSOLogin(data);
authenticationService.process(ssologin)