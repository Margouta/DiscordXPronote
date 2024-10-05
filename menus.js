import * as pronote from "pawnote";
import * as dotenv from 'dotenv';
dotenv.config()

function sendWebhook(json, webhook) {
  const labels = {
    "Fait maison - Recette du chef": "<:maison:1291900933881729054>",
    "Assemblé sur place": "<:assembl:1291900930807042099>",
    "Issu de l'Agriculture Biologique": "<:bio:1291900935769030791>",
    "Produits locaux": "<:locaux:1291900932145287219>"
  };

  function getLabels(item) {
    return item.labels.map(label => labels[label.name] || "").join(" ");
  }

  const entree_midi = json.lunch.entry.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");
  const plat_midi = json.lunch.main.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");
  const accompagnement_midi = json.lunch.side.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");
  const vegetarien_midi = json.lunch.drink.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");
  const fromage_midi = json.lunch.fromage.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");
  const dessert_midi = json.lunch.dessert.map(item => `${item.name} ${getLabels(item)}`).join("\n- ");

  fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "content": "<@&1291906995678351470>\n# Menu du jour !\n-# Fait maison - Recette du chef : <:maison:1291900933881729054>   |  Assemblé sur place : <:assembl:1291900930807042099> \n-# Issu de l'Agriculture Biologique : <:bio:1291900935769030791> |  Produits locaux : <:locaux:1291900932145287219>",
      "embeds": [
        {
          "description": "## Repas du midi",
          "color": 37143,
          "fields": [
            {
              "name": "🥗 Entrée :",
              "value": `- ${entree_midi}`,
              "inline": true
            },
            {
              "name": "🥘 Plat :",
              "value": `- ${plat_midi}`,
              "inline": true
            },
            {
              "name": "🥔 Accompagnement :",
              "value": `- ${accompagnement_midi}`,
              "inline": true
            },
            {
              "name": "🥕 Végétarien :",
              "value": `- ${vegetarien_midi}`,
              "inline": true
            },
            {
              "name": "🧀 Fromage :",
              "value": `- ${fromage_midi}`,
              "inline": true
            },
            {
              "name": "🍰 Dessert :",
              "value": `- ${dessert_midi}`,
              "inline": true
            }
          ],
          "footer": {
            "text": "🍽 Bon appétit !"
          }
        }
      ]
    })
  })
}

(async function () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: process.env.PRN_URL,
    deviceUUID: process.env.PRN_UUID,
    kind: pronote.AccountKind.STUDENT,
    username: process.env.PRN_USERNAME,
    password: process.env.PRN_PASSWORD,
  });

  const menus = await pronote.menus(session, new Date());
  const today = new Date();
  const todayMenu = menus.days.find(day => {
    const menuDate = new Date(day.date);
    return (
      menuDate.getFullYear() === today.getFullYear() &&
      menuDate.getMonth() === today.getMonth() &&
      menuDate.getDate() === today.getDate()
    );
  });

  if (todayMenu) {
    console.log(todayMenu);
    sendWebhook(todayMenu, process.env.DISCORD_WEBHOOK_MENU);
  } else {
    console.log("Pas de menu pour aujourd'hui.");
    fetch(process.env.DISCORD_WEBHOOK_MENU, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "content": "Ce matin, j'ai eu une révélation : il n'y a pas de menu pour aujourd'hui. 😱",
      })
    });
  }
})();
