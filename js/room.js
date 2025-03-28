



/*Card 1*/

function createCards(scene, items) {
    // Create the 3D UI manager
    var anchor = new BABYLON.TransformNode("");
    var manager = new BABYLON.GUI.GUI3DManager(scene);
  
    var panel = new BABYLON.GUI.PlanePanel();
    panel.margin = 0.2;
  
    manager.addControl(panel);
    panel.linkToTransformNode(anchor);
    panel.position.z = -1.5;
  
    // Let's add some buttons!
    var addButton = function (item) {
      var button = new BABYLON.GUI.HolographicButton("orientation");
      panel.addControl(button);
      button.text = item.title;
    };
  
    panel.blockLayout = true;
    for (item of items) {
      console.log(item);
  
      addButton(item);
    }
    panel.blockLayout = false;
  }
  














  import SceneWrapper from "@/scenes/SceneWrapper.js";
  ...
  async mounted() {
      await SceneWrapper.createScene(document.getElementById("bjsCanvas"));
      SceneWrapper.sendStartButton(this.populate);
    },

















































/*Card 2*/
const createItemCard2 = () => {
    const card1 = BABYLON.MeshBuilder.CreateBox("detailed-card", { height: 3.2, width: 2, depth: 0.2 });
    card2.position = new BABYLON.Vector3(0, 2, 4);
    /*plane*/
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 3.2, width: 2 });
    plane.position.z = -0.11;
    plane.position.y = 0.1;
    plane.parent = card1;
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane, 2 * 512, 3.4 * 512);
    /*panel*/
    const panel = new BABYLON.GUI.StackPanel();
    panel.verticalAlignment = 0;
    advancedTexture.addControl(panel);
    const image = new BABYLON.GUI.Image("image", "textures\WHMIS.jpg");
    image.height = "600px";
    image.paddingTop = 40;
    image.paddingLeft = 40;
    image.paddingRight = 40;
    panel.addControl(image);
    const title = new BABYLON.GIU.TextBlock("title");
    title.text = "WHIMS Tutorial";
    title.color = "black";
    title.fontsize = 48;
    title.height = "110px"
    text.textHorizontalAlignment = 0;
    text.textVerticalAlignment = 0;
    title.paddingTop = 40;
    title.paddingLeft = 40;
    title.paddingRight = 40;
    panel.addControl(title);
    const description = new BABYLON.GIU.TextBlock("title");
    description.fontFamily = "Tahoma, sans-serif";
    description.text = "L bbb";
    description.textWrapping = true;
    description.color = "black";
    description.fontsize = 24;
    description.height = "660px";
    description.textHorizontalAlignment = 0;
    description.textVerticalAlignment = 0;
    description.paddingTop = 20;
    description.paddingLeft = 40;
    description.paddingRight = 40;
    panel.addControl(description);
    const button1 = BABYLON.GUI.Button.CreateSimpleButton("button2", "Toggle favorite");
    button1.width = 1;
    button1.height = "100px";
    button1.color = "black";
    button1.backgroundColor = "C62a88";
    button1.fontsize = 50;
    button1.paddingBottom = 20;
    button1.paddingLeft = 40;
    button1.paddingRight = 40;
    button1.onPointerUpObservable.add(function () {
        console.log("button1 clicked");
    });
    button1.verticalAlignment = 1;
    advancedTexture.addControl(button1);
};
const createScene = function () {
    const scene = new BABYLON.Scene(engine);


    /*CAMERA*/
    const camera = new BABYLON.ArchRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));

    camera.upperBetaLimit = Math.PI / 2.2;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50;
    camera.setPosition(new BABYLON.Vector3(0, 1.5, 0));
    camera.setTarget(new BABYLON.Vector3(0, 2, 4));
    camera.attachControl(CanvasCaptureMediaStreamTrack, true);

    /*LIGHT*/
    const light = new BABYLON.HemisphericLight("light");
    light.intensity = 0.7;

    createItemCard1();
    createItemCard2();

    /*IMMERSIVE AR */

    if (BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")) {
        const xr = scene.createDefaultXRExperienceAsync({
            floorMeshes: [largeGround],
            optionalFeatures: true
        });


    } else {
        console.log(" WebXR does not support this device.");
    };


    return scene;
};

/*INTERACTIONS*/