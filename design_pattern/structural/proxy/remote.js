

class UserService {
    getUser(id) {
        return {
            id,
            name: "Vivek"
        };
    }
}

class UserServiceProxy {

    async getUser(id) {

        console.log("Making HTTP request to remote server...");

        // Simulate API Call

        return {
            id,
            name: "Vivek"
        }
    }
}

async function main() {

    const userService = new UserServiceProxy();

    const user = await userService.getUser(1);

    console.log(user);
}

main();