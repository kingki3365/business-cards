const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

const categoryMap = {
  "real-estate": "房地產服務",
  "food-service": "餐飲服務",
  "electrical-repair": "水電維修",
  "vehicle-service": "機車與交通服務"
};

document.getElementById("category-title").innerText = categoryMap[type] || "未知分類";

fetch(`data/agents/${type}.json`)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("agent-list");
    list.innerHTML = data.map(agent => `
      <div class="agent-card">
        <img src="images/${agent.photo}" alt="${agent.name}">
        <h3>${agent.name}</h3>
        <p>${agent.description}</p>
        <p>📞 ${agent.phone}</p>
        <p>📍 ${agent.address}</p>
        <p>LINE: ${agent.line}</p>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById("agent-list").innerText = "載入失敗或資料不存在。";
  });
