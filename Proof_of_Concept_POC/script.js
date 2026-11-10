// ==========================================================================
// PROJECT OCEAN-SIGHT // MARITIME ST-GNN RESEARCH ENGINE (v3.4)
// Cross-Modal Spatiotemporal Graph Framework for Dark-Vessel Detection
// BatStateU CICS &bull; Group 2 BSCS Thesis 1 & 2
// ==========================================================================

// 1. SOUND FEEDBACK (Subtle Acoustic Feedback)
let audioEnabled = true;
let audioCtx = null;

function playClick() {
  if (!audioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.035);
  } catch (e) {}
}

function toggleAudio(btn) {
  audioEnabled = !audioEnabled;
  btn.classList.toggle('active', audioEnabled);
  const icon = document.getElementById('icon-audio');
  if (icon) {
    icon.setAttribute('data-lucide', audioEnabled ? 'volume-2' : 'volume-x');
    refreshIcons();
  }
  if (audioEnabled) playClick();
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// ==========================================================================
// 2. GIS MAP INITIALIZATION (Batangas Bay, Philippines)
// ==========================================================================
const map = L.map('map-container', {
  zoomControl: false,
  attributionControl: false,
  preferCanvas: false
}).setView([13.728, 120.985], 13);

// Dedicated custom pane for AIS Pings so they stay anchored above vessel markers
map.createPane('aisPingPane');
map.getPane('aisPingPane').style.zIndex = '650';

let currentBaseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  subdomains: 'abcd'
}).addTo(map);

const layerSeamarks = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
  maxZoom: 18
});
let seamarksActive = false;

