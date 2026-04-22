

// Bad Example (Violates ISP)

/** 

class  AreaAndVolumes {


    area(l, b){
        console.log("Area is -", l*b);
    }
    volumes(l,b,h){
        console.log("Volumes is -", l*b*h);
    }
}

class Rectangle extends AreaAndVolumes {

    volumes(){
        throw new Error("Volumes is not possible for the rectangle")
    }

}

class Square extends AreaAndVolumes {

    volumes(){
        throw new Error("Volumes is not possible for the rectangle")
    }

}

class Cube extends AreaAndVolumes {


}
// const shape = new AreaAndVolumes();
// shape.area(2,3);
const squareArea = new Rectangle();
squareArea.area(2,3);

const cube = new Cube();
cube.area(2,3);
cube.volumes(2,3,1);


*/

// Good Example (Follows ISP)

class Shape2D {

    area(l, b) {
        console.log("Area is -", l * b);
    }
}

class Shape3D extends Shape2D {
    volumes(l, b, h) {
        console.log("Volumes is -", l * b * h);
    }
}

class Rectangle extends Shape2D {

}

class Square extends Shape2D {

}

class Cube extends Shape3D {

}

const squareArea = new Rectangle();
squareArea.area(2, 3);

const cube = new Cube();
cube.area(2, 3);
cube.volumes(2, 3, 1);

