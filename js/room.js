
const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);
//createScene// 
const createScene = async function () {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    //LIGHTING//

    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // skybox//
    const skybox = BABYLON.MeshBuilder.CreateBox("skybox", { size: 150 }, scene);
    const skyboxMaterial = new BABYLON.standardMaterail("skybox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.color3(0, 0, 0)



    // GUI Menu 2D

    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //  button//
    const button = new BABYLON.GUI.Button("myButton");
    button.width = "100px";
    button.height = "40px";
    button.cornerRadius = 20;
    button.color = "black";
    button.background = "blue";
    button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    // button text//
    const text = new BABYLON.GUI.TextBlock();
    text.text = "Click Me";
    text.color = "black";
    button.addControl(text);

    // Add the button to the UI
    advancedTexture.addControl(button);

    // Handle button click
    button.onPointerClickObservable.add(() => {
        console.log("Button clicked!");
    });



    /* ENABLE AR
    ---------------------------------------------------------------------------------------------------- */
    // STEP 2a: Start a WebXR session (immersive-ar, specifically)
    // const xr = await scene.createDefaultXRExperienceAsync({
    // uiOptions: {
    // sessionMode: "immersive-ar",
    // referenceSpaceType: "unbounded-floor"
    // },
    //STEP 2b: Enable optional features - either all of them with true (boolean), or as an array
    // optionalFeatures: true
    // });





    /* HIT-TEST
    ---------------------------------------------------------------------------------------------------- */
    // STEP 5: A hit-test is a standard feature in AR that permits a ray to be cast from the device (headset or phone) into the real world, and detect where it intersects with a real-world object. This enables AR apps to place objects on surfaces or walls of the real world (https://immersive-web.github.io/hit-test/). To enable hit-testing, use the enableFeature() method of the featuresManager from the base WebXR experience helper.
    const hitTest = xr.baseExperience.featuresManager.enableFeature(BABYLON.WebXRHitTest, "latest");
    // STEP 6a: Create a marker to show where a hit-test has registered a surface
    const marker = BABYLON.MeshBuilder.CreateTorus("marker", { diameter: 0.15, thickness: 0.05 }, scene);
    marker.isVisible = false;
    marker.rotationQuaternion = new BABYLON.Quaternion();
    // STEP 6b: Create a variable to store the latest hit-test results
    let latestHitTestResults = null;
    // STEP 6c: Add an event listener for the hit-test results
    hitTest.onHitTestResultObservable.add((results) => {
        // STEP 6d: If there is a hit-test result, turn on the marker, and extract the position, rotation, and scaling from the hit-test result
        if (results.length) {
            marker.isVisible = true;
            results[0].transformationMatrix.decompose(marker.scaling, marker.rotationQuaternion, marker.position);
            latestHitTestResults = results;
        } else {
            // STEP 6e: If there is no hit-test result, turn off the marker and clear the stored results
            marker.isVisible = false;
            latestHitTestResults = null;
        };
    });

    /* ANCHORS
    ---------------------------------------------------------------------------------------------------- */
    // STEP 7: Anchors are a feature that allow you to place objects in the real world space and have them stay there, even if the observer moves around. To enable anchors, use the enableFeature() method of the featuresManager from the base WebXR experience helper (https://immersive-web.github.io/anchors/).
    const anchors = xr.baseExperience.featuresManager.enableFeature(BABYLON.WebXRAnchorSystem, "latest");
    // STEP 8a: Add event listener for click (and simulate this in the Immersive Web Emulator)
    canvas.addEventListener("click", () => {
        if (latestHitTestResults && latestHitTestResults.length > 0) {
            // Create an anchor
            anchors.addAnchorPointUsingHitTestResultAsync(latestHitTestResults[0]).then((anchor) => {
                // STEP 8b: Attach the box to the anchor
                anchor.attachedNode = box;
            }).catch((error) => {
                console.log(error);
            });
        };
    });

    // Return the scene
    return scene;
};

// Continually render the scene in an endless loop
createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => sceneToRender.render());
});

// Add an event listener that adapts to the user resizing the screen
window.addEventListener("resize", function () {
    engine.resize();
});