
// ===== 1) The projects data =====
const projects = [
  {
    title: "AI-Enhanced Text-to-Speech",
    desc: "Capstone (in progress): TTS for engineering texts, scanned PDFs, and multilingual content.",
    image: "/assets/img/tts-logo.png",
    tools: ["Python", "JavaScript", "TTS/ASR toolkits", "PDF parsing/OCR"],
    demo: "",      // add a URL if you have one
    source: "",    // add a repo link if you have one
    date: "2025-10-01"   // newest first — adjust dates as you like
  },
  {
    title: "Autonomous Route-Following Car",
    desc: "Robotic car that detects course boundaries and navigates a predefined route.",
    image: "/assets/img/autocar-log.jpg",
    tools: ["Microcontroller", "Motor drivers", "Sensor arrays", "C/C++"],
    demo: "",
    source: "",
    date: "2025-08-15"
  },
  {
    title: "Smart Distance-Based Music Player",
    desc: "Arduino UNO + ultrasonic sensors to play context-specific music based on distance.",
    image: "/assets/img/music-logo.jpg",
    tools: ["Arduino UNO", "C/C++", "Ultrasonic sensors", "Electronics"],
    demo: "",
    source: "",
    date: "2025-06-20"
  }
];


// ===== 2) Sort newest first =====
projects.sort((a, b) => new Date(b.date) - new Date(a.date));

// ===== 3) Renderer =====
const STEP = 1;      // show 1 at a time (latest first)
let shown = 0;

function projectCard(p) {
  return `
  <div class="col s12 m6 l4">
    <div class="card medium">
      <div class="card-image waves-effect waves-block waves-light">
        <img alt="${p.title}" src="${p.image}" style="height:100%;width:100%" class="activator" />
      </div>
      <div class="card-content">
        <span class="card-title activator teal-text hoverline">
          ${p.title}<i class="mdi-navigation-more-vert right"></i>
        </span>
        <p>${p.desc}</p>
      </div>
      <div class="card-reveal">
        <span class="card-title teal-text"><small>Accomplishments</small>
          <i class="mdi-navigation-close right"></i></span>
        <ul>
          <li><b>Tools:</b> ${p.tools.join(", ")}</li>
        </ul>
        <div class="card-action">
          ${p.demo ? `
            <a aria-label="View Online" href="${p.demo}" target="_blank"
               class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped"
               data-tooltip="View Online"><i class="fa fa-external-link"></i></a>` : ""}
          ${p.source ? `
            <a aria-label="View Source" href="${p.source}" target="_blank"
               class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped"
               data-tooltip="View Source"><i class="fa fa-github"></i></a>` : ""}
        </div>
      </div>
    </div>
  </div>`;
}

function renderMore() {
  const container = document.getElementById("recent-projects");
  const next = projects.slice(shown, shown + STEP);
  next.forEach(p => container.insertAdjacentHTML("beforeend", projectCard(p)));
  shown += next.length;

  const btn = document.getElementById("load-more-projects");
  if (shown >= projects.length && btn) btn.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  renderMore(); // show the latest project initially
  const btn = document.getElementById("load-more-projects");
  if (btn) btn.addEventListener("click", renderMore);
});