const TILE_PROVIDERS = {
  cartodb_dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  esri_satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  osm_standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

function switchBasemap(providerId) {
  playClick();
  const url = TILE_PROVIDERS[providerId] || TILE_PROVIDERS.cartodb_dark;
  if (currentBaseLayer) {
    map.removeLayer(currentBaseLayer);
  }
  const isEsri = (providerId === 'esri_satellite');
  currentBaseLayer = L.tileLayer(url, {
    maxZoom: isEsri ? 18 : 19,
    subdomains: isEsri ? [] : 'abcd'
  }).addTo(map);
  currentBaseLayer.bringToBack();
}

function toggleSeamarksOverlay() {
  playClick();
  seamarksActive = !seamarksActive;
  const btn = document.getElementById('layer-btn-seamarks');
  if (btn) btn.classList.toggle('active', seamarksActive);
  if (seamarksActive) {
    layerSeamarks.addTo(map);
  } else {
    map.removeLayer(layerSeamarks);
  }
}

L.control.zoom({ position: 'bottomleft' }).addTo(map);

// GIS Layers Stack
const layerAnchorage = L.layerGroup().addTo(map);
const layerShoreBuffer = L.layerGroup().addTo(map);
const layerFairways = L.layerGroup().addTo(map);
const layerGraphCandidates = L.layerGroup().addTo(map);
const layerGraphIntra = L.layerGroup().addTo(map);
const layerVectors = L.layerGroup().addTo(map);
const layerAIS = L.layerGroup().addTo(map);
const layerSAR = L.layerGroup().addTo(map);

// Layer Visibility State
const mapLayersActive = {
  graph: true,
  anchorage: true,
  buffer: true,
  fairway: true
};

// 1. Official NAMRIA Chart PH4401 Anchorage Geofence Polygon
const anchorageCoords = [
  [13.742, 120.970],
  [13.748, 120.998],
  [13.725, 121.010],
  [13.712, 120.980]
];

const anchoragePolygon = L.polygon(anchorageCoords, {
  color: '#f59e0b',
  weight: 1.5,
  dashArray: '6, 6',
  fillColor: '#f59e0b',
  fillOpacity: 0.07
}).addTo(layerAnchorage);

anchoragePolygon.bindTooltip("<strong>Batangas Port Designated Anchorage Ground</strong><br/><span style='color:#f59e0b;'>NAMRIA Chart PH4401 &bull; PPA PMO Batangas Berth Waiting Zone</span>", {
  className: 'kiss-tooltip',
  direction: 'top'
});

// 2. 150m Shoreline Clutter Buffer Layer (Masking Pier Clutter for Class 2)
const shoreBufferCoords = [
  // Port piers & coastal terminal buffer ribbon
  [13.765, 120.990], [13.768, 121.010], [13.750, 121.025], [13.735, 121.035],
  [13.738, 121.028], [13.753, 121.018], [13.763, 120.992]
];

const shoreBufferPoly = L.polygon(shoreBufferCoords, {
  color: '#a855f7',
  weight: 1.2,
  dashArray: '4, 4',
  fillColor: '#a855f7',
  fillOpacity: 0.08
}).addTo(layerShoreBuffer);

shoreBufferPoly.bindTooltip("<strong>150m Shoreline Infrastructure Buffer</strong><br/><span style='color:#c084fc;'>Prunes radar reflections from concrete piers & breakwaters (Class 2 Mask)</span>", {
  className: 'kiss-tooltip',
  direction: 'top'
});

// 3. Navigation Fairway Corridor Polylines (Verde Island Passage Approach)
const fairwayLineCoords = [
  [13.760, 120.940],
  [13.730, 120.975],
  [13.680, 121.010]
];

const fairwayLine = L.polyline(fairwayLineCoords, {
  color: '#3b82f6',
  weight: 1.5,
  dashArray: '8, 8',
  opacity: 0.5
}).addTo(layerFairways);

fairwayLine.bindTooltip("<strong>Batangas Bay Navigation Fairway</strong><br/><span style='color:#93c5fd;'>Regulated port transit channel (8-12 knots limit)</span>", {
  className: 'kiss-tooltip',
  direction: 'right'
});

// ==========================================================================
// 3. RESEARCH-GRADE SYNTHETIC SCENARIOS & FEATURE TENSORS
// ==========================================================================
const scenarioDataTemplates = {
  alpha: {
    id: "alpha",
    name: "Scenario Alpha: Standard Fairway & Port Queuing",
    shortName: "Alpha Fairway",
    density: "Normal fairway traffic (11 vessels &bull; 4.2 ves/km&sup2;)",
    targets: [
      {
        id: "SAR-DET #042",
        type: "dark",
        lat: 13.7281,
        lon: 120.9740,
        length: 84.2,
        width: 14.8,
        speed: 14.6,
        heading: 215,
        inAnchorage: false,
        shoreDist: 1420,
        name: "Unidentified Contact",
        mmsi: null,
        rcs: -8.4,
        threat: 94,
        affinity: 0.04,
        desc: "Radar confirms metallic hull moving southwest at 14.6 kts through Verde Island Passage approach. Zero AIS radio broadcast detected in reachability bubble.",
        diag: "Radar confirms an 84.2m metallic vessel navigating at 14.6 kts through Verde Island approaches. Zero compatible AIS telemetry detected within the 5.0 km reachability envelope (&plusmn;15 min window). Because hull length exceeds the 25m SOLAS carriage exemption and target is outside anchorage waiting grounds, it is flagged as a Class 1 Dark-Vessel Candidate for physical verification."
      },
      {
        id: "SAR-DET #077",
        type: "dark",
        lat: 13.7120,
        lon: 120.9700,
        length: 52.0,
        width: 9.6,
        speed: 9.4,
        heading: 180,
        inAnchorage: false,
        shoreDist: 880,
        name: "Unidentified Vessel",
        mmsi: null,
        rcs: -11.2,
        threat: 88,
        affinity: 0.06,
        desc: "High radar return near Tingloy channel. AIS transponder intentionally disabled or unequipped.",
        diag: "Medium commercial vessel (52.0m) actively cruising south in Tingloy channel with no transponder pings. GATv2 reachability attention converges to 0.06 (no plausible trajectory match). Flagged as Class 1 Candidate."
      },
      {
        id: "SAR-DET #011",
        type: "anchored",
        lat: 13.7310,
        lon: 120.9880,
        length: 128.5,
        width: 22.0,
        speed: 0.3,
        heading: 45,
        inAnchorage: true,
        shoreDist: 1650,
        name: "MV St. Francis Xavier",
        mmsi: "548231000",
        aisLat: 13.7314,
        aisLon: 120.9884,
        rcs: -5.8,
        threat: 8,
        affinity: 0.91,
        desc: "Passenger ferry idling in designated anchorage fairway awaiting berth clearance. Slight tidal swing.",
        diag: "Commercial RoRo ferry resting inside official PPA anchorage ground. Although near-zero speed and tidal yaw cause a 65m spatial offset, the anchorage-aware context filter correctly recognizes compliant waiting and suppresses false discrepancy."
      },
      {
        id: "SAR-DET #019",
        type: "anchored",
        lat: 13.7260,
        lon: 120.9920,
        length: 165.0,
        width: 26.5,
        speed: 0.2,
        heading: 30,
        inAnchorage: true,
        shoreDist: 1820,
        name: "Oriental Pioneer",
        mmsi: "548771200",
        aisLat: 13.7265,
        aisLon: 120.9918,
        rcs: -4.1,
        threat: 6,
        affinity: 0.93,
        desc: "Bulk carrier anchored outside Batangas Terminal. Slight AIS packet latency.",
        diag: "Bulk carrier anchored in sector A. GATv2 cross-modal attention establishes strong structural correspondence (&alpha; = 0.93). Classified as Class 0 Matched."
      },
      {
        id: "SAR-DET #025",
        type: "anchored",
        lat: 13.7350,
        lon: 120.9810,
        length: 142.0,
        width: 24.0,
        speed: 0.4,
        heading: 70,
        inAnchorage: true,
        shoreDist: 1540,
        name: "Global Fortune",
        mmsi: "548119000",
        aisLat: 13.7353,
        aisLon: 120.9815,
        rcs: -5.0,
        threat: 9,
        affinity: 0.89,
        desc: "Container ship waiting in anchorage sector B. Kinematics match anchor drift envelope.",
        diag: "Container vessel awaiting terminal pilot. Anchorage geofence indicators suppress anomaly score to 9%."
      },
      {
        id: "SAR-DET #031",
        type: "anchored",
        lat: 13.7210,
        lon: 120.9980,
        length: 115.0,
        width: 18.2,
        speed: 0.1,
        heading: 10,
        inAnchorage: true,
        shoreDist: 1100,
        name: "Pacific Pride",
        mmsi: "548992100",
        aisLat: 13.7212,
        aisLon: 120.9978,
        rcs: -6.4,
        threat: 5,
        affinity: 0.94,
        desc: "Product tanker waiting for pilot boarding to Shell Tabangao refinery.",
        diag: "Tanker queuing outside Tabangao refinery. GATv2 intra-modal edges establish spatial neighbor queue awareness."
      },
      {
        id: "SAR-DET #003",
        type: "matched",
        lat: 13.7460,
        lon: 120.9620,
        length: 98.0,
        width: 16.0,
        speed: 16.2,
        heading: 140,
        inAnchorage: false,
        shoreDist: 2100,
        name: "FastCat M12",
        mmsi: "548902000",
        aisLat: 13.7469,
        aisLon: 120.9613,
        rcs: -7.2,
        threat: 4,
        affinity: 0.97,
        desc: "High-speed commercial catamaran on scheduled run to Calapan. Clean AIS-to-radar pairing.",
        diag: "Catamaran underway in fairway. High kinematic alignment between radar velocity vector and cubic spline interpolated AIS position (15s lag, &alpha; = 0.97). Class 0 Matched."
      },
      {
        id: "SAR-DET #008",
        type: "matched",
        lat: 13.7150,
        lon: 121.0080,
        length: 110.0,
        width: 17.5,
        speed: 12.1,
        heading: 95,
        inAnchorage: false,
        shoreDist: 1350,
        name: "Petro Chem 9",
        mmsi: "548443900",
        aisLat: 13.7151,
        aisLon: 121.0071,
        rcs: -6.9,
        threat: 3,
        affinity: 0.96,
        desc: "Product tanker inbound to Shell Tabangao Terminal. High GNN affinity.",
        diag: "Inbound chemical carrier. Smooth reachability edge alignment (&alpha; = 0.96). Compliant transit."
      },
      {
        id: "SAR-DET #014",
        type: "matched",
        lat: 13.7540,
        lon: 120.9510,
        length: 85.0,
        width: 15.2,
        speed: 13.8,
        heading: 320,
        inAnchorage: false,
        shoreDist: 2400,
        name: "SuperFerry 18",
        mmsi: "548320400",
        aisLat: 13.7533,
        aisLon: 120.9516,
        rcs: -8.0,
        threat: 2,
        affinity: 0.98,
        desc: "Inter-island passenger ferry outbound toward Batangas Strait fairway.",
        diag: "Outbound ferry. Perfect kinematic correspondence at overpass epoch t_s."
      },
      {
        id: "SAR-DET #017",
        type: "matched",
        lat: 13.7020,
        lon: 121.0150,
        length: 74.0,
        width: 13.0,
        speed: 10.5,
        heading: 270,
        inAnchorage: false,
        shoreDist: 1600,
        name: "LCT Southern Star",
        mmsi: "548651000",
        aisLat: 13.7020,
        aisLon: 121.0158,
        rcs: -9.5,
        threat: 5,
        affinity: 0.92,
        desc: "Landing craft transport carrying aggregate materials.",
        diag: "Commercial LCT. Continuous transponder broadcast verified across the 15-minute search window."
      },
      {
        id: "SAR-DET #022",
        type: "matched",
        lat: 13.7610,
        lon: 120.9780,
        length: 62.0,
        width: 11.4,
        speed: 11.0,
        heading: 190,
        inAnchorage: false,
        shoreDist: 1250,
        name: "Tugboat Titan IV",
        mmsi: "548002300",
        aisLat: 13.7618,
        aisLon: 120.9781,
        rcs: -10.5,
        threat: 2,
        affinity: 0.95,
        desc: "Harbor pilot assist tug returning to Batangas Pier 2.",
        diag: "Harbor assistance tug. Kinematic consistency aligns with port approaches."
      }
    ]
  },

  bravo: {
    id: "bravo",
    name: "Scenario Bravo: High-Density Port Congestion & Ambiguity",
    shortName: "Bravo Congested",
    density: "Heavy anchorage congestion & ghost anomaly (9 vessels &bull; 8.1 ves/km&sup2;)",
    targets: [
      {
        id: "SAR-DET #088",
        type: "dark",
        lat: 13.7180,
        lon: 120.9650,
        length: 96.0,
        width: 15.5,
        speed: 17.1,
        heading: 210,
        inAnchorage: false,
        shoreDist: 2100,
        name: "Unidentified Freighter",
        mmsi: null,
        rcs: -7.5,
        threat: 96,
        affinity: 0.03,
        desc: "Commercial freighter operating dark in Verde Island Passage corridor.",
        diag: "Major commercial cargo ship (96.0m) moving at high speed (17.1 kts) in fairway without radio telemetry. High priority Class 1 Dark-Vessel Candidate."
      },
      {
        id: "SAR-DET #092",
        type: "dark",
        lat: 13.7380,
        lon: 120.9620,
        length: 68.0,
        width: 12.0,
        speed: 13.2,
        heading: 165,
        inAnchorage: false,
        shoreDist: 1750,
        name: "Unidentified Vessel",
        mmsi: null,
        rcs: -9.8,
        threat: 89,
        affinity: 0.05,
        desc: "Non-broadcasting hull moving parallel to shipping fairway.",
        diag: "Commercial vessel navigating in open lane. No AIS signal within 5.0 km reachability gating bubble."
      },
      {
        id: "SAR-DET #097",
        type: "dark",
        lat: 13.7080,
        lon: 120.9820,
        length: 46.0,
        width: 8.5,
        speed: 7.5,
        heading: 90,
        inAnchorage: false,
        shoreDist: 920,
        name: "Unidentified Trawler",
        mmsi: null,
        rcs: -12.3,
        threat: 91,
        affinity: 0.04,
        desc: "Trawler-sized vessel with zero AIS broadcast detected.",
        diag: "Commercial fishing vessel over 25m threshold with no transponder. Outside anchorage; flagged as Class 1 Candidate."
      },
      {
        id: "SAR-GHOST #001",
        type: "ghost",
        lat: 13.7200,
        lon: 120.9600,
        length: 0,
        width: 0,
        speed: 18.0,
        heading: 120,
        inAnchorage: false,
        shoreDist: 2200,
        name: "Ghost AIS Track",
        mmsi: "548999000",
        aisLat: 13.7200,
        aisLon: 120.9600,
        rcs: null,
        threat: 78,
        affinity: 0.00,
        desc: "ANOMALY: Active AIS radio broadcast, but radar confirms ZERO hull reflection (Spoofed / Phantom Track).",
        diag: "ANOMALY: Transponder transmitting valid MMSI 548999000 at 18.0 kts, but Sentinel-1 SAR confirms ZERO physical radar reflector target (empty sea). Suspected GPS spoofing or phantom ghost track."
      },
      {
        id: "SAR-DET #101",
        type: "anchored",
        lat: 13.7290,
        lon: 120.9850,
        length: 180.0,
        width: 28.0,
        speed: 0.1,
        heading: 35,
        inAnchorage: true,
        shoreDist: 1600,
        name: "Bulk Carrier Atlas",
        mmsi: "548881200",
        aisLat: 13.7294,
        aisLon: 120.9852,
        rcs: -3.8,
        threat: 8,
        affinity: 0.91,
        desc: "Queued at inner anchorage ground. Ships tightly clustered 60m apart.",
        diag: "Anchored in tight queue adjacent to Star Horizon. ST-GNN graph attention preserves identity, whereas greedy nearest-neighbor algorithm triggers identity swap."
      },
      {
        id: "SAR-DET #102",
        type: "anchored",
        lat: 13.7275,
        lon: 120.9865,
        length: 172.0,
        width: 27.2,
        speed: 0.2,
        heading: 32,
        inAnchorage: true,
        shoreDist: 1540,
        name: "Star Horizon",
        mmsi: "548881300",
        aisLat: 13.7278,
        aisLon: 120.9868,
        rcs: -4.2,
        threat: 7,
        affinity: 0.90,
        desc: "Anchored 65m adjacent to Atlas. Naive Euclidean models trigger false identity swap.",
        diag: "Anchored adjacent to Atlas. GNN multi-target attention correctly disambiguates competing proximate targets."
      },
      {
        id: "SAR-DET #103",
        type: "anchored",
        lat: 13.7330,
        lon: 120.9890,
        length: 135.0,
        width: 21.0,
        speed: 0.3,
        heading: 50,
        inAnchorage: true,
        shoreDist: 1480,
        name: "Ever Glory",
        mmsi: "548881400",
        aisLat: 13.7333,
        aisLon: 120.9892,
        rcs: -5.3,
        threat: 9,
        affinity: 0.88,
        desc: "Anchored waiting for berth. Radio packet congestion caused slight reporting gap.",
        diag: "Compliant anchored vessel. Slight packet delay handled by cubic spline interpolation within the 15-minute window."
      },
      {
        id: "SAR-DET #105",
        type: "matched",
        lat: 13.7490,
        lon: 120.9570,
        length: 120.0,
        width: 19.5,
        speed: 15.4,
        heading: 135,
        inAnchorage: false,
        shoreDist: 1900,
        name: "Starlite Pioneer",
        mmsi: "548332100",
        aisLat: 13.7498,
        aisLon: 120.9562,
        rcs: -6.1,
        threat: 4,
        affinity: 0.97,
        desc: "RORO ferry on regular transit. Clean GNN edge pairing.",
        diag: "Commercial ferry in transit. Strong association confidence (&alpha; = 0.97)."
      },
      {
        id: "SAR-DET #108",
        type: "matched",
        lat: 13.7080,
        lon: 121.0040,
        length: 88.0,
        width: 14.0,
        speed: 11.8,
        heading: 80,
        inAnchorage: false,
        shoreDist: 1200,
        name: "Barge Transporter 7",
        mmsi: "548773400",
        aisLat: 13.7078,
        aisLon: 121.0032,
        rcs: -8.7,
        threat: 3,
        affinity: 0.94,
        desc: "Cargo barge carrying bulk minerals.",
        diag: "Compliant cargo transport. Confirmed Class 0 Matched."
      }
    ]
  },

  charlie: {
    id: "charlie",
    name: "Scenario Charlie: Storm Surge & AIS Transmission Dropouts",
    shortName: "Charlie Storm",
    density: "Degraded transponders & rain clutter (5 vessels &bull; 2.4 ves/km&sup2;)",
    targets: [
      {
        id: "SAR-DET #115",
        type: "dark",
        lat: 13.7340,
        lon: 120.9610,
        length: 104.0,
        width: 16.5,
        speed: 15.0,
        heading: 195,
        inAnchorage: false,
        shoreDist: 2150,
        name: "Unidentified Vessel",
        mmsi: null,
        rcs: -7.0,
        threat: 97,
        affinity: 0.02,
        desc: "Deep-sea vessel detected under heavy rain band. SAR C-band penetrates storm; transponder offline.",
        diag: "Spaceborne C-band radar penetrates cloud cover to detect 104m metallic hull. Transponder offline during severe tropical weather. High-confidence Class 1 Candidate."
      },
      {
        id: "SAR-DET #119",
        type: "dark",
        lat: 13.7220,
        lon: 120.9620,
        length: 76.0,
        width: 13.0,
        speed: 12.8,
        heading: 230,
        inAnchorage: false,
        shoreDist: 1800,
        name: "Unidentified Craft",
        mmsi: null,
        rcs: -9.2,
        threat: 93,
        affinity: 0.03,
        desc: "Non-broadcasting vessel navigating without radio identification near Tingloy reef line.",
        diag: "Commercial hull navigating rough waters without identification. Class 1 Candidate."
      },
      {
        id: "SAR-DET #122",
        type: "dark",
        lat: 13.7020,
        lon: 120.9760,
        length: 58.0,
        width: 10.0,
        speed: 9.0,
        heading: 160,
        inAnchorage: false,
        shoreDist: 1100,
        name: "Unidentified Vessel",
        mmsi: null,
        rcs: -10.8,
        threat: 90,
        affinity: 0.04,
        desc: "Vessel evading traffic lane radar during low-visibility tropical depression.",
        diag: "Vessel cruising in open water during storm. Flagged as Class 1 Candidate."
      },
      {
        id: "SAR-DET #126",
        type: "anchored",
        lat: 13.7300,
        lon: 120.9900,
        length: 150.0,
        width: 25.0,
        speed: 0.2,
        heading: 40,
        inAnchorage: true,
        shoreDist: 1620,
        name: "Sea Explorer",
        mmsi: "548123900",
        aisLat: 13.7304,
        aisLon: 120.9905,
        rcs: -4.9,
        threat: 6,
        affinity: 0.92,
        desc: "Anchored cargo ship riding out rough weather inside sheltered bay.",
        diag: "Cargo vessel sheltering in anchorage ground. Kinematics bounded by safe anchoring physics."
      },
      {
        id: "SAR-DET #128",
        type: "matched",
        lat: 13.7580,
        lon: 120.9650,
        length: 92.0,
        width: 15.0,
        speed: 14.2,
        heading: 145,
        inAnchorage: false,
        shoreDist: 1950,
        name: "Montenegro Lines RORO",
        mmsi: "548449100",
        aisLat: 13.7588,
        aisLon: 120.9644,
        rcs: -7.8,
        threat: 3,
        affinity: 0.98,
        desc: "Commercial ferry maintaining active AIS transmission through rough seas.",
        diag: "Commercial passenger ferry broadcasting despite weather degradation. Verified Class 0 Matched."
      }
    ]
  }
};

// ==========================================================================
// 4. GLOBAL RUNTIME & MODEL ENGINE STATE
// ==========================================================================
let activeScenarioKey = "alpha";
let activeDataset = [];
let currentMode = "gnn"; // 'gnn', 'baseline', 'baseline2', 'baseline3', 'ablation_graph', 'ablation_anchorage', 'ablation_intra'
let selectedTargetId = "SAR-DET #042";
let currentFleetFilter = "all";
let currentSearchQuery = "";
let currentDropout = 0;
let currentDensityTier = "med";
let sarOverlayActive = false;
let graphTopologyActive = true;

// Simulation State
let simRunning = true;
let simInterval = null;
let simTick = 0;

function cloneData(template) {
  return JSON.parse(JSON.stringify(template));
}

function initScenario(key) {
  activeScenarioKey = key;
  activeDataset = cloneData(scenarioDataTemplates[key].targets);

  activeDataset.forEach(t => {
    t.baseLat = t.lat;
    t.baseLon = t.lon;
  });

  if (!activeDataset.some(t => t.id === selectedTargetId)) {
    selectedTargetId = activeDataset[0].id;
  }

  // Ghost badge in map strip
  const hasGhost = activeDataset.some(t => t.type === 'ghost');
  const ghostStrip = document.getElementById('strip-ghost-item');
  if (ghostStrip) ghostStrip.style.display = hasGhost ? 'flex' : 'none';

  const labelEl = document.getElementById('scenario-label');
  if (labelEl) labelEl.textContent = scenarioDataTemplates[key].shortName || scenarioDataTemplates[key].name;

  const densityEl = document.getElementById('fleet-density-label');
  if (densityEl) densityEl.innerHTML = scenarioDataTemplates[key].density;
}

// ==========================================================================
// 5. KINEMATIC SIMULATION LOOP (Dynamic Physics & Tidal Sway)
// ==========================================================================
function startSimulation() {
  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(() => {
    if (simRunning) {
      advanceKinematics(1.0);
    }
  }, 1000);
}

function advanceKinematics(deltaSec) {
  simTick++;
  const minLat = 13.680, maxLat = 13.785;
  const minLon = 120.910, maxLon = 121.050;

  activeDataset.forEach(t => {
    if (t.type === "ghost") {
      // Ghost AIS anomaly: moving radio transponder with NO physical radar target
      const speedMps = t.speed * 0.514444;
      const distKm = (speedMps * deltaSec) / 1000.0;
      const rad = (t.heading * Math.PI) / 180.0;
      t.lat += (distKm / 111.0) * Math.cos(rad);
      t.lon += (distKm / (111.0 * Math.cos(t.lat * Math.PI / 180.0))) * Math.sin(rad);
      if (t.lat < minLat || t.lat > maxLat) t.heading = (180 - t.heading + 360) % 360;
      if (t.lon < minLon || t.lon > maxLon) t.heading = (360 - t.heading + 360) % 360;
      t.aisLat = t.lat;
      t.aisLon = t.lon;
    } else if (t.type === "anchored") {
      // Anchored ships: subtle tidal sway (10-15m) inside designated zone
      const sway = (simTick * 0.08) + (t.heading * Math.PI / 180);
      t.lat = t.baseLat + (Math.sin(sway) * (0.012 / 111.0));
      t.lon = t.baseLon + (Math.cos(sway) * (0.012 / (111.0 * Math.cos(t.lat * Math.PI / 180))));
      t.speed = Math.max(0.1, 0.2 + Math.sin(simTick * 0.1) * 0.1);
      if (t.aisLat) {
        // Physical 15m mast antenna offset scaled by latitude cosine
        const antennaM = 15.0;
        t.aisLat = t.lat + (Math.sin(sway * 1.3) * (antennaM / 111000.0));
        t.aisLon = t.lon + (Math.cos(sway * 1.3) * (antennaM / (111000.0 * Math.cos(t.lat * Math.PI / 180.0))));
      }
    } else {
      // Underway vessels navigating fairways
      const speedMps = t.speed * 0.514444;
      const distKm = (speedMps * deltaSec) / 1000.0;
      const rad = (t.heading * Math.PI) / 180.0;

      t.lat += (distKm / 111.0) * Math.cos(rad);
      t.lon += (distKm / (111.0 * Math.cos(t.lat * Math.PI / 180.0))) * Math.sin(rad);

      // Boundary rebounds in study sector
      if (t.lat < minLat || t.lat > maxLat) t.heading = (180 - t.heading + 360) % 360;
      if (t.lon < minLon || t.lon > maxLon) t.heading = (360 - t.heading + 360) % 360;

      if (t.aisLat) {
        const lagKm = (speedMps * 15.0) / 1000.0;
        t.aisLat = t.lat - (lagKm / 111.0) * Math.cos(rad);
        t.aisLon = t.lon - (lagKm / (111.0 * Math.cos(t.lat * Math.PI / 180.0))) * Math.sin(rad);
      }
    }
  });

  // Only re-render layers if map is NOT in the middle of a zoom animation
  if (!map._animatingZoom) {
    renderMap();
  }
  updateTargetCard();
  updateFleetRosterRealtime();
}

// Ensure layers are re-rendered smoothly immediately upon zoom animation completion
map.on('zoomend', () => {
  renderMap();
});

function toggleSimPlay() {
  playClick();
  simRunning = !simRunning;
  const icon = document.getElementById('icon-sim-play');
  const txt = document.getElementById('sim-status-text');
  if (icon) icon.setAttribute('data-lucide', simRunning ? 'pause' : 'play');
  if (txt) txt.textContent = simRunning ? 'LIVE' : 'PAUSED';
  refreshIcons();
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
    e.preventDefault();
    toggleSimPlay();
  } else if (e.code === 'Escape') {
    closeThesisModal();
  }
});

