// variável que obtém a tag onde as informações vão ser exibidas depois que for clicado qualquer planeta
const modal = document.getElementById('modal');
const planetsinfo = {
    Sol: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Mercurio: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Venus: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Terra: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Marte: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Jupiter: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Saturno: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Urano: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Neptuno: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
    Plutao: { diametro: 0, posicao: { x: 0, y: 0, z: 0 }, massa: 0, dist_sol: 0 },
}
//Variável para parar ou excutar a função animate
let stopAnimation = false;

// criamos o carregador das texturas
const textureLoader = new THREE.TextureLoader();


// Criamos a cena
const scene = new THREE.Scene();
// Criamos a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Afastamos a câmara definindo valor para o eixo z
camera.position.z = 50;
// criamos o renderizador
const renderer = new THREE.WebGLRenderer();
// definimos o tamanho a partir do tamanho da janela
renderer.setSize(window.innerWidth, window.innerHeight);


// adicionamos o renderizador ao corpo do html
document.body.appendChild(renderer.domElement);

//Relação da distância média de cada planeta ao Sol com a Terra
const distanceRelative = {
    mercury: 0.389,
    venus: 0.72,
    earth: 1,
    mars: 1.52,
    jupiter: 5.187,
    saturn: 9.533,
    uranus: 19.133,
    neptune: 30,
    pluto: 39.333
};

//Relação do raio de cada planeta e do Sol com a Terra
const radiusRelative = {
    sun: 109.078,
    mercury: 0.383,
    venus: 0.949,
    earth: 1,
    mars: 0.532,
    jupiter: 11.21,
    saturn: 9.45,
    uranus: 4.01,
    neptune: 3.88,
    pluto: 0.187
};

//Relação da velocidade de rotação de cada planeta e do Sol com a Terra
const rotationRelative = {
    sun: 1.269,
    mercury: 0.007,
    venus: -0.004,
    earth: 1,
    mars: 0.550,
    jupiter: 28.960,
    saturn: 23.405,
    uranus: -9.380,
    neptune: 6.175,
    pluto: -0.030
};

//Velocidade rotação da Terra
const rotationEarth = 0.05;

//Velocidade rotação do Sol
const rotationSun = rotationEarth * rotationRelative.sun;

//Velocidade dos restantes planetas
const rotationMercury = rotationEarth * rotationRelative.mercury;
const rotationVenus = rotationEarth * rotationRelative.venus;
const rotationMars = rotationEarth * rotationRelative.mars;
const rotationJupiter = rotationEarth * rotationRelative.jupiter;
const rotationSaturn = rotationEarth * rotationRelative.saturn;
const rotationUranus = rotationEarth * rotationRelative.uranus;
const rotationNeptune = rotationEarth * rotationRelative.neptune;
const rotationPluto = rotationEarth * rotationRelative.pluto;

//Raio da Terra
const radiusEarth = 2;

//Raio do Sol
const radiusSun = radiusEarth * radiusRelative.sun * 0.02;

//Raio dos restantes planetas
const radiusMercury = radiusEarth * radiusRelative.mercury;
const radiusVenus = radiusEarth * radiusRelative.venus;
const radiusMars = radiusEarth * radiusRelative.mars;
const radiusJupiter = radiusEarth * radiusRelative.jupiter;
const radiusSaturn = radiusEarth * radiusRelative.saturn;
const radiusUranus = radiusEarth * radiusRelative.uranus;
const radiusNeptune = radiusEarth * radiusRelative.neptune;
const radiusPluto = radiusEarth * radiusRelative.pluto;

//Distância média da Terra ao Sol
const distanceEarth = 20;

//Distância média dos rstantes planetas ao Sol
const distanceMercury = distanceEarth * distanceRelative.mercury;
const distanceVenus = distanceEarth * distanceRelative.venus;
const distanceMars = distanceEarth * distanceRelative.mars;
const distanceJupiter = distanceEarth * distanceRelative.jupiter;
const distanceSaturn = distanceEarth * distanceRelative.saturn;
const distanceUranus = distanceEarth * distanceRelative.uranus;
const distanceNeptune = distanceEarth * distanceRelative.neptune;
const distancePluto = distanceEarth * distanceRelative.pluto;

//Material para todos os planetas pais
const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });

