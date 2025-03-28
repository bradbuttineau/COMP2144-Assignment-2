const canvas = document.getElementById("renderCanvas");


const createScene =  async function () {
    const scene = new BABYLON.Scene(engine);
    const createItemCard = () => {
        const card = BABYLON.MeshBuilder.CreateBox("detail-card", { height: 3.2, width: 2, depth: 0.2 });
        card.position = new BABYLON.Vector3(0, 2, 4);
    
        const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 3, width: 2 });
        plane.position.z = -0.11;
        plane.position.y = 0.1;
        plane.parent = card;
    
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    
        const panel = new BABYLON.GUI.StackPanel();
        panel.verticalAlignment = 0;
        advancedTexture.addControl(panel);
    
        const image = new BABYLON.GUI.Image("image", "https://extendedcollection.com/wp-content/uploads/2021/05/ec_logo_02.jpg")
        image.height = "600px";
        image.paddingTop = 40;
        image.paddingLeft = 40;
        image.paddingRight = 40;
        panel.addControl(image);
    
        const title = new BABYLON.GUI.TextBlock("title");
        title.text = "Library Item Title";
        title.color = "black";
        title.fontSize = 48;
        title.height = "100px";
        title.textHorizontalAlignment = 0;
        title.textVerticalAlignment = 0;
        title.paddingTop = 40;
        title.paddingLeft = 40;
        title.paddingRight = 40;
        panel.addControl(title);
    
        const description = new BABYLON.GUI.TextBlock("description");
        description.fontFamily = "Tahoma, sans-serif";
        description.text =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore mag";
        description.textWrapping = true;
        description.color = "black";
        description.fontSize = 24;
        description.height = "660px";
        description.textHorizontalAlignment = 0;
        description.textVerticalAlignment = 0;
        description.paddingTop = 20;
        description.paddingLeft = 40;
        description.paddingRight = 40;
        panel.addControl(description);
    
        const button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Toggle Favorite");
        button1.width = 1;
        button1.height = "100px";
        button1.color = "white";
        button1.background = "#C62a88";
        button1.fontSize = 50;
        button1.paddingBottom = 20;
        button1.paddingLeft = 40;
        button1.paddingRight = 40;
        button1.onPointerUpObservable.add(function () {
            console.log("button1 clicked");
        });
        button1.verticalAlignment = 1;
        advancedTexture.addControl(button1);
    };
    
    
   

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50;
    camera.setPosition(new BABYLON.Vector3(0, 1.5, 0));
    camera.setTarget(new BABYLON.Vector3(0, 2, 4));
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    
    
    createItemCard();

    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            referenceSpaceType: "unbounded-floor"
        },
        // STEP 2b: Enable optional features - either all of them with true (boolean), or as an array
        optionalFeatures: true
    });

    return scene;
};
// Continually render the scene in an endless loop
createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => sceneToRender.render());
});

// Add an event listener that adapts to the user resizing the screen
window.addEventListener("resize", function() {
    engine.resize();
});