// ==========================================================================
// 6. SATELLITE SAR OVERLAY CONTROLLER
// ==========================================================================
function toggleSarOverlay() {
  playClick();
  sarOverlayActive = !sarOverlayActive;
  const overlay = document.getElementById('sar-swath-overlay');
  const btn = document.getElementById('btn-sar-toggle');
  const txt = document.getElementById('sar-toggle-text');

  if (overlay) overlay.style.display = sarOverlayActive ? 'block' : 'none';
  if (btn) btn.classList.toggle('active', sarOverlayActive);
  if (txt) txt.textContent = sarOverlayActive ? 'SAR Pass: ON' : 'SAR Pass: OFF';
}

function toggleGraphTopology() {
  playClick();
  graphTopologyActive = !graphTopologyActive;
  const btn = document.getElementById('btn-graph-toggle');
  const txt = document.getElementById('graph-toggle-text');
  if (btn) btn.classList.toggle('active', graphTopologyActive);
  if (txt) txt.textContent = graphTopologyActive ? 'Graph: ON' : 'Graph: OFF';
  renderMap();
}

function toggleMapLayer(layerKey) {
  playClick();
  mapLayersActive[layerKey] = !mapLayersActive[layerKey];
  const btn = document.getElementById(`layer-btn-${layerKey}`);
  if (btn) btn.classList.toggle('active', mapLayersActive[layerKey]);

  if (layerKey === 'anchorage') {
    if (mapLayersActive.anchorage) layerAnchorage.addTo(map);
    else map.removeLayer(layerAnchorage);
  } else if (layerKey === 'buffer') {
    if (mapLayersActive.buffer) layerShoreBuffer.addTo(map);
    else map.removeLayer(layerShoreBuffer);
  } else if (layerKey === 'fairway') {
    if (mapLayersActive.fairway) layerFairways.addTo(map);
    else map.removeLayer(layerFairways);
  } else if (layerKey === 'graph') {
    graphTopologyActive = mapLayersActive.graph;
    const gBtn = document.getElementById('btn-graph-toggle');
    const gTxt = document.getElementById('graph-toggle-text');
    if (gBtn) gBtn.classList.toggle('active', graphTopologyActive);
    if (gTxt) gTxt.textContent = graphTopologyActive ? 'Graph: ON' : 'Graph: OFF';
    renderMap();
  }
}