// Criamos o sol
const sunGeometry = new THREE.SphereGeometry(radiusSun, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/sol.jpg')
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.name = 'Sol';
sun.mass = "1.99e30";
sun.rotation.y = rotationSun;
scene.add(sun);

// Cria os planetas
// Mercúrio
const mercuryGeometryParent = new THREE.SphereGeometry(radiusMercury, 32, 32);
const mercuryParent = new THREE.Mesh(mercuryGeometryParent, material);
mercuryParent.position.set(distanceMercury, 0, 0);
mercuryParent.name = "Mercurio";
mercuryParent.mass = "3.3e23";
// mercuryParent.rotation.y = rotationMercury;
// mercuryParent.position.set(10, 0, 0);

const mercuryGeometryChild = new THREE.SphereGeometry(radiusMercury, 32, 32);
const mercuryMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/mercurio.jpg')
});
const mercuryChild = new THREE.Mesh(mercuryGeometryChild, mercuryMaterialChild);
mercuryChild.position.set(0, 0, 0);

mercuryParent.add(mercuryChild);
scene.add(mercuryParent);


//Criar a malha da orbita de Mercúrio

// Criar a geometria da malha da orbita
const ringGeometry1 = new THREE.RingGeometry(distanceMercury, distanceMercury - 0.5, 50);
//Criar um material para a malha da orbita
const ringMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, });
// Criar a malha do anel
const ringMesh1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
// Posicionar a malha da orbita
ringMesh1.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh1);



// Venus
const venusGeometryParent = new THREE.SphereGeometry(2, 32, 32);
const venusParent = new THREE.Mesh(venusGeometryParent, material);
// venusParent.name = "Vénus";
venusParent.position.set(distanceVenus, 0, 0);
venusParent.name = "Venus";
venusParent.mass = "4.87e24";
// venusParent.rotation.y = rotationVenus;
// venusParent.position.set(15, 0, 0);

const venusGeometryChild = new THREE.SphereGeometry(2, 32, 32);
const venusMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/venus.jpg')
});
const venusChild = new THREE.Mesh(venusGeometryChild, venusMaterialChild);
venusChild.position.set(0, 0, 0);

venusParent.add(venusChild);
scene.add(venusParent);

//Criar a malha da orbita de Vénus

// Criar a geometria da malha da orbita
const ringGeometry2 = new THREE.RingGeometry(distanceVenus, distanceVenus - 0.5, 50);
// Criar a malha do anel
const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial1);
// Posicionar a malha da orbita
ringMesh2.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh2);


// Terra
const earthGeometryParent = new THREE.SphereGeometry(2, 32, 32);
const earthParent = new THREE.Mesh(earthGeometryParent, material);
earthParent.name = "Terra";
earthParent.position.set(distanceEarth, 0, 0);
earthParent.mass = "5.97e24";
// earthParent.rotation.y = rotationEarth;
// earthParent.position.set(20, 0, 0);

const earthGeometryChild = new THREE.SphereGeometry(2, 32, 32);
const earthMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/earth.jpg')
});
const earthChild = new THREE.Mesh(earthGeometryChild, earthMaterialChild);
earthChild.position.set(0, 0, 0);

earthParent.add(earthChild);
scene.add(earthParent);

//Criar a malha da orbita da Terra

// Criar a geometria da malha da orbita
const ringGeometry3 = new THREE.RingGeometry(distanceEarth, distanceEarth - 0.5, 50);
// Criar a malha do anel
const ringMesh3 = new THREE.Mesh(ringGeometry3, ringMaterial1);
// Posicionar a malha da orbita
ringMesh3.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh3);


// Marte
const marsGeometryParent = new THREE.SphereGeometry(1.5, 32, 32);
const marsParent = new THREE.Mesh(marsGeometryParent, material);
marsParent.name = "Marte";
// marsParent.position.set(25, 0, 0);
marsParent.position.set(distanceMars, 0, 0);
marsParent.mass = "6.42e23";
// marsParent.rotation.y = rotationMars;

const marsGeometryChild = new THREE.SphereGeometry(1.5, 32, 32);
const marsMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/marte.jpg')
});
const marsChild = new THREE.Mesh(marsGeometryChild, marsMaterialChild);
marsChild.position.set(0, 0, 0);

marsParent.add(marsChild);
scene.add(marsParent);

//Criar a malha da orbita de Marte

