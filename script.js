<<<<<<< HEAD
lucide.createIcons();
document.getElementById('year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const mobileLinks = [...document.querySelectorAll('.mobile-nav a')];
const linkByTarget = new Map(mobileLinks.map((link) => [link.getAttribute('href').slice(1), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    mobileLinks.forEach((link) => link.classList.remove('active'));
    const active = linkByTarget.get(entry.target.id);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));
=======
/* =========================================================
   S SAKTHI PORTFOLIO — 3D MATRIX & POPPING BUBBLE ENGINE
   ========================================================= */

// Initialize Lucide Icons
lucide.createIcons();

// Set Dynamic Year
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   1. SCROLL PROGRESS BAR
   --------------------------------------------------------- */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}, { passive: true });

/* ---------------------------------------------------------
   2. BRIGHT RED SMOOTH MEDIUM-SIZED BUBBLES POPPING CURSOR
   --------------------------------------------------------- */
const bubbleCanvas = document.getElementById('bubble-cursor-canvas');
const hasTouch = window.matchMedia('(pointer: coarse)').matches;

if (bubbleCanvas && !hasTouch) {
  const ctx = bubbleCanvas.getContext('2d');
  let width = (bubbleCanvas.width = window.innerWidth);
  let height = (bubbleCanvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = bubbleCanvas.width = window.innerWidth;
    height = bubbleCanvas.height = window.innerHeight;
  });

  let mouseX = width / 2;
  let mouseY = height / 2;
  let curX = mouseX;
  let curY = mouseY;
  let lastSpawnX = mouseX;
  let lastSpawnY = mouseY;

  const trailingBubbles = [];
  const popParticles = [];

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Spawn trailing medium bubbles as mouse moves
    const dist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
    if (dist > 22) {
      trailingBubbles.push(createBubble(mouseX, mouseY, 12 + Math.random() * 8));
      lastSpawnX = mouseX;
      lastSpawnY = mouseY;
    }
  });

  // Burst on click
  window.addEventListener('pointerdown', (e) => {
    triggerPopBurst(e.clientX, e.clientY, 6 + Math.floor(Math.random() * 4));
  });

  function createBubble(x, y, radius) {
    return {
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      targetRadius: radius,
      radius: 4,
      vx: (Math.random() - 0.5) * 1.4,
      vy: -0.6 - Math.random() * 1.2, // Floats smoothly upward
      life: 1.0,
      decay: 0.016 + Math.random() * 0.012,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.08 + Math.random() * 0.05
    };
  }

  function triggerPopBurst(x, y, count) {
    // Immediate pop sound/shockwave ring
    popParticles.push({
      x, y,
      type: 'ring',
      radius: 14,
      maxRadius: 36,
      opacity: 0.95
    });

    // Radiating bubbles that burst
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 2.5 + Math.random() * 3.5;
      trailingBubbles.push({
        x, y,
        targetRadius: 10 + Math.random() * 10,
        radius: 3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        life: 1.0,
        decay: 0.035 + Math.random() * 0.02,
        wobble: Math.random() * 5,
        wobbleSpeed: 0.1
      });
    }

    // Micro droplets
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      popParticles.push({
        x, y,
        type: 'droplet',
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 1.8,
        opacity: 0.9
      });
    }
  }

  function drawGlassBubble(x, y, r, alpha) {
    if (r <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

    // Outer smooth bright red stroke
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = '#e8362e';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Translucent bright red interior glow
    const grad = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    grad.addColorStop(0, 'rgba(255, 60, 50, 0.35)');
    grad.addColorStop(0.7, 'rgba(232, 54, 46, 0.18)');
    grad.addColorStop(1, 'rgba(232, 54, 46, 0.04)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Top-left smooth glass specular reflection highlight
    const hlX = x - r * 0.32;
    const hlY = y - r * 0.32;
    const hlR = r * 0.32;

    ctx.beginPath();
    ctx.arc(hlX, hlY, hlR, 0, Math.PI * 2);
    const hlGrad = ctx.createRadialGradient(hlX, hlY, 0, hlX, hlY, hlR);
    hlGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    hlGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
    hlGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = hlGrad;
    ctx.fill();

    // Bottom rim secondary soft reflection
    ctx.beginPath();
    ctx.arc(x + r * 0.25, y + r * 0.25, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fill();

    ctx.restore();
  }

  function renderBubbleEngine() {
    ctx.clearRect(0, 0, width, height);

    // Smooth cursor follow
    curX += (mouseX - curX) * 0.24;
    curY += (mouseY - curY) * 0.24;

    // 1. Draw Primary Pointer Bubble (Medium sized ~17px radius)
    drawGlassBubble(curX, curY, 17, 0.92);

    // 2. Update & Draw Trailing Popping Bubbles
    for (let i = trailingBubbles.length - 1; i >= 0; i--) {
      const b = trailingBubbles[i];
      b.x += b.vx;
      b.y += b.vy;
      b.radius += (b.targetRadius - b.radius) * 0.12;
      b.wobble += b.wobbleSpeed;
      b.x += Math.sin(b.wobble) * 0.4;
      b.life -= b.decay;

      // When life ends, POP with droplets!
      if (b.life <= 0.05) {
        popParticles.push({
          x: b.x,
          y: b.y,
          type: 'ring',
          radius: b.radius,
          maxRadius: b.radius * 1.5,
          opacity: 0.85
        });

        for (let k = 0; k < 4; k++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 1.2 + Math.random() * 2.2;
          popParticles.push({
            x: b.x,
            y: b.y,
            type: 'droplet',
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            radius: 1.4,
            opacity: 0.8
          });
        }
        trailingBubbles.splice(i, 1);
        continue;
      }

      drawGlassBubble(b.x, b.y, b.radius, b.life);
    }

    // 3. Update & Draw Pop Rings and Droplets
    for (let i = popParticles.length - 1; i >= 0; i--) {
      const p = popParticles[i];

      if (p.type === 'ring') {
        p.radius += (p.maxRadius - p.radius) * 0.22 + 0.8;
        p.opacity -= 0.07;

        if (p.opacity <= 0) {
          popParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 54, 46, ${p.opacity})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();
      } else if (p.type === 'droplet') {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.05;

        if (p.opacity <= 0) {
          popParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 54, 46, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    requestAnimationFrame(renderBubbleEngine);
  }

  requestAnimationFrame(renderBubbleEngine);
}

/* ---------------------------------------------------------
   3. INTERACTIVE TERMINAL ($ whoami)
   --------------------------------------------------------- */
const terminalTag = document.getElementById('terminal-tag');
const terminalCommand = document.getElementById('terminal-command');
const terminalOutput = document.getElementById('terminal-output');

const terminalQueries = [
  { cmd: 'whoami', out: 'Sakthi • AI & Data Specialist' },
  { cmd: 'status', out: 'Open for freelance & high-impact projects' },
  { cmd: 'stack', out: 'Python • PyTorch • Pandas • SQL • Web Tech' },
  { cmd: 'mission', out: 'Turning messy data into purposeful code' }
];

let queryIndex = 0;
let isTyping = false;

function cycleTerminal() {
  if (isTyping) return;
  isTyping = true;
  queryIndex = (queryIndex + 1) % terminalQueries.length;
  const current = terminalQueries[queryIndex];

  terminalOutput.style.opacity = '0';
  terminalCommand.textContent = '';
  
  let charIdx = 0;
  const typeInterval = setInterval(() => {
    if (charIdx < current.cmd.length) {
      terminalCommand.textContent += current.cmd[charIdx];
      charIdx++;
    } else {
      clearInterval(typeInterval);
      setTimeout(() => {
        terminalOutput.textContent = current.out;
        terminalOutput.style.opacity = '1';
        isTyping = false;
      }, 120);
    }
  }, 50);
}

if (terminalTag) {
  terminalTag.addEventListener('click', cycleTerminal);
  terminalTag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleTerminal();
    }
  });
}

/* ---------------------------------------------------------
   4. FUNCTIONAL 3D PORTFOLIO MATRIX & SKILL NAVIGATOR
   --------------------------------------------------------- */
const canvasContainer = document.getElementById('webgl-canvas-container');
const nodeHoverBadge = document.getElementById('node-hover-badge');
const nodeBadgeText = document.getElementById('node-badge-text');

// Inspector Elements
const stageInspector = document.getElementById('stage-inspector');
const inspectorId = document.getElementById('inspector-id');
const inspectorTitle = document.getElementById('inspector-title');
const inspectorDesc = document.getElementById('inspector-desc');
const inspectorJumpBtn = document.getElementById('inspector-jump-btn');
const inspectorClose = document.getElementById('inspector-close');

// Telemetry & Action Elements
const simLine1 = document.getElementById('sim-line-1');
const simLine2 = document.getElementById('sim-line-2');
const btnExplode = document.getElementById('btn-explode');
const btnSimulate = document.getElementById('btn-simulate');
const xrayText = document.getElementById('xray-text');
const activeNodesCount = document.getElementById('active-nodes-count');

// Real functional portfolio node catalog
const portfolioNodes = [
  {
    id: '01',
    name: 'AI & Machine Learning',
    category: 'ai',
    desc: 'Foundational model training, Scikit-learn pipelines & neural classification.',
    target: '#skills',
    coords: [1.8, 1.1, 0.9]
  },
  {
    id: '02',
    name: 'Data Engineering & SQL',
    category: 'data',
    desc: 'Structured querying, schema management, Pandas transformations & data cleaning.',
    target: '#services',
    coords: [-1.7, 1.2, -0.7]
  },
  {
    id: '03',
    name: 'Web Design & Interfaces',
    category: 'web',
    desc: 'Semantic HTML, modern CSS layouts, JavaScript interaction & REST APIs.',
    target: '#services',
    coords: [1.5, -1.3, -0.9]
  },
  {
    id: '04',
    name: 'Arohan E-Cell & Logic',
    category: 'all',
    desc: 'Entrepreneurial product thinking, user scoping & business-grounded tech briefs.',
    target: '#about',
    coords: [-1.6, -1.2, 1.1]
  },
  {
    id: '05',
    name: 'Data Systems (Work In Progress)',
    category: 'data',
    desc: 'Active workflows for clean data pipelines, automated reporting & insight models.',
    target: '#work',
    coords: [0.3, 2.0, -0.8]
  },
  {
    id: '06',
    name: 'Freelance Inquiries & Hiring',
    category: 'all',
    desc: 'Open for freelance data entry, analysis, web builds & ML experiments.',
    target: '#contact',
    coords: [0.1, -2.0, 0.9]
  }
];

if (canvasContainer && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvasContainer.clientWidth / canvasContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 7.6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  canvasContainer.appendChild(renderer.domElement);

  // Master 3D Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Outer Wireframe Cage
  const cageGeo = new THREE.IcosahedronGeometry(2.3, 1);
  const cageMat = new THREE.MeshBasicMaterial({
    color: 0x151515,
    wireframe: true,
    transparent: true,
    opacity: 0.32
  });
  const cageMesh = new THREE.Mesh(cageGeo, cageMat);
  masterGroup.add(cageMesh);

  // Inner Core
  const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xe8362e,
    wireframe: true,
    transparent: true,
    opacity: 0.9
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  masterGroup.add(coreMesh);

  // Gyro Ring
  const gyroGeo = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
  const gyroMat = new THREE.MeshBasicMaterial({
    color: 0xbcb8b0,
    transparent: true,
    opacity: 0.5
  });
  const gyroMesh = new THREE.Mesh(gyroGeo, gyroMat);
  gyroMesh.rotation.x = Math.PI / 3;
  masterGroup.add(gyroMesh);

  // Interactive Clickable Node Meshes
  const interactiveNodeMeshes = [];
  const nodeHaloMeshes = [];

  portfolioNodes.forEach((data, idx) => {
    // Node Sphere
    const nGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nMat = new THREE.MeshBasicMaterial({ color: 0xe8362e });
    const nMesh = new THREE.Mesh(nGeo, nMat);
    nMesh.position.set(...data.coords);
    nMesh.userData = { ...data, index: idx };

    // Outer Halo Ring
    const haloGeo = new THREE.RingGeometry(0.24, 0.28, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x151515,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(...data.coords);
    haloMesh.lookAt(0, 0, 0);

    masterGroup.add(nMesh);
    masterGroup.add(haloMesh);

    interactiveNodeMeshes.push(nMesh);
    nodeHaloMeshes.push(haloMesh);
  });

  // Connecting Data Neural Lines
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xe8362e,
    transparent: true,
    opacity: 0.35
  });
  for (let i = 0; i < interactiveNodeMeshes.length; i++) {
    for (let j = i + 1; j < interactiveNodeMeshes.length; j++) {
      const p1 = interactiveNodeMeshes[i].position;
      const p2 = interactiveNodeMeshes[j].position;
      if (p1.distanceTo(p2) < 3.6) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        masterGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    }
  }

  // Raycasting for Mouse Interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let hoveredNode = null;
  let isDragging = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let targetRotationX = 0.2;
  let targetRotationY = 0.4;
  let isExploded = false;
  let isSimulating = false;

  // Open Functional Inspector Drawer
  function openNodeInspector(nodeData) {
    if (!stageInspector) return;
    inspectorId.textContent = `NODE [${nodeData.id}] // ${nodeData.category.toUpperCase()}`;
    inspectorTitle.textContent = nodeData.name;
    inspectorDesc.textContent = nodeData.desc;
    inspectorJumpBtn.setAttribute('href', nodeData.target);
    stageInspector.style.display = 'flex';

    if (simLine1) {
      simLine1.textContent = `> INSPECTED: ${nodeData.name.toUpperCase()}`;
      simLine1.classList.add('highlight');
      setTimeout(() => simLine1.classList.remove('highlight'), 1800);
    }
  }

  if (inspectorClose) {
    inspectorClose.addEventListener('click', () => {
      stageInspector.style.display = 'none';
    });
  }

  // Jump button smooth scroll + target flash
  if (inspectorJumpBtn) {
    inspectorJumpBtn.addEventListener('click', (e) => {
      const targetId = inspectorJumpBtn.getAttribute('href');
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        targetElem.classList.remove('highlight-target');
        void targetElem.offsetWidth; // Trigger reflow
        targetElem.classList.add('highlight-target');
      }
    });
  }

  // Pointer Move (Raycasting & Drag)
  canvasContainer.addEventListener('pointerdown', (e) => {
    isDragging = true;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
    canvasContainer.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', (e) => {
    const rect = canvasContainer.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging) {
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    } else {
      // Raycast Hover Check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveNodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        canvasContainer.style.cursor = 'pointer';
        hoveredNode = hit;

        if (nodeHoverBadge) {
          nodeBadgeText.textContent = `[${hit.userData.id}] ${hit.userData.name.toUpperCase()}`;
          nodeHoverBadge.style.display = 'inline-flex';
        }
      } else {
        canvasContainer.style.cursor = 'grab';
        hoveredNode = null;
        if (nodeHoverBadge) nodeHoverBadge.style.display = 'none';
      }
    }
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // Node Click to Inspect
  canvasContainer.addEventListener('click', (e) => {
    const rect = canvasContainer.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveNodeMeshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      openNodeInspector(hit.userData);

      // Smooth camera snap focus
      targetRotationY = -Math.atan2(hit.position.x, hit.position.z);
      targetRotationX = Math.atan2(hit.position.y, hit.position.z) * 0.4;
    }
  });

  // FUNCTIONALITY 1: "X-RAY" EXPLODED ARCHITECTURE VIEW
  if (btnExplode) {
    btnExplode.addEventListener('click', () => {
      isExploded = !isExploded;
      btnExplode.classList.toggle('active-action', isExploded);
      xrayText.textContent = isExploded ? 'COMPACT' : 'X-RAY';

      const factor = isExploded ? 1.6 : 1.0;
      cageMesh.scale.set(factor, factor, factor);
      gyroMesh.scale.set(factor * 1.1, factor * 1.1, factor * 1.1);

      interactiveNodeMeshes.forEach((mesh) => {
        mesh.position.set(
          mesh.userData.coords[0] * factor,
          mesh.userData.coords[1] * factor,
          mesh.userData.coords[2] * factor
        );
      });

      if (simLine1) {
        simLine1.textContent = isExploded ? '> MODE: EXPLODED VIEW ACTIVE' : '> MODE: COMPACT ARCHITECTURE';
        simLine1.classList.add('highlight');
      }
    });
  }

  // FUNCTIONALITY 2: "SIMULATE" REAL-TIME AI PIPELINE SIMULATION
  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      btnSimulate.classList.add('active-action');

      const steps = [
        '> STEP 1/4: Ingesting dataset (1,024 vector tensors)...',
        '> STEP 2/4: Training random forest & neural synapses...',
        '> STEP 3/4: Computing cross-entropy loss (0.014)...',
        '> STEP 4/4: Validation Accuracy: 98.7% [COMPLETE]'
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          if (simLine1) {
            simLine1.textContent = step;
            simLine1.classList.add('highlight');
          }
          // Flash nodes sequentially
          interactiveNodeMeshes.forEach((m, mIdx) => {
            if (mIdx === idx || mIdx === idx + 2) {
              m.material.color.setHex(0xffffff);
              setTimeout(() => m.material.color.setHex(0xe8362e), 280);
            }
          });

          if (idx === steps.length - 1) {
            isSimulating = false;
            btnSimulate.classList.remove('active-action');
          }
        }, idx * 750);
      });
    });
  }

  // FUNCTIONALITY 3: DOMAIN CATEGORY FILTER TABS
  const filterTabs = document.querySelectorAll('.model-tab');
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      let visibleCount = 0;

      interactiveNodeMeshes.forEach((mesh, idx) => {
        const isMatch = filter === 'all' || mesh.userData.category === filter || mesh.userData.category === 'all';
        mesh.visible = isMatch;
        nodeHaloMeshes[idx].visible = isMatch;
        if (isMatch) visibleCount++;
      });

      if (activeNodesCount) {
        activeNodesCount.textContent = `${visibleCount} CONNECTED`;
      }

      if (simLine1) {
        simLine1.textContent = `> FILTER APPLIED: ${filter.toUpperCase()}`;
        simLine1.classList.add('highlight');
        setTimeout(() => simLine1.classList.remove('highlight'), 1500);
      }
    });
  });

  // Animation Loop
  let clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Constant smooth ambient orbit
    targetRotationY += 0.0035;

    // Smooth Lerp
    masterGroup.rotation.y += (targetRotationY - masterGroup.rotation.y) * 0.08;
    masterGroup.rotation.x += (targetRotationX - masterGroup.rotation.x) * 0.08;

    // Inner core counter-rotation
    coreMesh.rotation.y -= 0.01;
    coreMesh.rotation.x += 0.006;
    gyroMesh.rotation.z += 0.0025;

    // Pulse node halos
    const time = clock.getElapsedTime();
    nodeHaloMeshes.forEach((halo, idx) => {
      const s = 1 + Math.sin(time * 3 + idx) * 0.12;
      halo.scale.set(s, s, s);
    });

    // Update Telemetry Angles
    if (simLine2) {
      const pitch = Math.round(((masterGroup.rotation.x * 180) / Math.PI) % 360);
      const yaw = Math.round(((masterGroup.rotation.y * 180) / Math.PI) % 360);
      simLine2.textContent = `> TELEMETRY: PITCH ${pitch.toString().padStart(2, '0')}° | YAW ${yaw.toString().padStart(2, '0')}°`;
    }

    renderer.render(scene, camera);
  };

  animate();

  // Resize Listener
  window.addEventListener('resize', () => {
    if (!canvasContainer) return;
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

/* ---------------------------------------------------------
   5. 3D PARALLAX TILT ON CARDS
   --------------------------------------------------------- */
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8.0;
    const rotY = ((x - centerX) / centerX) * 8.0;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
});

