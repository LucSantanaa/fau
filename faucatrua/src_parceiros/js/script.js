document.addEventListener("DOMContentLoaded", () => {
  /* fetch('ids.json')
    .then(response => response.json())
    .then(data => {
      fetchData(data);
    })
    .catch(error => console.error('Erro ao puxar ids:', error)); */
  fetchData({
    uds: [
      "1021098294321098763",
    ],
  });
});

function fetchData(userData) {
  const uids = userData.uds;
  const profileContainer = document.querySelector(".profile-container");

  uids.forEach((uid, index) => {
    const userLink = `https://discord.com/users/${uid}/`;
    const profile = createprofile(index, userLink);
    profileContainer.appendChild(profile);

    setTimeout(() => {
      fetchUser(uid, index);
    }, 100 * index);
  });
}

function fetchUser(uid, index) {
  fetch(`https://api.meshapis.cc/user/${uid}/`)
    .then((response) => response.json())
    .then((userData) => {
      atualizarprofile(index, userData);
    })
    .catch((error) => console.error(error));
}

function atualizarprofile(index, userData) {
  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement("p");
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);
  connsElement.className =
    userData.connectedAccounts && userData.connectedAccounts.length > 0
      ? "conn-container"
      : "conn-container no-connections";
  tagElement.textContent = `${userData.user.username}`;
  tagElement.className = "tag";
  nameElement.textContent =
    userData.user.global_name || userData.user.username || " ";
  imgElement.src = userData.user.avatarUrl;

  const avatarDecorationUrl = userData.user.avatar_decoration_Url; // Pegando a URL do avatar_decoration

  // Adicionando o avatar_decoration à imagem de perfil
  if (avatarDecorationUrl) {
    const avatarDecoration = document.createElement("img");
    avatarDecoration.src = avatarDecorationUrl;
    avatarDecoration.className = "avatar-decoration";

    // Posicionando a decoração absolutamente em relação ao contêiner do avatar
    imgElement.parentNode.style.position = "relative";
    avatarDecoration.style.position = "absolute";
    avatarDecoration.style.top = "0";
    avatarDecoration.style.left = "0";

    // Adicionando a decoração como filho do contêiner do avatar
    imgElement.parentNode.appendChild(avatarDecoration);
  }



  const flags = {
    active_developer:
      "<img class='flag-icon' title='Desenvolvedor(a) Ativo(a)' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/activedeveloper.svg'>",
      early_supporter:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/pig.svg' alt='Premium Early Supporter' title='Apoiador Inicial'>",
    hypesquad_house_1:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/hypebravery.svg' alt='HypeSquad Online House 1' title='Bravery'>",
    hypesquad_house_2:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/hypebrilliance.svg' alt='HypeSquad Online House 2' title='Brilliance'>",
    hypesquad_house_3:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/hypebalance.svg' alt='HypeSquad Online House 3' title='Balance'>",
    premium:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/nitro.svg' alt='Nitro' title='Nitro'>",
    guild_booster_lvl1:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl1.svg' alt='Boost Level 1' title='Boost Nível 1'>",
    guild_booster_lvl2:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl2.svg' alt='Boost Level 2' title='Boost Nível 2'>",
    guild_booster_lvl3:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl3.svg' alt='Boost Level 3' title='Boost Nível 3'>",
    guild_booster_lvl4:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl4.svg' alt='Boost Level 4' title='Boost Nível 4'>",
    guild_booster_lvl5:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl5.svg' alt='Boost Level 5' title='Boost Nível 5'>",
    guild_booster_lvl6:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl6.svg' alt='Boost Level 6' title='Boost Nível 6'>",
    guild_booster_lvl7:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl7.svg' alt='Boost Level 7' title='Boost Nível 7'>",
    guild_booster_lvl8:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl8.svg' alt='Boost Level 8' title='Boost Nível 8'>",
    guild_booster_lvl9:
      "<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/lvl9.svg' alt='Boost Level 9' title='Boost Nível 9'>",
    verified_developer: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/dev.svg' alt='Verified Developer' title='Desenvolvedor Verificado de bots Pioneiro'>`,
    hypesquad: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/hypesquad.svg' alt='HypeSquad' title='HypeSquad Events'>`,
    partner: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg' alt='Partner' title='Dono(a) de servidor parceiro'>`,
    certified_moderator: `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/moderator.svg' alt='Moderador' title='Moderator'>`,
    bughunterleverl2: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg' alt='BugHunter' title='BugHunter 2'>`,
  };

  flagsElement.innerHTML =
  userData.badges && userData.badges.length > 0
    ? userData.badges
        .map((badge) => {
          const flagHtml = flags[badge];
          if (flagHtml) {
            const titleText = flagHtml.match(/title='(.*?)'/);
            const title = titleText ? titleText[1] : "";
            return `<div class="tooltip" style="white-space: nowrap;">${flagHtml}<span class="tooltiptext">${title}</span></div>`;
          } else {
            return ''; // Retorna uma string vazia se o distintivo não for encontrado em flags
          }
        })
        .join("")
    : `<img class='flag-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/invis.png' alt=' '>`;


  const connections = {
    paypal: {
      icon: "<img class='conn-icon' src='https://discord.com/assets/c44f32fe60d6657fda9f.svg'>",
      off: true,
    },
    domain: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/domain.svg'>",
      link: "https://",
    },
    steam: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/steam.svg'>",
      link: "https://steamcommunity.com/profiles/",
    },
    epicgames: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/epicgames.svg'>",
      off: true,
    },
    spotify: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/spotify.svg'>",
      link: "https://open.spotify.com/user/",
    },
    battlenet: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/battlenet.svg'>",
      off: true,
    },
    crunchyroll: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/crunchyroll.svg'>",
      off: true,
    },
    ebay: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/ebay.svg'>",
      off: true,
    },
    facebook: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/facebook.svg'>",
      link: "https://www.facebook.com/@",
    },
    github: {
      icon: "<img class='conn-icon'src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/github.svg'>",
      link: "https://github.com/",
      user: true,
    },
    leagueoflegends: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/leagueoflegends.svg'>",
      off: true,
    },
    playstation: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/playstation.svg'>",
      off: true,
    },
    reddit: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/reddit.svg'>",
      link: "https://www.reddit.com/user/",
      user: true,
    },
    riotgames: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/riotgames.svg'>",
      off: true,
    },
    tiktok: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/tiktok.svg'>",
      link: "https://www.tiktok.com/@",
      user: true,
    },
    twitch: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/twitch.svg'>",
      link: "https://www.twitch.tv/",
      user: true,
    },
    twitter: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/twitter.svg'>",
      link: "https://twitter.com/",
      user: true,
    },
    xbox: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/xbox.svg'>",
      off: true,
    },
    youtube: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/youtube.svg'>",
      link: "https://www.youtube.com/channel/",
    },
    instagram: {
      icon: "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/connections/instagram.svg'>",
      link: "https://www.instagram.com/",
      user: true,
    },
  };

  connsElement.innerHTML =
    userData.connectedAccounts && userData.connectedAccounts.length > 0
      ? userData.connectedAccounts
          .map((conn) => {
            const lowerCaseType = conn.type.toLowerCase();
            if (lowerCaseType in connections) {
              const connection = connections[lowerCaseType];
              if (connection.off) {
                return `<a title="${conn.name || ""}" class="tooltip">${
                  connection.icon
                }<span class="tooltiptext">${conn.name || ""}</span></a>`;
              }
              if (connection.user) {
                return `<a href="${connection.link}${
                  conn.name
                }" target="_blank" class="tooltip">${
                  connection.icon
                }<span class="tooltiptext">${conn.name || ""}</span></a>`;
              } else {
                return `<a href="${connection.link}${
                  conn.id
                }" target="_blank" class="tooltip">${
                  connection.icon
                }<span class="tooltiptext">${conn.name || ""}</span></a>`;
              }
            }
            return "";
          })
          .join(" ")
      : "<img class='conn-icon' src='https://raw.githubusercontent.com/rhxsp/rhxDiscordAssets/main/badges/invis.png' alt=' '>";

  nameElement.appendChild(tagElement);

  imgElement.addEventListener("load", () => {
    const profileElement = document.querySelector(
      `.profile:nth-child(${index + 1}`
    );
    profileElement.classList.add("loaded");
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement("div");
  profile.className = "profile";
  const link = document.createElement("a");
  link.href = userLink || `https://discord.com/users/${index + 1}`;
  link.target = "_blank";
  link.title = `Clique para ir para o profile.`;

  const avatar = document.createElement("img");
  avatar.id = `avatar${index + 1}`;
  avatar.alt = "";

  const nameContainer = document.createElement("div");
  nameContainer.className = "name-container";

  const nameParagraph = document.createElement("p");
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = " ";

  const flagsParagraph = document.createElement("p");
  flagsParagraph.id = `flags${index + 1}`;
  flagsParagraph.innerHTML = " ";

  const connsParagraph = document.createElement("p");
  connsParagraph.id = `conns${index + 1}`;
  connsParagraph.innerHTML = " ";

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);
  nameContainer.appendChild(flagsParagraph);
  nameContainer.appendChild(connsParagraph);
  profile.appendChild(link);
  profile.appendChild(nameContainer);
  avatar.addEventListener("load", () => {
    VanillaTilt.init(profile, {
      max: 25,
      speed: 1000,
      glare: true,
      "max-glare": 0.2,
      gyroscope: true,
    });
  });

  return profile;
}