// ==========================================================================
// 7. MINIMALIST LEAFLET MARKERS (Directional SVGs & Reticles)
// ==========================================================================
function createKissMarkerIcon(tgt, isFlaggedDark, isAnchored, isGhost, isSelected) {
  let color = '#10b981'; // Green for Class 0 Matched Compliant
  if (isFlaggedDark) color = '#f43f5e'; // Crimson for Class 1 Dark Candidate
  else if (isAnchored) color = '#f59e0b'; // Amber for Class 2 Ambiguous / Anchored
  else if (isGhost) color = '#a855f7'; // Violet for Ghost Anomaly

  const heading = tgt.heading || 0;

  let svgSymbol = '';
  if (isGhost) {
    svgSymbol = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="${color}" stroke-width="1.8" stroke-dasharray="3,3"/>
        <circle cx="12" cy="12" r="3" fill="${color}"/>
      </svg>
    `;
  } else if (isAnchored && currentMode === 'gnn') {
    svgSymbol = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="5" r="3"></circle>
        <line x1="12" y1="22" x2="12" y2="8"></line>
        <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
      </svg>
    `;
  } else {
    svgSymbol = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 19,20 12,16 5,20" fill="${color}" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>
      </svg>
    `;
  }

  const reticle = isSelected ? '<div class="vessel-kiss-reticle"></div>' : '';

  return L.divIcon({
    className: 'vessel-kiss-marker',
    html: `
      <div class="vessel-kiss-arrow" style="transform: rotate(${isAnchored || isGhost ? 0 : heading}deg);">
        ${svgSymbol}
      </div>
      ${reticle}
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
}

function createAisPingIcon(tgt, isGhost, isSelected) {
  const color = isGhost ? '#a855f7' : '#10b981';
  return L.divIcon({
    className: 'ais-ping-icon-wrapper',
    html: `
      <div class="ais-ping-dot ${isGhost ? 'ping-ghost' : ''} ${isSelected ? 'ping-selected' : ''}" style="--ping-color: ${color};">
        <span class="ping-pulse"></span>
        <span class="ping-center"></span>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

// ==========================================================================
// 8. MAP RENDERING & BIPARTITE GRAPH TOPOLOGY
// ==========================================================================
function renderMap() {
  layerSAR.clearLayers();
  layerAIS.clearLayers();
  layerVectors.clearLayers();
  layerGraphCandidates.clearLayers();
  layerGraphIntra.clearLayers();

  let matchedCount = 0;
  let darkCount = 0;
  let anchoredCount = 0;
  let ghostCount = 0;

  activeDataset.forEach(tgt => {
    const isGhost = (tgt.type === "ghost");
    let isFlaggedDark = false;
    let isAnchored = (tgt.type === "anchored");

    if (currentMode === "baseline") {
      // Baseline 1 (Hungarian Euclidean): collapses in dense queues, falsely flagging anchored vessels
      if (tgt.type === "dark" || tgt.type === "anchored") isFlaggedDark = true;
    } else if (currentMode === "baseline2") {
      // AIS-only anomaly model: misses radar detections
      if (tgt.type === "dark") isFlaggedDark = true;
    } else if (currentMode === "baseline3") {
      // SAR-only detector: flags all radar blips
      isFlaggedDark = true;
    } else if (currentMode === "ablation_anchorage") {
      // Ablation 2 (No Anchorage Filter): anchored vessels trigger false alarms
      if (tgt.type === "dark" || tgt.type === "anchored") isFlaggedDark = true;
    } else {
      // Proposed ST-GNN
      if (tgt.type === "dark") isFlaggedDark = true;
    }

    if (isGhost) ghostCount++;
    else if (isFlaggedDark) darkCount++;
    else if (isAnchored) anchoredCount++;
    else matchedCount++;

    const isSelected = (tgt.id === selectedTargetId);

    // 1. Radar Contact Marker (SAR Node)
    if (!isGhost) {
      const icon = createKissMarkerIcon(tgt, isFlaggedDark, isAnchored, false, isSelected);
      const marker = L.marker([tgt.lat, tgt.lon], { 
        icon, 
        zIndexOffset: isSelected ? 1000 : (isFlaggedDark ? 800 : 400)
      }).addTo(layerSAR);

      const classLabel = isFlaggedDark ? "Class 1: Dark Candidate" : (isAnchored ? "Class 2: Ambiguous (Anchored)" : "Class 0: Matched Compliant");
      marker.bindTooltip(`<strong>${tgt.name}</strong> (${tgt.id})<br/><span style="color:#94a3b8;">${classLabel}</span><br/>${tgt.speed.toFixed(1)} kts &bull; ${tgt.length}m &bull; ${tgt.rcs || -7.0} dB`, {
        className: 'kiss-tooltip',
        direction: 'top'
      });

      marker.on('click', () => {
        playClick();
        selectedTargetId = tgt.id;
        renderMap();
        updateTargetCard();
        renderFleetList();
        switchTab('tab-target', document.getElementById('tab-btn-target'));
      });
    }

    // 2. AIS Transponder Marker (AIS Node)
    if (tgt.aisLat) {
      const isDropped = (currentDropout > 0 && (Math.sin(simTick + tgt.speed) * 50 + 50) < currentDropout);

      if (!isDropped) {
        const aisIcon = createAisPingIcon(tgt, isGhost, isSelected);
        const aisMarker = L.marker([tgt.aisLat, tgt.aisLon], {
          icon: aisIcon,
          pane: 'aisPingPane',
          zIndexOffset: isSelected ? 1200 : 900
        }).addTo(layerAIS);

        aisMarker.bindTooltip(`<strong>AIS Transponder</strong>: ${tgt.name}<br/>MMSI ${tgt.mmsi || 'N/A'} &bull; ${tgt.speed.toFixed(1)} kts`, {
          className: 'kiss-tooltip',
          direction: 'bottom'
        });

        aisMarker.on('click', () => {
          playClick();
          selectedTargetId = tgt.id;
          renderMap();
          updateTargetCard();
        });

        // 3. Primary Paired Association Line
        if (!isGhost) {
          L.polyline([[tgt.lat, tgt.lon], [tgt.aisLat, tgt.aisLon]], {
            color: isFlaggedDark ? '#f43f5e' : '#10b981',
            weight: isSelected ? 2.2 : 1.4,
            dashArray: isFlaggedDark ? '4, 4' : 'none',
            opacity: isSelected ? 0.95 : 0.6
          }).addTo(layerVectors);
        }
      }
    }
  });

  // 4. Bipartite Graph Candidate Edges Rendering (The Dean's CS Novelty Visualization)
  if (graphTopologyActive && mapLayersActive.graph) {
    activeDataset.forEach(sarNode => {
      if (sarNode.type === "ghost") return;

      activeDataset.forEach(aisCand => {
        if (!aisCand.aisLat) return;

        // Calculate spatial Euclidean/Haversine distance
        const dLat = (sarNode.lat - aisCand.aisLat) * 111.0;
        const dLon = (sarNode.lon - aisCand.aisLon) * 111.0 * Math.cos(sarNode.lat * Math.PI / 180);
        const distKm = Math.sqrt(dLat * dLat + dLon * dLon);

        // 5.0 km Reachability Gating Radius (Physically bounded by 8-12 knots over 15 min)
        if (distKm <= 5.0) {
          const isTruePair = (sarNode.id === aisCand.id);
          const isCurrentSelected = (sarNode.id === selectedTargetId);

          if (currentMode === "baseline") {
            // Baseline 1: Nearest-Neighbor Euclidean Assignment (Shows identity swapping)
            if (activeScenarioKey === "bravo" && (sarNode.id === "SAR-DET #101" || sarNode.id === "SAR-DET #102")) {
              // Draw swapped crossing edges dynamically using the other vessel's active moving AIS node
              const otherId = (sarNode.id === "SAR-DET #101") ? "SAR-DET #102" : "SAR-DET #101";
              const otherNode = activeDataset.find(t => t.id === otherId);
              if (otherNode && otherNode.aisLat) {
                L.polyline([[sarNode.lat, sarNode.lon], [otherNode.aisLat, otherNode.aisLon]], {
                  color: '#f43f5e',
                  weight: 1.6,
                  dashArray: '3, 4',
                  opacity: 0.75
                }).addTo(layerGraphCandidates);
              }
            }
          } else {
            // ST-GNN: Multi-Candidate Bipartite Subgraph with Soft Attention Weights
            if (isCurrentSelected || isTruePair) {
              const weight = isTruePair ? (sarNode.affinity || 0.92) : Math.max(0.04, (1 - distKm / 5.0) * 0.25);
              const edgeColor = isTruePair ? '#38bdf8' : 'rgba(56, 189, 248, 0.35)';

              L.polyline([[sarNode.lat, sarNode.lon], [aisCand.aisLat, aisCand.aisLon]], {
                color: edgeColor,
                weight: isTruePair ? 2.0 : 1.0,
                dashArray: isTruePair ? 'none' : '3, 5',
                opacity: isCurrentSelected ? 0.9 : 0.4
              }).addTo(layerGraphCandidates);
            }
          }
        }
      });
    });

    // 5. Intra-Modal Spatial Neighbor Edges (Local Density & Queue Awareness within 2.0 km)
    for (let i = 0; i < activeDataset.length; i++) {
      for (let j = i + 1; j < activeDataset.length; j++) {
        const u = activeDataset[i];
        const v = activeDataset[j];
        if (u.type === "ghost" || v.type === "ghost") continue;

        const dLat = (u.lat - v.lat) * 111.0;
        const dLon = (u.lon - v.lon) * 111.0 * Math.cos(u.lat * Math.PI / 180);
        const distKm = Math.sqrt(dLat * dLat + dLon * dLon);

        if (distKm <= 2.0) {
          L.polyline([[u.lat, u.lon], [v.lat, v.lon]], {
            color: 'rgba(255, 255, 255, 0.08)',
            weight: 1,
            dashArray: '2, 6',
            opacity: 0.3
          }).addTo(layerGraphIntra);
        }
      }
    }
  }

  // Update Top Status Strip
  const totalEl = document.getElementById('stat-total-count');
  if (totalEl) totalEl.textContent = activeDataset.length;
  document.getElementById('stat-matched-count').textContent = matchedCount;
  document.getElementById('stat-dark-count').textContent = darkCount;
  document.getElementById('stat-loiter-count').textContent = anchoredCount;
  const ghostCountEl = document.getElementById('stat-ghost-count');
  if (ghostCountEl) ghostCountEl.textContent = ghostCount;

  // Update FPR badge in top strip
  const fprEl = document.getElementById('stat-fpr-val');
  const fprDeltaEl = document.getElementById('stat-fpr-delta');
  if (fprEl) {
    const isBase = (currentMode === 'baseline');
    fprEl.textContent = isBase ? "26.4%" : "3.7%";
    fprEl.style.color = isBase ? "var(--crimson)" : "var(--emerald)";
    if (fprDeltaEl) {
      fprDeltaEl.textContent = isBase ? "(+22.7% Error)" : "(-22.7% vs Baseline)";
      fprDeltaEl.style.color = isBase ? "var(--crimson)" : "#a7f3d0";
    }
  }

  updateCompareMetrics(matchedCount, darkCount, anchoredCount);
}

// ==========================================================================
// 9. TAB 1: TARGET INSPECTOR & GNN EXPLAINABILITY
// ==========================================================================
function updateTargetCard() {
  const tgt = activeDataset.find(t => t.id === selectedTargetId) || activeDataset[0];
  if (!tgt) return;

  const nameEl = document.getElementById('target-name');
  const idEl = document.getElementById('target-id');
  const mmsiPill = document.getElementById('target-mmsi-pill');
  const badgeEl = document.getElementById('target-badge');
  const speedEl = document.getElementById('target-speed');
  const lenEl = document.getElementById('target-length');
  const rcsEl = document.getElementById('target-rcs');
  const aisEl = document.getElementById('target-ais');
  const anchStatusEl = document.getElementById('target-anchorage-status');
  const decisionEl = document.getElementById('target-decision');
  const expEl = document.getElementById('target-explanation');
  const coordsEl = document.getElementById('target-coords');
  const gapEl = document.getElementById('target-gap');
  const shoreDistEl = document.getElementById('target-shore-dist');
  const affEl = document.getElementById('target-affinity');
  const affStatEl = document.getElementById('target-affinity-stat');
  const affBar = document.getElementById('target-affinity-bar');
  const affSub = document.getElementById('target-affinity-sub');
  const threatEl = document.getElementById('target-threat');
  const threatBar = document.getElementById('target-threat-bar');
  const actionEl = document.getElementById('target-action');

  const isGhost = (tgt.type === "ghost");
  let isFlaggedDark = false;
  let isAnchored = (tgt.type === "anchored");

  if (currentMode === "baseline") {
    if (tgt.type === "dark" || tgt.type === "anchored") isFlaggedDark = true;
  } else if (currentMode === "ablation_anchorage") {
    if (tgt.type === "dark" || tgt.type === "anchored") isFlaggedDark = true;
  } else {
    if (tgt.type === "dark") isFlaggedDark = true;
  }

  nameEl.textContent = tgt.name;
  idEl.textContent = tgt.id;
  if (mmsiPill) mmsiPill.textContent = tgt.mmsi ? `MMSI: ${tgt.mmsi}` : 'MMSI: Offline';
  speedEl.textContent = `${tgt.speed.toFixed(1)} kts \u2022 ${tgt.heading.toFixed(0)}\u00B0`;
  lenEl.textContent = tgt.length > 0 ? `${tgt.length} m \u2022 ${tgt.width || (tgt.length * 0.18).toFixed(1)} m` : '0 m (No Radar)';
  coordsEl.textContent = `${tgt.lat.toFixed(4)} N, ${tgt.lon.toFixed(4)} E`;
  rcsEl.textContent = tgt.rcs ? `${tgt.rcs} dB` : 'N/A';
  if (anchStatusEl) anchStatusEl.textContent = tgt.inAnchorage ? "Inside PPA Zone" : "Open Fairway";
  if (shoreDistEl) shoreDistEl.textContent = tgt.shoreDist ? `${tgt.shoreDist} m (> 150m)` : "1,420 m (> 150m)";

  let spatialGap = 0;
  if (tgt.aisLat) {
    const dLat = (tgt.lat - tgt.aisLat) * 111000;
    const dLon = (tgt.lon - tgt.aisLon) * 111000 * Math.cos(tgt.lat * Math.PI / 180);
    spatialGap = Math.sqrt(dLat * dLat + dLon * dLon).toFixed(0);
  }

  if (isGhost) {
    badgeEl.className = "status-pill pill-ghost";
    badgeEl.textContent = "ANOMALY: GHOST AIS";
    aisEl.textContent = `Active (MMSI ${tgt.mmsi})`;
    decisionEl.textContent = "Phantom Broadcast";
    decisionEl.style.color = "var(--purple)";
    gapEl.textContent = "Empty Sea (0 Radar Target)";
    affEl.textContent = "0.00 (No Radar Contact)";
    if (affStatEl) affStatEl.textContent = "0.00";
    if (affBar) { affBar.style.width = "0%"; affBar.style.background = "var(--purple)"; }
    if (affSub) affSub.textContent = "Phantom signal";
    if (threatEl) threatEl.textContent = "78%";
    if (threatBar) { threatBar.style.width = "78%"; threatBar.style.background = "var(--purple)"; }
    if (actionEl) actionEl.textContent = "Audit transmitter for GPS spoofing";
    expEl.innerHTML = "<strong>ANOMALY:</strong> Active AIS radio transponder signal received, but Sentinel-1 SAR confirms <strong>ZERO metallic hull reflection</strong> in the sector. Flagged as electronic spoofing or phantom trajectory.";
  } else if (isFlaggedDark) {
    badgeEl.className = "status-pill pill-dark";
    badgeEl.textContent = "CLASS 1: CANDIDATE";
    aisEl.textContent = "None (Offline)";
    decisionEl.textContent = "Class 1: Discrepancy";
    decisionEl.style.color = "var(--crimson)";
    gapEl.textContent = spatialGap > 0 ? `${spatialGap} m (Exceeded)` : "> 3,200 m (Gating Bubble)";
    affEl.textContent = `${tgt.affinity || 0.04} (Unpaired)`;
    if (affStatEl) affStatEl.textContent = `${tgt.affinity || 0.04}`;
    if (affBar) { affBar.style.width = `${(tgt.affinity || 0.04) * 100}%`; affBar.style.background = "var(--crimson)"; }
    if (affSub) affSub.textContent = "Unpaired candidate";
    if (threatEl) threatEl.textContent = `${tgt.threat || 92}%`;
    if (threatBar) { threatBar.style.width = `${tgt.threat || 92}%`; threatBar.style.background = "var(--crimson)"; }
    if (actionEl) actionEl.textContent = "Prioritize for aerial/patrol verification";

    if (tgt.type === "anchored" && currentMode === "baseline") {
      expEl.innerHTML = "<strong>FALSE ALARM:</strong> In Baseline 1 (Hungarian Euclidean matching), this anchored vessel is falsely classified as dark because tidal yaw and VHF packet latency exceed the fixed search radius. GATv2 spatiotemporal modeling prevents this error.";
    } else {
      expEl.innerHTML = tgt.diag || tgt.desc || "Radar detected a metallic hull moving through the fairway, but zero AIS transponder broadcasts were received within 5.0 km reachability bubble. Flagged as Dark Candidate.";
    }
  } else if (isAnchored) {
    badgeEl.className = "status-pill pill-anchored";
    badgeEl.textContent = "CLASS 2: AMBIGUOUS (ANCHORED)";
    aisEl.textContent = `MMSI ${tgt.mmsi}`;
    decisionEl.textContent = "Class 2: Anchored Dwell";
    decisionEl.style.color = "var(--amber)";
    gapEl.textContent = `${spatialGap || 65} m (Tidal Yaw)`;
    affEl.textContent = `${tgt.affinity || 0.91} (Suppressed)`;
    if (affStatEl) affStatEl.textContent = `${tgt.affinity || 0.91}`;
    if (affBar) { affBar.style.width = `${(tgt.affinity || 0.91) * 100}%`; affBar.style.background = "var(--amber)"; }
    if (affSub) affSub.textContent = "Anchorage suppressed";
    if (threatEl) threatEl.textContent = `${tgt.threat || 8}%`;
    if (threatBar) { threatBar.style.width = `${tgt.threat || 8}%`; threatBar.style.background = "var(--amber)"; }
    if (actionEl) actionEl.textContent = "Monitor harbor berth queue";
    expEl.innerHTML = tgt.diag || "Legitimate commercial vessel idling inside the designated Batangas anchorage fairway. ST-GNN recognizes berth queuing and suppresses false discrepancy.";
  } else {
    badgeEl.className = "status-pill pill-matched";
    badgeEl.textContent = "CLASS 0: MATCHED COMPLIANT";
    aisEl.textContent = `MMSI ${tgt.mmsi}`;
    decisionEl.textContent = "Class 0: Compliant";
    decisionEl.style.color = "var(--emerald)";
    gapEl.textContent = `${spatialGap || 42} m (&plusmn;15m Window)`;
    affEl.textContent = `${tgt.affinity || 0.97} (Strong Link)`;
    if (affStatEl) affStatEl.textContent = `${tgt.affinity || 0.97}`;
    if (affBar) { affBar.style.width = `${(tgt.affinity || 0.97) * 100}%`; affBar.style.background = "var(--emerald)"; }
    if (affSub) affSub.textContent = "High GATv2 attention";
    if (threatEl) threatEl.textContent = `${tgt.threat || 4}%`;
    if (threatBar) { threatBar.style.width = `${tgt.threat || 4}%`; threatBar.style.background = "var(--emerald)"; }
    if (actionEl) actionEl.textContent = "Log standard fairway passage";
    expEl.innerHTML = tgt.diag || `Vessel ${tgt.name} radio trajectory corresponds directly with Sentinel-1 SAR spaceborne radar coordinates. Clean pairing.`;
  }
}

function focusSelectedTarget() {
  playClick();
  const tgt = activeDataset.find(t => t.id === selectedTargetId);
  if (tgt) {
    const focusLat = (tgt.type === 'ghost') ? (tgt.aisLat || tgt.lat) : tgt.lat;
    const focusLon = (tgt.type === 'ghost') ? (tgt.aisLon || tgt.lon) : tgt.lon;
    map.flyTo([focusLat, focusLon], 13.5, { animate: true, duration: 0.8, easeLinearity: 0.25 });
  }
}

function focusSubgraphEdges() {
  playClick();
  graphTopologyActive = true;
  mapLayersActive.graph = true;
  const btn = document.getElementById('btn-graph-toggle');
  if (btn) btn.classList.add('active');
  const txt = document.getElementById('graph-toggle-text');
  if (txt) txt.textContent = 'Graph: ON';
  focusSelectedTarget();
  renderMap();
}

// ==========================================================================
// 10. TAB 2: FLEET ROSTER & MULTI-SENSOR DIRECTORY
// ==========================================================================
function renderFleetList() {
  const container = document.getElementById('fleet-list-container');
  if (!container) return;
  container.innerHTML = '';

  let list = activeDataset;

  // Search filter
  if (currentSearchQuery.trim() !== '') {
    const q = currentSearchQuery.toLowerCase();
    list = list.filter(t => 
      t.name.toLowerCase().includes(q) || 
      t.id.toLowerCase().includes(q) || 
      (t.mmsi && t.mmsi.includes(q))
    );
  }

  // Category filter
  if (currentFleetFilter === 'dark') {
    list = list.filter(t => currentMode === 'baseline' ? (t.type === 'dark' || t.type === 'anchored') : (t.type === 'dark'));
  } else if (currentFleetFilter === 'anchored') {
    list = list.filter(t => t.type === 'anchored');
  } else if (currentFleetFilter === 'matched') {
    list = list.filter(t => t.type === 'matched');
  } else if (currentFleetFilter === 'ghost') {
    list = list.filter(t => t.type === 'ghost');
  }

  // Update filter count tags
  const cntAll = activeDataset.length;
  const cntDark = activeDataset.filter(t => t.type === 'dark').length;
  const cntMatched = activeDataset.filter(t => t.type === 'matched').length;
  const cntAnchored = activeDataset.filter(t => t.type === 'anchored').length;
  const cntGhost = activeDataset.filter(t => t.type === 'ghost').length;

  if (document.getElementById('flt-cnt-all')) document.getElementById('flt-cnt-all').textContent = cntAll;
  if (document.getElementById('flt-cnt-dark')) document.getElementById('flt-cnt-dark').textContent = cntDark;
  if (document.getElementById('flt-cnt-matched')) document.getElementById('flt-cnt-matched').textContent = cntMatched;
  if (document.getElementById('flt-cnt-anchored')) document.getElementById('flt-cnt-anchored').textContent = cntAnchored;
  if (document.getElementById('flt-cnt-ghost')) document.getElementById('flt-cnt-ghost').textContent = cntGhost;

  const badgeEl = document.getElementById('fleet-count-badge');
  if (badgeEl) badgeEl.textContent = list.length;

  list.forEach(tgt => {
    let isFlaggedDark = (tgt.type === "dark");
    let isAnchored = (tgt.type === "anchored");
    let isGhost = (tgt.type === "ghost");

    if (currentMode === "baseline" && isAnchored) isFlaggedDark = true;

    let pillClass = "pill-matched";
    let pillText = "MATCHED";
    if (isGhost) { pillClass = "pill-ghost"; pillText = "GHOST"; }
    else if (isFlaggedDark) { pillClass = "pill-dark"; pillText = "CANDIDATE"; }
    else if (isAnchored) { pillClass = "pill-anchored"; pillText = "ANCHORED"; }

    const item = document.createElement('div');
    item.className = `fleet-item ${tgt.id === selectedTargetId ? 'active' : ''}`;
    item.id = `fleet-item-${tgt.id.replace(/[^a-zA-Z0-9]/g, '')}`;

    item.onclick = () => {
      playClick();
      selectedTargetId = tgt.id;
      map.panTo([tgt.lat, tgt.lon], { animate: true, duration: 0.5 });
      renderMap();
      updateTargetCard();
      renderFleetList();
      switchTab('tab-target', document.getElementById('tab-btn-target'));
    };

    item.innerHTML = `
      <div class="fleet-info">
        <span class="fleet-name">${tgt.name}</span>
        <span class="fleet-meta mono" id="fleet-meta-${tgt.id.replace(/[^a-zA-Z0-9]/g, '')}">
          ${tgt.id} &bull; ${tgt.speed.toFixed(1)} kts &bull; ${tgt.length}m
        </span>
      </div>
      <span class="status-pill ${pillClass}">${pillText}</span>
    `;

    container.appendChild(item);
  });
}

function updateFleetRosterRealtime() {
  activeDataset.forEach(tgt => {
    const meta = document.getElementById(`fleet-meta-${tgt.id.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (meta) {
      meta.textContent = `${tgt.id} \u2022 ${tgt.speed.toFixed(1)} kts \u2022 ${tgt.length}m`;
    }
  });
}

function handleFleetSearch(val) {
  currentSearchQuery = val;
  renderFleetList();
}

function setFleetFilter(filter, btn) {
  playClick();
  currentFleetFilter = filter;
  document.querySelectorAll('.btn-subfilter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderFleetList();
}

// ==========================================================================
// 11. TAB 3: ACADEMIC BENCHMARKING & STRESS TESTING LAB
// ==========================================================================
const MODEL_BENCHMARK_PROFILES = {
  gnn: {
    tag: "PROPOSED ST-GNN ACTIVE",
    fpr: 3.7,
    prec: 89.4,
    rec: 90.9,
    acc: 95.1,
    f1: 0.901,
    latency: "42 ms",
    why: "<strong>Why Proposed ST-GNN Wins:</strong> In dense Batangas Port anchorages, vessels drift within 60m of one another during berth waiting. Simple Euclidean models trigger cascading identity swaps. ST-GNN utilizes cross-modal graph attention and NAMRIA anchorage geofences to recognize legitimate queues, reducing False-Positive Rate (FPR) from <strong>26.4% down to 3.7%</strong>.",
    tn: 48, fp: 1, fn: 1, tp: 10
  },
  baseline1: {
    tag: "BASELINE 1: HUNGARIAN ACTIVE",
    fpr: 26.4,
    prec: 61.4,
    rec: 72.0,
    acc: 71.0,
    f1: 0.662,
    latency: "18 ms",
    why: "<strong>Baseline 1 Failure Mode:</strong> Relies on Euclidean distance minimization via <code>scipy.optimize.linear_sum_assignment</code>. In congested port waiting sectors, slight radar Doppler displacement or GPS drift causes immediate identity swapping, flagging innocent queued ships as dark vessels (26.4% FPR).",
    tn: 32, fp: 14, fn: 3, tp: 11
  },
  baseline2: {
    tag: "BASELINE 2: AIS ISOFOREST ACTIVE",
    fpr: 34.2,
    prec: 42.1,
    rec: 38.0,
    acc: 54.0,
    f1: 0.399,
    latency: "12 ms",
    why: "<strong>Baseline 2 Failure Mode:</strong> Evaluates only broadcasting AIS telemetry via Isolation Forest. When a dark vessel disables its transponder entirely, zero radio data is generated, making detection physically impossible for AIS-only models.",
    tn: 28, fp: 18, fn: 8, tp: 6
  },
  baseline3: {
    tag: "BASELINE 3: SAR CFAR ACTIVE",
    fpr: 48.0,
    prec: 35.0,
    rec: 94.0,
    acc: 46.0,
    f1: 0.510,
    latency: "65 ms",
    why: "<strong>Baseline 3 Failure Mode:</strong> Detects physical metallic reflections via CFAR sliding-window signal processing. While recall is high (94%), it cannot verify whether vessels are broadcasting compliant AIS, yielding massive false alarms across legal traffic.",
    tn: 22, fp: 24, fn: 1, tp: 13
  },
  ablation_graph: {
    tag: "ABLATION 1: NO GRAPH (MLP)",
    fpr: 18.5,
    prec: 73.2,
    rec: 78.0,
    acc: 80.2,
    f1: 0.755,
    latency: "22 ms",
    why: "<strong>Ablation 1 (Without Graph Attention):</strong> Replaces GATv2 layers with isolated pairwise MLPs. Without graph message-passing, the network loses spatial neighborhood context, increasing FPR by 14.8%.",
    tn: 38, fp: 8, fn: 3, tp: 11
  },
  ablation_anchorage: {
    tag: "ABLATION 2: NO ANCHORAGE FILTER",
    fpr: 22.8,
    prec: 68.0,
    rec: 88.0,
    acc: 76.5,
    f1: 0.767,
    latency: "38 ms",
    why: "<strong>Ablation 2 (Without Anchorage Filter):</strong> Removes NAMRIA anchorage polygons and boundary features. Normal berth queuing is mistakenly flagged as suspicious loitering, spiking false alarms to 22.8%.",
    tn: 35, fp: 11, fn: 2, tp: 12
  },
  ablation_intra: {
    tag: "ABLATION 3: NO INTRA-MODAL EDGES",
    fpr: 11.2,
    prec: 81.5,
    rec: 84.0,
    acc: 87.0,
    f1: 0.827,
    latency: "34 ms",
    why: "<strong>Ablation 3 (Without Intra-Modal Edges):</strong> Prunes vessel-to-vessel cluster links within 2.0 km. Local queue awareness is lost, degrading matching accuracy from 95.1% down to 87.0%.",
    tn: 42, fp: 5, fn: 2, tp: 11
  }
};

function updateCompareMetrics() {
  const profile = MODEL_BENCHMARK_PROFILES[currentMode] || MODEL_BENCHMARK_PROFILES.gnn;

  // Modulate based on stress test slider and traffic tier
  const dropPenalty = currentDropout * 0.12;
  const fprVal = (profile.fpr + currentDropout * 0.05).toFixed(1);
  const precVal = Math.max(25, profile.prec - dropPenalty).toFixed(1);
  const recVal = Math.max(30, profile.rec - dropPenalty * 0.6).toFixed(1);
  const accVal = Math.max(40, profile.acc - dropPenalty).toFixed(1);

  const fprEl = document.getElementById('cmp-fpr');
  if (fprEl) {
    fprEl.textContent = `${fprVal}%`;
    fprEl.style.color = (parseFloat(fprVal) <= 5.0) ? "var(--emerald)" : "var(--crimson)";
  }

  const precEl = document.getElementById('cmp-prec');
  if (precEl) precEl.textContent = `${precVal}%`;

  const recEl = document.getElementById('cmp-rec');
  if (recEl) recEl.textContent = `${recVal}%`;

  const accEl = document.getElementById('cmp-acc');
  if (accEl) accEl.textContent = `${accVal}%`;

  const latEl = document.getElementById('cmp-latency');
  if (latEl) latEl.textContent = `${profile.latency} / scene`;

  const f1El = document.getElementById('cmp-f1');
  if (f1El) f1El.textContent = profile.f1.toFixed(3);

  const tagEl = document.getElementById('compare-engine-tag');
  if (tagEl) {
    tagEl.textContent = profile.tag;
    tagEl.style.color = (currentMode === 'gnn') ? "var(--cyan)" : "var(--crimson)";
  }

  const whyEl = document.getElementById('compare-why-text');
  if (whyEl) whyEl.innerHTML = profile.why;

  // Confusion matrix update
  document.getElementById('cm-tn').textContent = profile.tn;
  document.getElementById('cm-fp').textContent = profile.fp;
  document.getElementById('cm-fn').textContent = profile.fn;
  document.getElementById('cm-tp').textContent = profile.tp;
  document.getElementById('cm-total').textContent = (profile.tn + profile.fp + profile.fn + profile.tp);
}

function switchEvalModel(modelKey) {
  playClick();
  currentMode = modelKey;
  
  // Sync top nav engine pills
  const btnBase = document.getElementById('btn-baseline');
  const btnGnn = document.getElementById('btn-gnn');
  if (modelKey === 'gnn') {
    btnBase.className = "pill-btn";
    btnGnn.className = "pill-btn active-gnn";
  } else {
    btnBase.className = "pill-btn active-baseline";
    btnGnn.className = "pill-btn";
  }

  renderMap();
  updateTargetCard();
  renderFleetList();
  updateCompareMetrics();
}

function updateDropout(val) {
  playClick();
  currentDropout = parseInt(val);
  const lbl = document.getElementById('stress-val-text');
  if (lbl) {
    if (currentDropout === 0) lbl.textContent = "0% Clean Pings";
    else if (currentDropout <= 30) lbl.textContent = `${val}% VHF Loss`;
    else if (currentDropout <= 60) lbl.textContent = `${val}% Jamming Gaps`;
    else lbl.textContent = `${val}% Severe Outage`;
  }
  renderMap();
  updateCompareMetrics();
}

function setDensityTier(tier, btn) {
  playClick();
  currentDensityTier = tier;
  document.querySelectorAll('.btn-density-tier').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const badge = document.getElementById('density-strat-badge');
  if (badge) {
    if (tier === 'low') badge.textContent = "Low (<3 ves/km²)";
    else if (tier === 'med') badge.textContent = "Medium (3-7 ves/km²)";
    else badge.textContent = "High (>7 ves/km²)";
  }
  updateCompareMetrics();
}

// ==========================================================================
// 12. CONTROLS INTERFACE & MODAL ACTIONS
// ==========================================================================
function setMode(mode) {
  playClick();
  currentMode = mode;
  const select = document.getElementById('eval-model-select');
  if (select) select.value = (mode === 'baseline') ? 'baseline1' : 'gnn';
  
  const btnBase = document.getElementById('btn-baseline');
  const btnGnn = document.getElementById('btn-gnn');
  if (mode === 'baseline') {
    btnBase.className = "pill-btn active-baseline";
    btnGnn.className = "pill-btn";
  } else {
    btnBase.className = "pill-btn";
    btnGnn.className = "pill-btn active-gnn";
  }

  renderMap();
  updateTargetCard();
  renderFleetList();
  updateCompareMetrics();

  if (isApiOnline) {
    fetch(`${API_BASE_URL}/api/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: mode, scenario: activeScenarioKey, dropout: currentDropout })
    }).catch(() => {});
  }
}

function switchScenario(key, btn) {
  playClick();
  document.querySelectorAll('.control-box .pill-btn').forEach(b => {
    if (b.id !== 'btn-baseline' && b.id !== 'btn-gnn') b.classList.remove('active');
  });
  if (btn) btn.classList.add('active');

  initScenario(key);
  renderMap();
  fitBounds();
  updateTargetCard();
  renderFleetList();

  if (isApiOnline) {
    fetch(`${API_BASE_URL}/api/scenarios/switch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: key })
    }).catch(() => {});
  }
}

