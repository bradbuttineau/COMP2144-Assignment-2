

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

    /*CAMERA*/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);


    /* SKY*/
    
    const skybox = BABYLON.MeshBuilder.CreateBox("skybox", { size: 150 }, scene);
   
    const skyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skybox", scene);
    
    
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // STEP 7d: Set the skybox material property
    skybox.material = skyboxMaterial;
    /*LIGHT*/
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    //make a shadow with direction of light
    const lightShadow = new BABYLON.DirectionalLight("directional", new BABYLON.Vector3(0, -1, 1), scene);
    lightShadow.position = new BABYLON.Vector3(0, 50, -100);
    const shadowGenerator = new BABYLON.shadowGenerator(1024, lightShadow);
    //edge shadow
    shadowGenerator.usePoissonSampling = true;

    /*MESHES*/


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