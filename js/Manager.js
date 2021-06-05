var mainScene;
var mainCamera;
var masterMeshPare;

var masterMesh = [];

var mainCameraAlpha = -Math.PI / 2;
var mainCameraBeta = 2 * Math.PI / 6;

function CreateScene(url, assetName) {
    var canvas = document.getElementById("babylonCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    engine.enableOfflineSupport = false;

    // Scene
    mainScene = new BABYLON.Scene(engine);
    mainScene.clearColor = new BABYLON.Color3(0, 0, 0);

    //mainScene.debugLayer.show();

    var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("Resources/HDR/Nature_HDR.env", mainScene);
    mainScene.environmentTexture = hdrTexture;

    // Camera
    mainCamera = new BABYLON.ArcRotateCamera("Camera", mainCameraAlpha, mainCameraBeta, 5, BABYLON.Vector3.Zero(), mainScene);
    mainCamera.attachControl(canvas, true);
    mainCamera.lowerRadiusLimit = 4;
    mainCamera.upperRadiusLimit = 10;

    masterMeshParent = new BABYLON.Mesh("masterMeshParent", mainScene);

    //Mesh Loader
    BABYLON.SceneLoader.ImportMesh("", url, assetName, mainScene, function(loadedMesh) {
        loadedMesh.sort();
        for (var i = 0; i < loadedMesh.length; i++) {
            masterMesh.push(loadedMesh[i]);
            masterMeshParent.addChild(loadedMesh[i]);
        }
        mainCamera.setTarget(masterMeshParent);
    });

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function() {
        mainScene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function() {
        engine.resize();
    });
}