function switchTab(tabId, btn) {
  playClick();
  document.querySelectorAll('.sidebar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  if (btn) btn.classList.add('active');
  const pane = document.getElementById(tabId);
  if (pane) pane.classList.add('active');
}

function fitBounds() {
  if (activeDataset && activeDataset.length > 0) {
    const coords = activeDataset.map(t => [t.lat, t.lon]);
    map.fitBounds(L.latLngBounds(coords), { padding: [40, 40], maxZoom: 13 });
  }
}

// Thesis Blueprint Modal Handlers
function openThesisModal() {
  playClick();
  const modal = document.getElementById('thesis-modal');
  if (modal) modal.style.display = 'flex';
  refreshIcons();
}

function closeThesisModal() {
  playClick();
  const modal = document.getElementById('thesis-modal');
  if (modal) modal.style.display = 'none';
}

function switchModalTab(paneId, btn) {
  playClick();
  document.querySelectorAll('.modal-tabs .m-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.modal-body .m-pane').forEach(p => p.classList.remove('active'));

  if (btn) btn.classList.add('active');
  const target = document.getElementById(paneId);
  if (target) target.classList.add('active');
}

// Coordinate Tracker & Overpass Clock
map.on('mousemove', (e) => {
  const coords = document.getElementById('mouse-coords');
  if (coords) coords.textContent = `${e.latlng.lat.toFixed(4)} N, ${e.latlng.lng.toFixed(4)} E \u2022 NAMRIA Chart PH4401`;
});

function updateClock() {
  const utcEl = document.getElementById('utc-clock');
  const pstEl = document.getElementById('pst-clock');
  const now = new Date();

  if (utcEl) utcEl.textContent = `UTC ${now.toISOString().substring(11, 19)}Z`;
  
  if (pstEl) {
    // Philippine Standard Time (UTC+8)
    const pstHour = (now.getUTCHours() + 8) % 24;
    const pstMin = String(now.getUTCMinutes()).padStart(2, '0');
    const pstSec = String(now.getUTCSeconds()).padStart(2, '0');
    pstEl.textContent = `PST ${String(pstHour).padStart(2, '0')}:${pstMin}:${pstSec}`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// ==========================================================================
// 13. FULL-STACK API INTEGRATION (REST & SSE STREAM)
// ==========================================================================
let API_BASE_URL = (window.location.protocol && window.location.protocol.startsWith('http')) 
  ? window.location.origin 
  : 'http://127.0.0.1:3080';

let isApiOnline = false;
let sseEventSource = null;

async function checkApiHealth() {
  const badgeEl = document.getElementById('api-status-badge');
  const dotEl = document.getElementById('api-status-dot');
  const textEl = document.getElementById('api-status-text');

  const candidateUrls = [
    API_BASE_URL,
    'http://127.0.0.1:3080',
    'http://localhost:3080',
    'http://127.0.0.1:3081',
    'http://localhost:3081',
    'http://127.0.0.1:3001'
  ];

  for (const candidate of candidateUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${candidate}/api/health`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.service && data.service.includes('OCEAN-SIGHT')) {
          API_BASE_URL = candidate;
          isApiOnline = true;
          const portStr = candidate.includes(':') ? candidate.split(':').pop().replace('/', '') : '3080';
          if (dotEl) {
            dotEl.style.backgroundColor = '#10b981'; // Emerald
            dotEl.classList.add('dot-connected');
          }
          if (textEl) textEl.textContent = `API: ONLINE (:${portStr})`;
          if (badgeEl) badgeEl.title = `Connected to ${data.service} v${data.version || '3.4'} (Map & Telemetry API Active)`;
          syncMapApiLayers(candidate);
          connectSseStream();
          return true;
        }
      }
    } catch (err) {}
  }

  isApiOnline = false;
  if (dotEl) {
    dotEl.style.backgroundColor = '#64748b'; // Slate
    dotEl.classList.remove('dot-connected');
  }
  if (textEl) textEl.textContent = `API: STANDALONE`;
  if (badgeEl) badgeEl.title = `Running locally in browser (Click to test API connection)`;
  return false;
}

async function syncMapApiLayers(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/map/layers`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[API] Synchronized ${data.totalLayers || 6} GIS Map Layers from Backend:`, data);
    }
  } catch (e) {}
}

function connectSseStream() {
  if (sseEventSource) {
    sseEventSource.close();
    sseEventSource = null;
  }

  try {
    sseEventSource = new EventSource(`${API_BASE_URL}/api/stream`);
    sseEventSource.addEventListener('kinematics', (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.scenario === activeScenarioKey && payload.targets && payload.targets.length > 0) {
          payload.targets.forEach(serverTgt => {
            const clientTgt = activeDataset.find(t => t.id === serverTgt.id);
            if (clientTgt) {
              clientTgt.lat = serverTgt.lat;
              clientTgt.lon = serverTgt.lon;
              clientTgt.speed = serverTgt.speed;
              clientTgt.heading = serverTgt.heading;
              if (serverTgt.aisLat) {
                clientTgt.aisLat = serverTgt.aisLat;
                clientTgt.aisLon = serverTgt.aisLon;
              }
            }
          });
          renderMap();
          updateTargetCard();
          updateFleetRosterRealtime();
        }
      } catch (e) {}
    });

    sseEventSource.onerror = () => {
      if (sseEventSource) {
        sseEventSource.close();
        sseEventSource = null;
      }
    };
  } catch (e) {}
}

// ==========================================================================
// 14. BOOTSTRAP INITIALIZATION
// ==========================================================================
initScenario("alpha");
renderMap();
fitBounds();
updateTargetCard();
renderFleetList();
startSimulation();
refreshIcons();
checkApiHealth();