// Criar a geometria da malha da orbita
const ringGeometry4 = new THREE.RingGeometry(distanceMars, distanceMars - 0.5, 50);
// Criar a malha do anel
const ringMesh4 = new THREE.Mesh(ringGeometry4, ringMaterial1);
// Posicionar a malha da orbita
ringMesh4.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh4);


// Jupiter
const jupiterGeometryParent = new THREE.SphereGeometry(3, 32, 32);
const jupiterParent = new THREE.Mesh(jupiterGeometryParent, material);
jupiterParent.name = "Jupiter";
jupiterParent.position.set(distanceJupiter, 0, 0);
jupiterParent.mass = "1.9e27";
// jupiterParent.rotation.y = rotationJupiter;
// jupiterParent.position.set(35, 0, 0);

const jupiterGeometryChild = new THREE.SphereGeometry(3, 32, 32);
const jupiterMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/jupiter.jpg')
});
const jupiterChild = new THREE.Mesh(jupiterGeometryChild, jupiterMaterialChild);
jupiterChild.position.set(0, 0, 0);

jupiterParent.add(jupiterChild);
scene.add(jupiterParent);

//Criar a malha da orbita de Júpiter

// Criar a geometria da malha da orbita
const ringGeometry5 = new THREE.RingGeometry(distanceJupiter, distanceJupiter - 0.5, 80);
// Criar a malha do anel
const ringMesh5 = new THREE.Mesh(ringGeometry5, ringMaterial1);
// Posicionar a malha da orbita
ringMesh5.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh5);


// Saturno
const saturnGeometryParent = new THREE.SphereGeometry(2.5, 32, 32);
const saturnParent = new THREE.Mesh(saturnGeometryParent, material);
saturnParent.name = "Saturno";
saturnParent.position.set(distanceSaturn, 0, 0);
saturnParent.mass = "5.68e26";
// saturnParent.rotation.y = rotationSaturn;
// saturnParent.position.set(45, 0, 0);


const saturnGeometryChild = new THREE.SphereGeometry(2.5, 32, 32);
const saturnMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/saturn.jpg')
});
const saturnChild = new THREE.Mesh(saturnGeometryChild, saturnMaterialChild);
saturnChild.position.set(0, 0, 0);
saturnChild.rotation.z = 0;
//Criar um material para o anel
const ringMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/ring_saturn.png'),
    transparent: false,
    opacity: 0.5
});

// Criar a geometria do anel
const ringGeometry = new THREE.RingGeometry(1.8 * 2.5, 2.5 * 2.5, 32);
// Criar a malha do anel
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
// Posicionar o anel acima do plano do equador
ringMesh.rotation.x = Math.PI / 2;
// Adicionar o anel como um objeto filho do planeta Saturno
saturnChild.add(ringMesh);
saturnParent.add(saturnChild);
scene.add(saturnParent);

//Criar a malha da orbita de Saturno

// Criar a geometria da malha da orbita
const ringGeometry6 = new THREE.RingGeometry(distanceSaturn, distanceSaturn - 0.5, 80);
// Criar a malha do anel
const ringMesh6 = new THREE.Mesh(ringGeometry6, ringMaterial1);
// Posicionar a malha da orbita
ringMesh6.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh6);

// Urano
const uranoGeometryParent = new THREE.SphereGeometry(2, 32, 32);
const uranusParent = new THREE.Mesh(uranoGeometryParent, material);
// uranusParent.position.set(55, 0, 0);
uranusParent.position.set(distanceUranus, 0, 0);
uranusParent.mass = "8.68e25";
// uranusParent.rotation.y = rotationUranus;
uranusParent.name = "Urano";

const uranusGeometryChild = new THREE.SphereGeometry(2, 32, 32);
const uranusMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/urano.jpg')
});
const uranusChild = new THREE.Mesh(uranusGeometryChild, uranusMaterialChild);
uranusChild.position.set(0, 0, 0);

uranusParent.add(uranusChild);
scene.add(uranusParent);

//Criar a malha da orbita de Urano

// Criar a geometria da malha da orbita
const ringGeometry7 = new THREE.RingGeometry(distanceUranus, distanceUranus - 0.5, 90);
// Criar a malha do anel
const ringMesh7 = new THREE.Mesh(ringGeometry7, ringMaterial1);
// Posicionar a malha da orbita
ringMesh7.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh7);


