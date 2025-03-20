

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);
    /*camera*/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);


    /*light*/
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    /*meshes*/





    /*sky*/



    /*Immersive AR */

    if (BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")) {
        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [largeGround],
            optionalFeatures: true
        });


    } else {
        console.log("Is not supported on this device.");
    };


    return scene;
};

/*Interactions*/