function removeOverlay() {
  var overlay = document.querySelector(".black-overlay");
  Musica();
  overlay.style.transition = "opacity 1s";
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000);
}

function Musica() {
  const audio = document.getElementById("audio");
  audio.volume = 0.5;
  audio.play();
}

function getKey(e) {
  var n = e.keyCode;
  if ((console.log(n), (16 != n && 17 != n) || (mode = 2), 1 == mode)) {
    if (123 == n) return !1;
  } else {
    if (73 == n || 74 == n || 85 == n) return !1;
    if (123 == n) return !1;
  }
}

let mode = 1;
document.oncontextmenu = new Function("return false;");
// window.onkeydown = getKey;

document.querySelector(".profile-container").onmousemove = (e) => {
  for (const profile of document.querySelectorAll(".profile")) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty("--mouse-x", `${x}px`);
    document.documentElement.style.setProperty("--mouse-y", `${y}px`);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("audio");
  var muteButton = document.getElementById("muteButton");
  var muteIcon = document.getElementById("muteIcon");
  var unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }

  muteButton.addEventListener("click", function () {
    if (audio.muted) {
      audio.muted = false;
      muteIcon.style.display = "none";
      unmuteIcon.style.display = "inline-block";
    } else {
      audio.muted = true;
      muteIcon.style.display = "inline-block";
      unmuteIcon.style.display = "none";
    }
  });
});