// Neptuno
const neptuneGeometryParent = new THREE.SphereGeometry(2, 32, 32);
const neptuneParent = new THREE.Mesh(neptuneGeometryParent, material);
neptuneParent.name = "Neptuno";
neptuneParent.position.set(distanceNeptune, 0, 0);
neptuneParent.mass = "1.02e26";
// neptuneParent.rotation.y = rotationNeptune;
// neptuneParent.position.set(65, 0, 0);

const neptuneGeometryChild = new THREE.SphereGeometry(2, 32, 32);
const neptuneMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/neptuno.jpg')
});
const neptuneChild = new THREE.Mesh(neptuneGeometryChild, neptuneMaterialChild);
neptuneChild.position.set(0, 0, 0);

neptuneParent.add(neptuneChild);
scene.add(neptuneParent);

//Criar a malha da orbita de Neptuno

// Criar a geometria da malha da orbita
const ringGeometry8 = new THREE.RingGeometry(distanceNeptune, distanceNeptune - 0.5, 90);
// Criar a malha do anel
const ringMesh8 = new THREE.Mesh(ringGeometry8, ringMaterial1);
// Posicionar a malha da orbita
ringMesh8.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh8);


// Plutao
const plutoGeometryParent = new THREE.SphereGeometry(0.5, 32, 32);
const plutoParent = new THREE.Mesh(plutoGeometryParent, material);
plutoParent.name = "Plutao";
plutoParent.position.set(distancePluto, 0, 0);
plutoParent.mass = "1.3e22";
// plutoChild.rotation.y = rotationPluto;
// plutoParent.position.set(75, 0, 0);

const plutoGeometryChild = new THREE.SphereGeometry(0.5, 32, 32);
const plutoMaterialChild = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map: textureLoader.load('./img/plutao_1.jpg')
});
const plutoChild = new THREE.Mesh(plutoGeometryChild, plutoMaterialChild);
plutoChild.position.set(0, 0, 0);

plutoParent.add(plutoChild);
scene.add(plutoParent);

//Criar a malha da orbita de Plutão

// Criar a geometria da malha da orbita
const ringGeometry9 = new THREE.RingGeometry(distancePluto, distancePluto - 0.5, 90);
// Criar a malha do anel
const ringMesh9 = new THREE.Mesh(ringGeometry9, ringMaterial1);
// Posicionar a malha da orbita
ringMesh9.rotation.x = Math.PI / 2;
// Adicionar a malha da orbita como um objeto filho do sol
sun.add(ringMesh9);


const planets = [sun, mercuryParent, venusParent, earthParent, marsParent, jupiterParent, saturnParent, uranusParent, neptuneParent, plutoParent];

animate();

