import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { ActionManager } from "@babylonjs/core/Actions/actionManager";
import { ExecuteCodeAction } from "@babylonjs/core/Actions/directActions";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import "@babylonjs/core/Helpers/sceneHelpers";

import { HtmlMeshRenderer, HtmlMesh } from "babylonjs-addons"

let engine;
let scene;

const createScene = () => {
  const canvas = document.querySelector("canvas");
  engine = new Engine(canvas, true);

  // This creates a basic Babylon Scene object (non-mesh)
  scene = new Scene(engine);

  // It is critical to have a transparent clear color for HtmlMesh to work.
  scene.clearColor = new Color4(0, 0, 0, 0);

  scene.createDefaultCameraOrLight(true, true, true);
  scene.activeCamera.radius = 20;

  // Create the HtmlMeshRenderer
  const htmlMeshRenderer = new HtmlMeshRenderer(scene);

  // Shows how this can be used to include html content, such
  // as a form, in your scene.  This can be used to create
  // richer UIs than can be created with the standard Babylon
  // UI control, albeit with the restriction that such UIs would
  // not display in native mobile apps or XR applications.
  const htmlMeshDiv = new HtmlMesh(scene, "html-mesh-div");
  const div = document.createElement("div");
  div.innerHTML = `
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
    `;
  div.style.backgroundColor = "white";
  div.style.width = "480px";
  div.style.height = "360px";
  // Style the form

  htmlMeshDiv.setContent(div, 4, 3);
  htmlMeshDiv.position.x = -3;
  htmlMeshDiv.position.y = 2;

  // Shows how this can be used to include a PDF in your scene.  Note this is
  // conceptual only.  Displaying a PDF like this works, but any links in the
  // PDF will navigate the current tab, which is probably not what you want.
  // There are other solutions out there such as PDF.js that may give you more
  // control, but ultimately proper display of PDFs is not within the scope of
  // this project.
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  

  // Shows how to create an HTML Overlay by the fit strategy: FitStrategy.NONE
  const overlayMesh = new HtmlMesh(scene, "html-overlay-mesh", { isCanvasOverlay: true });
  const overlayMeshDiv = document.createElement("div");
  overlayMeshDiv.innerHTML = `<p>This is an overlay. It is positioned in front of the canvas This allows it to have transparency and to be non-rectangular, but it will always show over any other content in the scene</p>`;
  overlayMeshDiv.style.backgroundColor = "rgba(0,255,0,0.49)";
  overlayMeshDiv.style.width = "120px";
  overlayMeshDiv.style.height = "90px";
  overlayMeshDiv.style.display = "flex";
  overlayMeshDiv.style.alignItems = "center";
  overlayMeshDiv.style.justifyContent = "center";
  overlayMeshDiv.style.borderRadius = "20px";
  overlayMeshDiv.style.fontSize = "xx-small";
  overlayMeshDiv.style.padding = "10px";
  // Style the form

  overlayMesh.setContent(overlayMeshDiv, 4, 3);
  overlayMesh.position.x = 0;
  overlayMesh.position.y = 0;

  // Shows how to create an HTML Overlay by the fit strategy: FitStrategy.CONTAIN
  const overlayContainMesh = new HtmlMesh(scene, "html-overlay-mesh-contain", { isCanvasOverlay: true, fitStrategy: FitStrategy.CONTAIN });
  const overlayContainMeshDiv = document.createElement("div");
  overlayContainMeshDiv.innerHTML = `Contain: This is an overlay. It is positioned in front of the canvas This allows it to have transparency and to be non-rectangular, but it will always show over any other content in the scene`;
  overlayContainMeshDiv.style.width = "200px";
  overlayContainMeshDiv.style.display = "flex";
  overlayContainMeshDiv.style.alignItems = "center";
  overlayContainMeshDiv.style.justifyContent = "center";
  overlayContainMeshDiv.style.padding = "10px";
  overlayContainMeshDiv.style.backgroundColor = "rgba(25,0,255,0.49)";

  overlayContainMesh.setContent(overlayContainMeshDiv, 4, 3);
  overlayContainMesh.position.x = 0;
  overlayContainMesh.position.y = 3.5;
  overlayContainMesh.billboardMode = 7;

  // Shows how to create an HTML Overlay by the fit strategy: FitStrategy.COVER
  const overlayCoverMesh = new HtmlMesh(scene, "html-overlay-mesh-cover", { isCanvasOverlay: true, fitStrategy: FitStrategy.COVER });
  const overlayCoverMeshDiv = document.createElement("div");
  overlayCoverMeshDiv.innerHTML = `Cover: This is an overlay. It is positioned in front of the canvas This allows it to have transparency and to be non-rectangular, but it will always show over any other content in the scene`;
  overlayCoverMeshDiv.style.backgroundColor = "rgba(25,0,255,0.49)";
  overlayCoverMeshDiv.style.width = "150px";
  overlayCoverMeshDiv.style.display = "flex";
  overlayCoverMeshDiv.style.alignItems = "center";
  overlayCoverMeshDiv.style.justifyContent = "center";
  overlayCoverMeshDiv.style.padding = "10px";
  overlayCoverMeshDiv.style.overflow = "hidden";

  overlayCoverMesh.setContent(overlayCoverMeshDiv, 4, 3);
  overlayCoverMesh.position.x = -2.5;
  overlayCoverMesh.position.y = 7;
  overlayCoverMesh.billboardMode = 7;

  // Shows how to create an HTML Overlay by the fit strategy: FitStrategy.STRETCH
  const overlayStretchMesh = new HtmlMesh(scene, "html-overlay-mesh-stretch", { isCanvasOverlay: true, fitStrategy: FitStrategy.STRETCH });
  const overlayStretchMeshDiv = document.createElement("div");
  overlayStretchMeshDiv.innerHTML = `
  Stretch: This is an overlay. It is positioned in front of the canvas This allows it to have transparency and to be non-rectangular, but it will always show over any other content in the scene`;
  overlayStretchMeshDiv.style.backgroundColor = "rgba(25,0,255,0.49)";
  overlayStretchMeshDiv.style.width = "400px";
  overlayStretchMeshDiv.style.display = "flex";
  overlayStretchMeshDiv.style.alignItems = "center";
  overlayStretchMeshDiv.style.justifyContent = "center";
  overlayStretchMeshDiv.style.padding = "10px";

  overlayStretchMesh.setContent(overlayStretchMeshDiv, 4, 3);
  overlayStretchMesh.position.x = 2;
  overlayStretchMesh.position.y = 7;
  overlayStretchMesh.billboardMode = 7;
};

const startRenderLoop = () => {
  engine.runRenderLoop(() => {
    scene.render();
  });
};

createScene();
startRenderLoop();