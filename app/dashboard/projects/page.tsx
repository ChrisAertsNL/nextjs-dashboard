'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as OBC from 'openbim-components';

export default function ThreeJsScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Get the <div> element where the scene will be displayed
    const container = containerRef.current; // Accessing the current value of the ref
    // Initialize the basic components needed to use this library
    const components = new OBC.Components();
    components.scene = new OBC.SimpleScene(components);
    components.renderer = new OBC.SimpleRenderer(components, container);
    components.camera = new OBC.SimpleCamera(components);
    components.raycaster = new OBC.SimpleRaycaster(components);

    components.init();

    const scene = components.scene.get();
    scene.background = new THREE.Color('white');

    components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);

    //const grid = new OBC.SimpleGrid(components);

    //const boxMaterial = new THREE.MeshStandardMaterial({ color: '#BCF124' });
    //const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    //const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    //cube.position.set(0, 1.5, 0);
    //scene.add(cube);

    components.scene.setup();

    //IFCs importeren
    let fragments = new OBC.FragmentManager(components);
    let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);
    fragmentIfcLoader.setup(); //was await
    fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

    //const mainToolbar = new OBC.Toolbar(components, {
    //  name: 'Main Toolbar',
    //  position: 'bottom',
    //});
    //components.ui.addToolbar(mainToolbar);
    //const ifcButton = fragmentIfcLoader.uiElement.get('main');
    //mainToolbar.addChild(ifcButton);

    // Load IFC fragments
    loadIfcAsFragments(scene, fragmentIfcLoader);

    // Clean up function
    return () => {
      // Dispose Three.js objects and clean up any event listeners or other resources here
      components.dispose();
      fragments.dispose();
    };
  }, []);

  return (
    <>
      <p>Fascinatio Workstation 01: Wedi</p>
      <div ref={containerRef} />
    </>
  ); //style={{ width: '100%', height: '100%' }}
}

async function loadIfcAsFragments(
  scene: THREE.Scene,
  fragmentIfcLoader: OBC.FragmentIfcLoader,
) {
  const file = await fetch('/Fascinatio_Wedi_31-03-2024 13-31-08.ifc');
  console.log(file);
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const model = await fragmentIfcLoader.load(buffer);
  scene.add(model);
}
