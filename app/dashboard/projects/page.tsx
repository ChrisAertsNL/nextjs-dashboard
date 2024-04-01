'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as OBC from 'openbim-components';

export default function ThreeJsScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // Accessing the current value of the ref
    const components = new OBC.Components();

    if (container !== null) {
      components.scene = new OBC.SimpleScene(components);
      components.renderer = new OBC.SimpleRenderer(components, container);
      components.camera = new OBC.SimpleCamera(components);
      components.raycaster = new OBC.SimpleRaycaster(components);
    } else {
      console.error('Container is null. Cannot initialize renderer.');
    }

    components.init();

    const scene = components.scene.get();
    scene.background = new THREE.Color('white');

    (components.camera as any).controls.setLookAt(4, 4, 4, 0, 0, 0); //zorgt voor de zoom

    //components.scene.setup(); //staat uit, zorgt voor verlichting
    (components.scene as any).setup();

    //IFCs importeren
    let fragments = new OBC.FragmentManager(components);
    let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);
    fragmentIfcLoader.setup(); //was await
    fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    //fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;

    // Load IFC fragments
    loadIfcAsFragments(
      scene,
      fragmentIfcLoader,
      '/Fascinatio_Wedi_31-03-2024 13-31-08.ifc',
    );

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
      <div
        ref={containerRef}
        style={{
          width: '70vw',
          height: '70vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      />
    </>
  );
}

async function loadIfcAsFragments(
  scene: THREE.Scene,
  fragmentIfcLoader: OBC.FragmentIfcLoader,
  link: string,
) {
  const file = await fetch(link);
  console.log(file);
  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);
  const model = await fragmentIfcLoader.load(buffer);

  // Traverse through the model and add wireframe to each mesh

  /*model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const edges = new THREE.EdgesGeometry(child.geometry);
      const wireframe = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000 }),
      );

      wireframe.applyMatrix4(child.matrixWorld);

      child.add(wireframe);
    }
  });*/
  close;
  scene.add(model);
}