// Animação do sistema solar
function animate() {

    //Velocidade da Terra
    var x = 0.00006;

    //Relação da velocidade orbital de cada planeta com a Terra
    const speedRelative = {
        mercury: 1.60738255,
        venus: 1.71449664,
        earth: 1,
        mars: 0.808724832,
        jupiter: 0.439597315,
        saturn: 0.325503356,
        uranus: 0.228187919,
        neptune: 0.181208054,
        pluto: 0.159060403,
    };
    // if (!stopAnimation) { //Enquanto for falsa a nimação é executada
        requestAnimationFrame(animate);
        // Rotação dos planetas em torno do sol
        mercuryParent.position.x = Math.sin(Date.now() * (x * speedRelative.mercury)) * distanceMercury;
        mercuryParent.position.z = Math.cos(Date.now() * (x * speedRelative.mercury)) * distanceMercury;

        venusParent.position.x = Math.sin(Date.now() * (x * speedRelative.venus)) * distanceVenus;
        venusParent.position.z = Math.cos(Date.now() * (x * speedRelative.venus)) * distanceVenus;

        earthParent.position.x = Math.sin(Date.now() * x) * distanceEarth;
        earthParent.position.z = Math.cos(Date.now() * x) * distanceEarth;

        marsParent.position.x = Math.sin(Date.now() * (x * speedRelative.mars)) * distanceMars;
        marsParent.position.z = Math.cos(Date.now() * (x * speedRelative.mars)) * distanceMars;

        jupiterParent.position.x = Math.sin(Date.now() * (x * speedRelative.jupiter)) * distanceJupiter;
        jupiterParent.position.z = Math.cos(Date.now() * (x * speedRelative.jupiter)) * distanceJupiter;

        saturnParent.position.x = Math.sin(Date.now() * (x * speedRelative.saturn)) * distanceSaturn;
        saturnParent.position.z = Math.cos(Date.now() * (x * speedRelative.saturn)) * distanceSaturn;

        uranusParent.position.x = Math.sin(Date.now() * (x * speedRelative.uranus)) * distanceUranus;
        uranusParent.position.z = Math.cos(Date.now() * (x * speedRelative.uranus)) * distanceUranus;

        neptuneParent.position.x = Math.sin(Date.now() * (x * speedRelative.neptune)) * distanceNeptune;
        neptuneParent.position.z = Math.cos(Date.now() * (x * speedRelative.neptune)) * distanceNeptune;

        plutoParent.position.x = Math.sin(Date.now() * (x * speedRelative.pluto)) * distancePluto;
        plutoParent.position.z = Math.cos(Date.now() * (x * speedRelative.pluto)) * distancePluto;

        //Rotação dos plenatas em torno dos seus eixos
        mercuryChild.rotation.y += rotationMercury
        venusChild.rotation.y += rotationVenus
        earthChild.rotation.y += rotationEarth
        marsChild.rotation.y += rotationMars
        jupiterChild.rotation.y += rotationJupiter
        saturnChild.rotation.y += rotationSaturn
        uranusChild.rotation.y += rotationUranus
        neptuneChild.rotation.y += rotationNeptune
        plutoChild.rotation.y += rotationPluto
        console.log(mercuryChild.rotation.y)
    // }


    planets.forEach(function (planet) {


        // Calcula a distância do planeta em relação ao sol
        const planetPosition = new THREE.Vector3();
        planetPosition.setFromMatrixPosition(planet.matrixWorld);
        const distanceFromSun = (planetPosition.distanceTo(sun.position) / distanceEarth) * 150000000;


        // Calcula a quantas horas dura o dia do planeta
        let rotation = (planet.rotation.y / rotationEarth) * 23.9;
        // adiciona as informações do planeta na div
        let raio = (planet.geometry.parameters.radius / radiusEarth) * 6371;

        planetsinfo[planet.name]["diametro"] = (raio * 2).toFixed(0)
        planetsinfo[planet.name]["posicao"]["x"] = planetPosition.x.toFixed(2)
        planetsinfo[planet.name]["posicao"]["y"] = planetPosition.y.toFixed(2)
        planetsinfo[planet.name]["posicao"]["z"] = planetPosition.z.toFixed(2)
        planetsinfo[planet.name]["massa"] = planet.mass
        planetsinfo[planet.name]["dist_sol"] = (distanceFromSun / 1000000).toFixed(2)
    })

    renderer.render(scene, camera); //É renderizada as novas posições de cada planeta
}




// Cria um objeto de raio infinito para detectar cliques nos planetas
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Atualiza a posição do mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Verifica se o raio do mouse intersecta com algum planeta
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    // Se algum planeta foi clicado, exibe sua informação
    if (intersects.length > 0) {
        // stopAnimation = true;
        const planet = intersects[0].object;
        // Calcula a distância do planeta em relação ao sol
        const planetPosition = new THREE.Vector3();
        planetPosition.setFromMatrixPosition(planet.matrixWorld);
        const distanceFromSun = (planetPosition.distanceTo(sun.position) / distanceEarth) * 150000000;


        // Calcula a quantas horas dura o dia do planeta
        var rotation = (planet.rotation.y / rotationEarth) * 23.9;
        // adiciona as informações do planeta na div
        var raio = (planet.geometry.parameters.radius / radiusEarth) * 6371;
        modal.innerHTML = `
            <h2>${planet.name}</h2>
            <ul>
                <li>Diâmetro: ${(raio * 2).toFixed(0)} km</li>
                <li>Posição: X: ${planetPosition.x.toFixed(2)} Y: ${planetPosition.y.toFixed(2)} Z: ${planetPosition.z.toFixed(2)}</li>
                <li>Massa: ${planet.mass} kg</li>
                <li>Distância do Sol: ${(distanceFromSun / 1000000).toFixed(2)} milhões de km</li>
            </ul>`;
        modal.style.display = 'block';
        // adiciona a div à página
        //document.body.appendChild(modal);


    }
}
// Evento para esconder a div que mostra as informações de um planeta quando este for clicado e chamar a função de animação de novo
document.addEventListener('click', function (event) {
    const id = event.target.id;
    if (event.target != modal && id != "Sol" && id != "Mercurio" && id != "Venus" && id != "Terra" && id != "Marte" && id != "Jupiter" && id != "Saturno" && id != "Urano" && id != "Plutao") {
        modal.style.display = 'none';
        // stopAnimation = false;
        // animate();
    }
});

