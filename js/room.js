
var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
var createScene = async function () {
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 3, 25, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    //Create advance texture
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    advancedTexture.idealWidth = 1600;
    advancedTexture.renderAtIdealSize = true;
    if (window.innerWidth < 500) {
        await advancedTexture.parseFromSnippetAsync("E92W52");
        return scene;
    }

    await advancedTexture.parseFromSnippetAsync("I59XFB#11");

    var currentIndex = 8;
    var captions = [
        "\"These materials or products are prone to easy ignition and can burn rapidly. They should be handled with extra care and kept away from heat and open flames at all costs.\"",
        "\"Oxidizing materials are materials that are extremely reactive to oxygen, and generate a large amount of heat when they come into contact with the element, even under mild conditions. These materials do not burn themselves, but will improve the likelihood of combustible materials around them for caching fire such as wood, textiles or other flammable materials, with lower levels of heat needed to catch fire.\"",
        "\"This symbol is used to identify that the gas contained in a cylinder or other similar storage device is under high pressure and will be sensitive to punctures or leaks, providing the risk of explosions or allowing the cylinder to turn into a makeshift projectile if the container is compromised. Often times the gases contained within these cylinders are hazardous themselves so other hazard labels are often accompanied by a gas cylinder label.\"",
        "\"This signifies that the material can chemically react to materials or skin, destroying them in the process. \"",
        "\"The symbol of an object exploding is used to clearly signify that the material is explosive and risks combusting when handled improperly. \"",
        "\"This symbol has long been associated with death and it is used in materials labelling to warn you that the relevant product has potential to be fatal, toxic, or extremely harmful even with a limited exposure. \"",
        "\"These materials will cause chronic health effects from disease, sickness, cancer, infertility, and more. \"",
        "\"his symbol signifies less severe health effects from exposure including irritation, inflammation, coughing etc. Effects of exposure to these materials are generally treatable and have less of risk for long term chronic health effects compared to materials under the WHMIS 2015 health hazard label. \"",
        "\"This iconic symbol signifies that the material contains organisms harmful to our health by causing disease or other serious illnesses.\""];

    var titles = [
        "Flame",
        "Flame over circle",
        "Gas cylinder",
        "Corrosion",
        "Exploding Bomb",
        "Skull and crossbones",
        "Health hazard",
        "Exclamation mark",
        "Biohazard infections materails"
    ]

    //Create gradient background
    var rect1 = new BABYLON.GUI.Rectangle();
    var gradient = new BABYLON.GUI.LinearGradient(0, 0, 1000, 1000);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "#bbb");
    rect1.backgroundGradient = gradient;
    advancedTexture.addControl(rect1);

    let children = advancedTexture.getChildren()[0].children;
    var title = children.filter(control => control.name === "Title")[0];
    var caption = children.filter(control => control.name === "Caption")[0];

    var nextButton = children.filter(control => control.name === "Next")[0];
    var backButton = children.filter(control => control.name === "Back")[0];
    var mainPainting = children.filter(control => control.name === "MainPainting")[0];
    var paintings = children.filter(control => control.name === "Painting");
    var background = children.filter(control => control.name === "Background")[0];

    for (let i = 0; i < paintings.length; ++i) {
        paintings[i].onPointerClickObservable.add((evt) => {
            addshadow(paintings[currentIndex], 0);
            currentIndex = i;
            caption.text = captions[currentIndex];
            title.text = titles[currentIndex];
            mainPainting.source = paintings[currentIndex].source;
            addshadow(paintings[currentIndex], 5);
            resetZoom();
        });

    }

    var view = children.filter(control => control.name === "View")[0];
    caption.text = captions[currentIndex];

    function addshadow(painting, value) {
        painting.shadowOffsetX = value;
        painting.shadowOffsetY = value;
        painting.shadowBlur = value;
    }
    nextButton.onPointerClickObservable.add((evt) => {
        addshadow(paintings[currentIndex], 0);
        currentIndex++;
        if (currentIndex >= captions.length) currentIndex = 0;
        caption.text = captions[currentIndex];
        title.text = titles[currentIndex];
        mainPainting.source = paintings[currentIndex].source;
        addshadow(paintings[currentIndex], 5);
        resetZoom();
    });

    backButton.onPointerClickObservable.add((evt) => {
        addshadow(paintings[currentIndex], 0);
        currentIndex--;
        if (currentIndex < 0) currentIndex = captions.length - 1;
        caption.text = captions[currentIndex];
        title.text = titles[currentIndex];
        mainPainting.source = paintings[currentIndex].source;
        addshadow(paintings[currentIndex], 5);
        resetZoom();
    });

    background.onPointerClickObservable.add((evt) => {
        resetZoom();
    });

    var defaultPosX = mainPainting.leftInPixels;
    var defaultPosY = mainPainting.topInPixels;
    view.onPointerClickObservable.add((evt) => {
        mainPainting.scaleX = 0.35;
        mainPainting.scaleY = 0.35;
        mainPainting.zIndex = 5;
        mainPainting.leftInPixels = 0;
        mainPainting.topInPixels = 0;
        mainPainting.shadowBlur = 500;
        background.background = "black";
        background.zIndex = 3;
        background.alpha = 0.3;
    });

    function resetZoom() {
        mainPainting.scaleX = 0.15;
        mainPainting.scaleY = 0.15;
        mainPainting.leftInPixels = defaultPosX;
        mainPainting.topInPixels = defaultPosY;
        mainPainting.shadowBlur = 0;
        background.alpha = 0.0;
        background.zIndex = 0;
    }
    return scene;
};

window.initFunction = async function () {



    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();

    const engineOptions = window.engine.getCreationOptions?.();
    if (!engineOptions || engineOptions.audioEngine !== false) {

    }
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {
    scene.then(returnedScene => { sceneToRender = returnedScene; });

});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
})
