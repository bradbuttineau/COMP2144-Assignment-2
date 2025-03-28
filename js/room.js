



/*Card 1*/
const createItemCard1 = () => {
    const card1 = BABYLON.MeshBuilder.CreateBox("box", { height: 3, width: 2, depth: 0.2 });
    card1.position = new BABYLON.Vector3(positionObject.x, positionObject.y, positionObject.z);
    card1.position = new BABYLON.Vector3(0, 2, 4);
    /*plane*/
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 3, width: 2 });
    plane.position.z = -0.11;
    plane.parent = card1;
    
    const advancedTexture = BABYLON.GUI.AdvanceDynamicTexture.createForMesh(plane);
    
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
    title.height = "100px"
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

    const button1 = BABYLON.GUI.Button.CreateSimpleButton("button1", "Toggle favorite");
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
/*Card 2*/
const createItemCard2 = () => {
    const card1 = BABYLON.MeshBuilder.CreateBox("box", { height: 3.2, width: 2, depth: 0.2 });
    card2.position = new BABYLON.Vector3(0, 2, 4);
    /*plane*/
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: 3.2, width: 2 });
    plane.position.z = -0.11;
    plane.position.y = 0.1;
    plane.parent = card1;
    const advancedTexture = BABYLON.GUI.AdvanceDynamicTexture.createForMesh(plane);
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

    window.addEventListener("DOMContentLoaded", async function () {
        // get the canvas DOM element
        var canvas = document.getElementById("renderCanvas");
        // load the 3D engine
        var engine = new BABYLON.Engine(canvas, true);
        // createScene function that creates and return the scene
        var createScene = async function () {
          // create a basic BJS Scene object
          var scene = new BABYLON.Scene(engine);
          scene.debugLayer.show();
          // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
          var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1.5, -5), scene);
      
          // target the camera to scene origin
          camera.setTarget(new BABYLON.Vector3(2, 1.5, 0));
          // attach the camera to the canvas
          camera.attachControl(canvas, false);
          // create a basic light, aiming 0,1,0 - meaning, to the sky
          var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
      
          // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
          var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);
          var material = new BABYLON.StandardMaterial(scene);
          material.alpha = 1;
          material.diffuseColor = new BABYLON.Color3.FromHexString("#9ba8b8");
          // material.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
          ground.material = material;
      
      
      
          // Add XR support
          // Enable XR
          var experience = await scene.createDefaultXRExperienceAsync({
            // define the floor meshes
            floorMeshes: [ground]
          });
      
          // return the created scene
          return scene;
        };
      
        // call the createScene function
        var scene = await createScene();
      
        // run the render loop
        engine.runRenderLoop(function () {
          scene.render();
        });
      
        // the canvas/window resize event handler
        window.addEventListener("resize", function () {
          engine.resize();
        });
      });
    
    
    
    


    
    
    


    return scene;
};

/*INTERACTIONS*/