window.addEventListener('click', onMouseClick, false);


moveKeyBoard();
function moveKeyBoard() {
    // Adicione um ouvinte de evento para o evento keydown
    // Crie uma variável para armazenar a velocidade da câmera
    const cameraSpeed = 0.1;

    // Adicione um ouvinte de evento para o evento keydown
    window.addEventListener('keydown', (event) => {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case 37: // tecla esquerda
                camera.position.x -= cameraSpeed;
                break;
            case 38: // tecla para cima
                camera.position.y += cameraSpeed;
                break;
            case 39: // tecla direita
                camera.position.x += cameraSpeed;
                break;
            case 40: // tecla para baixo
                camera.position.y -= cameraSpeed;
                break;
            case 65: // tecla "A"
                camera.rotation.y += cameraSpeed;
                break;
            case 68: // tecla "D"
                camera.rotation.y -= cameraSpeed;
                break;
            case 87: // tecla "W"
                camera.rotation.x -= cameraSpeed;
                break;
            case 83: // tecla "S"
                camera.rotation.x += cameraSpeed;
                break;
            case 81: // tecla "Q"
                camera.rotation.z += cameraSpeed;
                break;
            case 69: // tecla "E"
                camera.rotation.z -= cameraSpeed;
                break;
        }
    });
}

// Posição incial da cena
scene.rotation.y = -0.18;
scene.rotation.x = 0.53

scene.position.x = -0.5
scene.position.z = -20
camera.position.y = -4
// cena.innerHTML = "<br>X: " + scene.rotation.y.toFixed(2) + "<br>Y: " + scene.rotation.x.toFixed(2) + "<br>Z: " + scene.rotation.z.toFixed(2);

rotMouse();
function rotMouse() {
    // Crie uma variável para armazenar a posição do mouse
    const mousePosition = { x: null, y: null };
    // Adicione ouvintes de eventos para os eventos mousedown, mousemove e mouseup
    window.addEventListener('mousedown', (event) => {
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
    });

    window.addEventListener('mousemove', (event) => {
        if (mousePosition.x !== null && mousePosition.y !== null) {
            const deltaX = event.clientX - mousePosition.x;
            const deltaY = event.clientY - mousePosition.y;

            scene.rotation.y += deltaX * 0.01;
            scene.rotation.x += deltaY * 0.01;

            // cena.innerHTML = "<br>X: " + scene.rotation.y.toFixed(2) + "<br>Y: " + scene.rotation.x.toFixed(2) + "<br>Z: " + scene.rotation.z.toFixed(2);
            mousePosition.x = event.clientX;
            mousePosition.y = event.clientY;
        }
    });

    window.addEventListener('mouseup', (event) => {
        mousePosition.x = null;
        mousePosition.y = null;
    });

}

moveScene();
// Adicione um ouvinte de eventos para o evento wheel
function moveScene() {

    window.addEventListener('wheel', (event) => {
        const delta = event.deltaY;

        // Se a direção do scroll é para cima, afaste a câmera da cena
        if (delta < 0) {
            camera.position.z -= 20;
        }

        // Se a direção do scroll é para baixo, aproxime a câmera da cena
        if (delta > 0) {
            camera.position.z += 20;

        }

    });
}

window.infoPlanet = function (e) {

    // console.log(planetsinfo[e.id]);
    modal.innerHTML = `
            <h2>${e.id}</h2>
            <ul>
                <li>Diâmetro: ${planetsinfo[e.id]["diametro"]} km</li>
                <li>Posição: X: ${planetsinfo[e.id]["posicao"]["x"]} Y: ${planetsinfo[e.id]["posicao"]["y"]} Z: ${planetsinfo[e.id]["posicao"]["z"]}</li>
                <li>Massa: ${planetsinfo[e.id]["massa"]} kg</li>
                <li>Distância do Sol: ${planetsinfo[e.id]["dist_sol"]} milhões de km</li>
            </ul>`;
    modal.style.display = 'block';
}