/* ---------------------------------------------------------
   6. ONE-CLICK EMAIL COPY
   --------------------------------------------------------- */
const copyEmailBtn = document.getElementById('copy-email-btn');
const copyText = document.getElementById('copy-text');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const emailToCopy = 'sakthi291008@gmail.com';
    try {
      await navigator.clipboard.writeText(emailToCopy);
      copyText.textContent = 'COPIED!';
      copyEmailBtn.style.background = 'rgba(255, 255, 255, 0.4)';
      setTimeout(() => {
        copyText.textContent = 'COPY EMAIL';
        copyEmailBtn.style.background = '';
      }, 2000);
    } catch (err) {
      copyText.textContent = 'sakthi291008@gmail.com';
    }
  });
}

/* ---------------------------------------------------------
   7. INTERSECTION OBSERVER FOR ACTIVE NAVIGATION
   --------------------------------------------------------- */
const sections = [...document.querySelectorAll('main section[id]')];
const mobileLinks = [...document.querySelectorAll('.mobile-nav a')];
const linkByTarget = new Map(
  mobileLinks.map((link) => [link.getAttribute('href').slice(1), link])
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      mobileLinks.forEach((link) => link.classList.remove('active'));
      const active = linkByTarget.get(entry.target.id);
      if (active) active.classList.add('active');
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));
>>>>>>> 0.2.0
