
/**

class HttpRequest {
    url = null;
    method = null;
    params = null;
    reqBody = null;
    timeout = null;
}

class BuilderHttpRequest {
    constructor() {
        this.req = new HttpRequest();
    }
    withUrl(url) {
        this.req.url = url;
        return this;
    }
    withMethod(method) {
        this.req.method = method;
        return this;
    }
    withParams(params) {
        if (this.req.params) {
            throw new Error("Params already present")
        }
        this.req.params = params;
        return this;
    }
    withReqBody(reqBody) {
        this.req.reqBody = reqBody;
        return this;
    }
    withTimeOut(timeout) {
        this.req.timeout = timeout;
        return this;
    }

    build() {
        if (!this.req?.url) {
            throw Error("Url can not be empty");
        }
        return this.req;
    }
    // Not a good way 
    // reset(){
    //     this.req.method = null;
    //     this.req.params = null;
    //     this.req.reqBody = null;
    //     this.req.timeout = null; 
    //     return this;
    // }

    reset() {
        this.req = new HttpRequest();
        return this;
    }

}

const request = new BuilderHttpRequest()
    .withUrl("https://api.example.com")
    .withMethod("POST")
    .withParams({ page: 1 })
    .withReqBody({ name: "Vivek" })
    .withTimeOut(5000)
    .build();
// .reset()

console.log(request);

 */


// Builder with director

/**
class HttpRequest {
    url = null;
    method = null;
    params = null;
    reqBody = null;
    timeout = null;
}

class BuilderHttpRequest {
    constructor() {
        this.req = new HttpRequest();
    }
    withUrl(url) {
        this.req.url = url;
        return this;
    }
    withMethod(method) {
        this.req.method = method;
        return this;
    }
    withParams(params) {
        if (this.req.params) {
            throw new Error("Params already present")
        }
        this.req.params = params;
        return this;
    }
    withReqBody(reqBody) {
        this.req.reqBody = reqBody;
        return this;
    }
    withTimeOut(timeout) {
        this.req.timeout = timeout;
        return this;
    }

    build() {
        if (!this.req?.url) {
            throw Error("Url can not be empty");
        }
        return this.req;
    }
    reset() {
        this.req = new HttpRequest();
        return this;
    }

}

class HttpBuilderDirector {
    createGetRequest(url){
        return new BuilderHttpRequest()
        .withUrl(url)
        .withMethod("GET")
        .build();
    }
    createPostRequest(url, body){
        return new BuilderHttpRequest()
            .withUrl(url)
            .withMethod("GET")
            .withReqBody(body)
            .build();
        
    }
}

const request = new BuilderHttpRequest()
    .withUrl("https://api.example.com")
    .withMethod("POST")
    .withParams({ page: 1 })
    .withReqBody({ name: "Vivek" })
    .withTimeOut(5000)
    .build();
// .reset()

console.log("Http request Builder without director",request);

const getRequest = new HttpBuilderDirector().createGetRequest("https://api.example.com");
console.log("Http request Builder director for getRequest",getRequest);
const postRequest  = new HttpBuilderDirector().createPostRequest("https://api.example.com", { name: "Vivek" })
console.log("Http request Builder director for postRequest",postRequest);

 */
 

// Steps Builder

class HttpRequest {
    constructor({ url, method, body, params, timeout }) {
        this.url = url;
        this.method = method;
        this.body = body;
        this.params = params;
        this.timeout = timeout;
    }
}

class UrlStep {
    withUrl(url) {
        if (!url) throw new Error("URL is required");
        return new MethodStep({ url });
    }
}
class MethodStep {
    constructor(data) {
        this.data = data;
    }

    withMethod(method) {
        if (!method) throw new Error("Method is required");
        return new BodyStep({ ...this.data, method });
    }
}
class BodyStep {
    constructor(data) {
        this.data = data;
    }

    withBody(body) {
        if (!body) throw new Error("Body is required");
        return new OptionalStep({ ...this.data, body });
    }
}

class OptionalStep {
    constructor(data) {
        this.data = data;
    }

    withParams(params) {
        this.data.params = params;
        return this;
    }

    withTimeout(timeout) {
        this.data.timeout = timeout;
        return this;
    }

    build() {
        return new HttpRequest(this.data);
    }
}


class HttpRequestBuilder {
    static create() {
        return new UrlStep();
    }
}

const request = HttpRequestBuilder.create()
    .withUrl("https://api.example.com")   // must
    .withMethod("POST")                  // must
    .withBody({ name: "Vivek" })         // must
    .withParams({ page: 1 })             // optional
    .withTimeout(5000)                  // optional
    .build();

console.log(request);



