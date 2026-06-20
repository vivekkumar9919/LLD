
/**
 **singleton_3**: Implement a Singleton `FeatureToggleService` that fetches a 
 massive remote JSON config (delay mock with setTimeout). Test what happens 
 if multiple modules request the toggle status while the network request is still pending.
 */



class FeatureToggleService {
    static instance  = null;

    static async getConfig(){
         await new Promise(async(resolve, rejected) =>{
            console.log("fetching Data ....")
             setTimeout(resolve, 2000)
         })

        return {
            feature_name : "abc",
            tickets : "1233",
            created_By : "vivek",
            toggle : true
        }   
    }
    static async getToggleInstance(){
          if(FeatureToggleService.instance){
            return FeatureToggleService.instance;
          }
          FeatureToggleService.instance = await this.getConfig();
          return FeatureToggleService.instance;
    }
}

// here request1 take 2000ms time and request2 do not take that much time because instance is created and return 
const [request1 , request2] = await Promise.all([FeatureToggleService.getToggleInstance(), FeatureToggleService.getToggleInstance()]);

console.log("request1",request1);
console.log("request2",request2);