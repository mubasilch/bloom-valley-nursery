const FAV_KEY = "savedGuide";

function generateGuide(){
  const season = document.getElementById("season").value;
  const sun = document.getElementById("sun").value;

  const suggestions = {
    Spring: { "Full Sun":"Marigolds, Lavender, Basil", "Partial Shade":"Ferns, Hostas, Mint", "Low Light":"Snake Plant, Pothos, ZZ Plant" },
    Summer: { "Full Sun":"Succulents, Rosemary, Hibiscus", "Partial Shade":"Coleus, Begonias, Cilantro", "Low Light":"Peace Lily, Spider Plant, Philodendron" },
    Fall:   { "Full Sun":"Mums, Kale, Sedum", "Partial Shade":"Heuchera, Pansies, Parsley", "Low Light":"Aloe (bright indoor), Pothos, Dracaena" },
    Winter: { "Full Sun":"Indoor Herbs by window, Citrus (indoor)", "Partial Shade":"Evergreen planters, Indoor Ferns", "Low Light":"ZZ Plant, Snake Plant, Cast Iron Plant" }
  };

  const rec = suggestions?.[season]?.[sun] || "Ask us in store for a personalized recommendation!";
  const text = `For ${season} with ${sun} conditions, try: ${rec}.`;

  document.getElementById("result").textContent = text;
}

function saveGuide(){
  const value = document.getElementById("result").textContent.trim();
  if(!value){
    alert("Generate a recommendation first.");
    return;
  }
  localStorage.setItem(FAV_KEY, value);
  alert("Saved to favorites!");
}

window.addEventListener("load", () => {
  const saved = localStorage.getItem(FAV_KEY);
  if(saved){
    document.getElementById("saved").textContent = `Saved favorite: ${saved}`;
  }
});
