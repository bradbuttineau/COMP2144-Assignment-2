

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);
    /*CAMERA*/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);


    /*LIGHT*/
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    /*MESHES*/





    /*SKY*/
    //add skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150}, scene);
    //apply images
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
   

    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;

    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.material = skyboxMaterial;
    /*GROUND*/


    /*HOUSE*/

    //house view//
    //*NOTE using lesson 6 to make house//
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0); // rear face
    faceUV[1] = new BABYLON.Vector4(0.3, 0.0, 0.5, 1.0); // front face
    faceUV[2] = new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0); // right side
    faceUV[3] = new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0); // left side
    // construct house and roof//
    const box = BABYLON.MeshBuilder.CreateBox("box", { faceUV: faceUV, wrap: true });
    box.scaling = new BABYLON.Vector3(2, 1.5, 3);
    box.position = new BABYLON.Vector3(1, 0.75, 2)
    box.rotation.y = BABYLON.Tools.ToRadians(45);
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png");
    box.material = boxMat;

    //roof//
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
        diameter: 2.8,
        height: 3.5,
        tessellation: 3
    });
    roof.scaling.x = 0.75;
    roof.rotation.z = BABYLON.Tools.ToRadians(90);
    roof.rotation.y = BABYLON.Tools.ToRadians(-45);
    roof.position = new BABYLON.Vector3(1, 2, 2);
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    roofMat.specularColor = new BABYLON.Color3(0, 0, 0);
    roof.material = roofMat;

    const house = BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true);
    shadowGenerator.addShadowCaster(house, true);
    house1.receiveShadows = true;


    /*IMMERSIVE AR */

    if (BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")) {
        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [largeGround],
            optionalFeatures: true
        });


    } else {
        console.log(" WebXR does not support this device.");
    };


    return scene;
};

/*INTERACTIONS*/