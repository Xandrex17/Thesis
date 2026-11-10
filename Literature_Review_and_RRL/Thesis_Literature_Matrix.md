# Thesis Literature Matrix: Technical Synthesis & Study Relevance

> **Degree Program:** Bachelor of Science in Computer Science (BSCS) — Batangas State University  
> **Thesis Title:** *A Cross-Modal Spatiotemporal Graph Framework for Detecting Dark-Vessel Candidates Using AIS Trajectories and SAR Imagery*  
> **Target Deployment Area:** Batangas Bay, Port Waters & Anchorages  

---

## 1. The Literature Matrix (Technical Study-Relevant Synthesis)

| Author / Year | Problem | Method | Data | Major Finding | Limitation | Relevance to Study |
|:---|:---|:---|:---|:---|:---|:---|
| [**Welch et al. (2022)**](https://www.science.org/doi/10.1126/sciadv.abq2109)<br>*Science Advances* | Intentional AIS disabling | ML classification across transmission gaps | Global AIS records (>55k events) | Quantified global frequency of intentional transponder shutoffs (>55,000 events) | Relies entirely on self-reported AIS; lacks independent radar verification | Establishes operational requirement for non-cooperative satellite radar integration |
| [**Li et al. (2025)**](https://www.mdpi.com/2072-4292/17/13/2201)<br>*Remote Sensing (MDPI)* | Multi-sensor dark ship detection | Multi-feature association (position, length, course) via JVC global assignment | Satellite imagery (Gaofen-6, Gaofen-3B) paired with AIS | Achieved 91.33% SAR-AIS association accuracy using YOLOv11n-OBB | Pairwise assignment degrades during vessel clustering in port congestion | Provides primary comparative baseline for multi-feature association metrics |
| [**Chen et al. (2026)**](https://www.mdpi.com/2072-4292/18/13/2223)<br>*Remote Sensing (MDPI)* | SAR-AIS matching ambiguity in dense traffic | Epoch time synchronization & spatial alignment | Spaceborne SAR paired with coastal AIS | Isolated epoch synchronization as mandatory prerequisite for spatial matching | Rule-based matching; lacks inter-vessel relational modeling | Defines temporal search window constraints and epoch synchronization logic |
| [**Mou et al. (2026)**](https://doi.org/10.1016/j.ress.2026.113310)<br>*Reliab. Eng. & Sys. Safety* | False alarms caused by port congestion | Dynamic interaction graph neural network | Historical AIS from congested waterways | Relational modeling of multi-vessel traffic significantly suppresses false alarms | Evaluated exclusively on AIS; lacks satellite radar and dark-vessel isolation | Demonstrates effectiveness of relational interaction graphs in suppressing false alarms |
| [**Wang et al. (2024)**](https://www.sciencedirect.com/science/article/abs/pii/S0029801824005699)<br>*Ocean Engineering* | Trajectory prediction in crowded port areas | Spatio-Temporal Graph Convolutional Network | AIS trajectories in crowded harbors | ST-GCN accurately models complex spatial-temporal dependencies in harbor traffic | Unimodal trajectory forecasting; lacks cross-modal sensor association | Provides architectural foundation for constructing inter-vessel spatial interaction edges |
| [**Zhang et al. (2023)**](https://www.sciencedirect.com/science/article/abs/pii/S0029801823022709)<br>*Ocean Engineering* | Multi-ship dependencies in dynamic traffic | Gated spatio-temporal graph aggregation | Commercial vessel AIS trajectories | Gated graphs adaptively capture dynamic multi-vessel maneuvering patterns | Unimodal AIS analysis; lacks radar discrepancy detection | Informs spatiotemporal graph aggregation and attention mechanisms |
| [**Ebenezar et al. (2026)**](https://doi.org/10.1016/j.procs.2026.06.143)<br>*Procedia Computer Science* | Detecting AIS-dark illegal fishing vessels | Physics-informed graph neural diffusion | AIS trajectory gaps & spatial bounds | Extrapolates vessel movement across blackout gaps using kinematic bounds | Lacks independent satellite radar verification layer | Validates physics-informed kinematic reachability bounds across AIS gaps |
| [**Heiselberg et al. (2023)**](https://doi.org/10.1016/j.rse.2023.113492)<br>*Remote Sensing of Environ.* | SAR ship position offset from Doppler shift | Multitask deep learning for SAR velocity/heading | Sentinel-1 SAR imagery & verified AIS | Moving vessels in SAR exhibit spatial offsets proportional to radial velocity | Single-target estimation; lacks multi-vessel graph modeling | Quantifies SAR Doppler shift azimuth displacement for spatial gating tolerances |
| [**Song et al. (2026)**](https://ieeexplore.ieee.org/document/11370684)<br>*IEEE Trans. Aerosp. Electron.* | Clutter interference & dark vessel speed | Subaperture SAR coherence & phase refocusing | Spaceborne single-channel SAR imagery | Suppresses sea clutter and estimates moving vessel velocity in single-channel SAR | Signal processing focus; lacks AIS trajectory integration | Provides signal-level justification for SAR target extraction and velocity estimation |
| [**Forti et al. (2022)**](https://ieeexplore.ieee.org/document/9257404)<br>*IEEE Trans. Intell. Transp.* | Maritime anomaly detection across sensors | Deep sequence models fusing AIS, radar, & context | AIS, radar, & waterway maps (Suez Canal) | Contextual geographic priors significantly enhance anomaly detection accuracy | Sequence model; evaluates neighboring vessels as independent entities | Demonstrates utility of integrating port anchorage geofences as spatial context |
| [**Bhattacharjee et al. (2024)**](https://doi.org/10.1109/ACCESS.2024.3382903)<br>*IEEE Access* | Target ambiguity in 20m Sentinel-1 SAR imagery | Attention-guided CNN with handcrafted features | Sentinel-1 SAR from OpenSARShip | 20m resolution SAR is sufficient for robust vessel target classification | Image classification only; lacks AIS trajectory matching | Validates vessel classification feasibility on 20-meter resolution Sentinel-1 SAR |
| [**Hanmante et al. (2026)**](https://doi.org/10.1016/j.array.2026.100931)<br>*Array (Elsevier)* | Sensor asymmetry in dark-vessel surveillance | Taxonomic review of pixel-, feature-, and decision-level fusion | Sentinel-1 SAR, Gaofen optical, and coastal AIS telemetry | Cuts false alarms 35–60%; pairwise accuracy drops below 75% in dense ports | Revisit latency; pairwise matching lacks relational graph modeling | 2026 SOTA anchor; justifies spatiotemporal graph modeling for congested port waters |
| [**Galdelli et al. (2025)**](https://doi.org/10.1016/j.patrec.2025.02.022)<br>*Pattern Recognit. Lett.* | Dark fishing vessel detection in coastal clutter | Enhanced YOLO detector with AIS matchmaking algorithm | Sentinel-1 SAR, Sentinel-2 optical, and coastal AIS | Outperformed YOLO baselines; isolated dark vessels via AIS cross-referencing | Pairwise distance matchmaking; lacks graph relational modeling | Benchmark for AIS-SAR dark ship detection using rule-based matchmaking |
| [**Holagh & Kobti (2025)**](https://doi.org/10.1016/j.procs.2025.03.057)<br>*Procedia Computer Science* | Dynamic link prediction in time-varying networks | Survey of GNN architectures (GCN, GAT, GraphSAGE) | Benchmark dynamic graph networks | Graph attention networks effectively resolve evolving link prediction under sparsity | Focuses on abstract networks; lacks physical kinematic/port constraints | Provides theoretical foundation for formulating sensor association as dynamic link prediction |
| [**He et al. (2021)**](https://www.mdpi.com/2077-1312/9/2/198)<br>*J. Mar. Sci. Eng. (MDPI)* | High rates of innocent AIS transmission gaps | Visual analytics of AIS signal dropouts | Coastal AIS logs in congested waters | Up to 30% of missing AIS records result from VHF packet collisions | Diagnostic study; lacks automated machine learning recovery framework | Quantifies VHF packet loss rates, justifying candidate status for unmatched targets |

---

## 2. Direct Web Links Directory (By Research Category)

### A. Intentional Dark Vessels & AIS Disabling
* **Welch et al. (2022)** — *Science Advances*: [https://www.science.org/doi/10.1126/sciadv.abq2109](https://www.science.org/doi/10.1126/sciadv.abq2109)
* **Ebenezar et al. (2026)** — *Procedia Computer Science*: [https://doi.org/10.1016/j.procs.2026.06.143](https://doi.org/10.1016/j.procs.2026.06.143)
* **He et al. (2026)** — *Remote Sensing*: [https://doi.org/10.3390/rs18173000](https://doi.org/10.3390/rs18173000)

### B. Cross-Modal AIS-SAR Association & Kinematics
* **Li et al. (2025)** — *Remote Sensing*: [https://www.mdpi.com/2072-4292/17/13/2201](https://www.mdpi.com/2072-4292/17/13/2201)
* **Chen et al. (2026)** — *Remote Sensing*: [https://www.mdpi.com/2072-4292/18/13/2223](https://www.mdpi.com/2072-4292/18/13/2223)
* **Heiselberg et al. (2023)** — *Remote Sensing of Environment*: [https://doi.org/10.1016/j.rse.2023.113492](https://doi.org/10.1016/j.rse.2023.113492)
* **Song et al. (2026)** — *IEEE Trans. Aerospace & Electronic Systems*: [https://ieeexplore.ieee.org/document/11370684](https://ieeexplore.ieee.org/document/11370684)
* **Bhattacharjee et al. (2024)** — *IEEE Access*: [https://doi.org/10.1109/ACCESS.2024.3382903](https://doi.org/10.1109/ACCESS.2024.3382903)

### C. Spatiotemporal Graphs & Port Congestion False Alarms
* **Mou et al. (2026)** — *Reliability Engineering & System Safety*: [https://doi.org/10.1016/j.ress.2026.113310](https://doi.org/10.1016/j.ress.2026.113310)
* **Wang et al. (2024)** — *Ocean Engineering*: [https://www.sciencedirect.com/science/article/abs/pii/S0029801824005699](https://www.sciencedirect.com/science/article/abs/pii/S0029801824005699)
* **Zhang et al. (2023)** — *Ocean Engineering*: [https://www.sciencedirect.com/science/article/abs/pii/S0029801823022709](https://www.sciencedirect.com/science/article/abs/pii/S0029801823022709)
* **Forti et al. (2022)** — *IEEE Trans. Intelligent Transportation Systems*: [https://ieeexplore.ieee.org/document/9257404](https://ieeexplore.ieee.org/document/9257404)
* **He et al. (2021)** — *Journal of Marine Science and Engineering*: [https://www.mdpi.com/2077-1312/9/2/198](https://www.mdpi.com/2077-1312/9/2/198)

---

## 3. The Isolated Research Gap

> Existing literature either employs pairwise AIS-to-SAR association heuristics that degrade in dense ports, or applies graph neural networks exclusively to unimodal AIS telemetry without radar verification. The proposed framework integrates both paradigms by formulating cross-modal association as dynamic link prediction over spatiotemporal interaction graphs, isolating dark-vessel candidates while suppressing harbor false alarms.
