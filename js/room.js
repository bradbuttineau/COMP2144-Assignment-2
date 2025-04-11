import * as GUI from '@babylonjs/gui'



const createScene = function () {


    const scene = new BABYLON.Scene(engine);

    // Creates and positions a free camera
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // Attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0),
        scene);

    light.intensity = 0.7;

    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.postion.y = 1;


    // Built-in 'ground' shape.
    const ground = BABYLON.MeshBuilder.CreateGround("ground1", 6, 6, 2, scene);
    //GUI
    const advanceTexture = BABYLON.GUI.AdvanceDynamicTeaxture.CreateFullScreenUI("UI");

    const grid = new BABYLON.GUI.Grid();
    grid.addColumnDefinition(1 / 3);
    grid.addColumnDefinition(1 / 3);
    grid.addColumnDefinition(1 / 3);
    advanceTexture.AddControl(grid)

    const image = new BABYLON.GUI.Image("but", "/images/WHMIS.gif");
    image.width = "200px";
    image.height = "300px";
    image.populateNinePatchSliceFromImage = true;
    image.stretch = BABYLON.GUI.Image.STRETCH_NINE_PATCH;
    grid.addControl(image, 0, 0);

    const image2 = new BABYLON.GUI.Image("but", "/images/Lifting Techniques");
    image.width = "200px";
    image.height = "300px";
    image.populateNinePatchSliceFromImage = true;
    image.stretch = BABYLON.GUI.Image.STRETCH_NINE_PATCH;
    grid.addControl(image2, 0, 1);
   
   
   
    return scene;
};