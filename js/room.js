
const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(canvas, true);
//createScene// 
const createScene = async function () {

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    scene.createDefaultCameraOrLight(true, true, true);
    scene.activeCamera.radius = 20;

    //shapes for scene//   
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    var box = BABYLON.MeshBuilder.CreateBox("box", { size: 1 }, scene);
    var bg = BABYLON.MeshBuilder.CreatePlane("bg", { width: 1, height: 1 }, scene);
    var disc = BABYLON.MeshBuilder.CreateDisc("disc", { radius: 0.5 })

    bg.scaling.x = 12;
    bg.scaling.y = 16
    bg.position.z = 2

    sphere.position.x = 1.5;
    sphere.position.y = -0.5;
    sphere.position.z = 1.1;
    box.position.x = -3;
    box.position.y = 1;
    box.position.z = -2;
    disc.position.x = 1.7;
    disc.position.y = -2.6;
    disc.position.z = -1.1;

    // Add action manager to box so it can receive pointer events
    box.actionManager = new BABYLON.ActionManager(scene);
    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
            console.log("pointer over box");
        }));

    // Add action manager to disc so it can receive pointer events
    disc.actionManager = new BABYLON.ActionManager(scene);
    disc.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOverTrigger, (ev) => {
            console.log("pointer over disc");
        }));

    createHtmlMeshInstances(scene);


    /* ENABLE AR
    ---------------------------------------------------------------------------------------------------- */
    // STEP 2a: Start a WebXR session (immersive-ar, specifically)
    // const xr = await scene.createDefaultXRExperienceAsync({
    // uiOptions: {
    // sessionMode: "immersive-ar",

    // },
    //STEP 2b: Enable optional features - either all of them with true (boolean), or as an array
    // optionalFeatures: true
    // });


    // Return the scene
    return scene;
};
const createHtmlMeshInstances = (scene) => {
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card" style="width: 18rem;">
     <img src="./textures/WHMIS.jpg" class="card-img-top" alt="whims picture">
     <div class="card-body">
         <h5 class="card-title">WHIMS Safety</h5>
         <a href="./WHIMS.html" class="btn btn-primary">Go to module</a>
     </div>
 </div>`;

    div.style.backgroundColor = 'white';
    div.style.width = '480px';
    div.style.height = '360px';
    // Style the form

    htmlMeshDiv.setContent(div, 4, 3);
    htmlMeshDiv.position.x = -3;
    htmlMeshDiv.position.y = 2;

    // Shows how to create an HTML Overlay
    const overlayMesh = new ADDONS.HtmlMesh(scene, "html-overlay-mesh", { isCanvasOverlay: true });
    const overlayMeshDiv = document.createElement('div');
    overlayMeshDiv.innerHTML = `<p style="padding: 60px; font-size: 80px;">This is an overlay. It is positioned in front of the canvas. This allows it to have transparency and to be non-rectangular, but it will always show over any other content in the scene</p>`;
    overlayMeshDiv.style.backgroundColor = 'rgba(0,255,0,0.49)';
    overlayMeshDiv.style.width = '120px';
    overlayMeshDiv.style.height = '90px';
    overlayMeshDiv.style.display = 'flex';
    overlayMeshDiv.style.alignItems = 'center';
    overlayMeshDiv.style.justifyContent = 'center';
    overlayMeshDiv.style.borderRadius = '20px';
    overlayMeshDiv.style.fontSize = 'xx-small';
    overlayMeshDiv.style.padding = '10px';
    
    const htmlMeshDiv = new ADDONS.HtmlMesh(scene, "html-mesh-div");
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card" style="width: 18rem;">
   <img src="./textures/flame.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/flame_over_circle.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/gas_cylinder.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/corrosion.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/exploding_bomb.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/skull_and_crossbones.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/health_hazard.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/exclamation_mark.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="./textures/biohazardous_infectious_materials.gif" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="..." class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
   </div>
 </div>
 <div class="card" style="width: 18rem;">
   <img src="..." class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">Card title</h5>
     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
       content.
     </p>
     <a href="#" class="btn btn-primary">Go somewhere</a>
   </div>
</body>`;
    
    
    // Style the form

    overlayMesh.setContent(overlayMeshDiv, 4, 3);
    overlayMesh.position.z = -1.5;
}

// Continually render the scene in an endless loop
createScene().then((sceneToRender) => {
    engine.runRenderLoop(() => sceneToRender.render());
});

// Add an event listener that adapts to the user resizing the screen
window.addEventListener("resize", function () {
    engine.resize();
});