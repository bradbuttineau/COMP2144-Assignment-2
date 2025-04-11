import * as GUI from '@babylonjs/gui'

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const createScene = async function () {


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
   
    /* ENABLE AR*/
 
 // Start a WebXR session (immersive-ar, specifically)
 const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
        sessionMode: "immersive-ar",
        // Set the referenceSpaceType to "unbounded" - since the headset is in passthrough mode with AR, let the vistor go anywhere they like within their physical space
        referenceSpaceType: "local" // viewer, local, local-floor, bounded-floor, or unbounded (https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace and https://gist.github.com/lem
    },
    // Enable optional features - either all of them with true (boolean), or as an array
    optionalFeatures: true
});
   
    return scene;
};