// Splash Badge - made by IronBill25 on GitHub

document.addEventListener("DOMContentLoaded", async function () {
  const badges = document.querySelectorAll(".splash-badge");
  let cache = new Map();
  if (badges.length === 0) {
    console.error(
      `splashbadge.js is loaded but cannot find the badge.
Look at the README on GitHub for how to correctly set up Splash Badge.
Link: https://github.com/Ironbill25/Splash-Badge/blob/main/README.md`,
    );
    return;
  }
  for (let badge of badges) {
    let configpath = badge.dataset.path;

    if (!configpath) {
      console.warn(
        `There is no configuration path in the Splash Badge div. Using default path.
To prevent this warning please include a data-path attribute on the Splash Badge <div>, pointing to your configuration path.`,
      );
      configpath = "/splashtext.txt";
    }

    let configtext;
    if (cache.has(configpath)) {
      configtext = cache.get(configpath);
    } else {
      try {
        configtext = await fetch(configpath);
        if (!configtext.ok) {
          console.error(
            `Failed loading config ${configpath}: got HTTP error ${configtext.status}`,
          );
          continue;
        }
        configtext = await configtext.text();
      } catch (e) {
        console.error(
          "Failed loading config, does it exist? Error message: " + e,
        );
        continue;
      }
      cache.set(configpath, configtext);
    }

    if (!configtext.includes("---")) {
      console.warn(
        `Ignoring malformed config file ${configpath}: has no --- divider`,
      );
      continue;
    }
    configtext = configtext.split("---");

    let config = configtext[0];
    config = config.split("\n");
    let configobj = {};
    for (let item of config) {
      if (!item) continue;
      if (item.trim().startsWith("#")) continue;
      item = item.split(":");
      if (item.length < 2) {
        console.warn(
          `Ignoring malformed configuration line in config ${configpath}: ${item[0]}`,
        );
        continue;
      }
      configobj[item[0].trim()] = item.slice(1).join(":").trim();
    }

    let splashes = configtext[1]
      .trim()
      .split("\n")
      .filter(Boolean)
      .filter((item) => !item.trim().startsWith("#"));
    if (splashes.length === 0) {
      console.warn(`Config ${configpath} contains no splashes`);
      continue;
    }

    

    let random = splashes[Math.floor(Math.random() * splashes.length)];
    let button = configobj["show-change-button"] === "false" ? false : true;
    if (button) {
      button = document.createElement("button");
      button.classList.add("splash-text-refresh");
      
    } else {
      button = null;
    }
    let textmsg = document.createElement("div");
    textmsg.classList.add("splash-text-message");
    textmsg.textContent = random;
    let style = document.createElement("style");
    style.innerText = `:host {
  display: inline-block;
}

.splash-badge-container {
  display: inline-flex;
  align-items: center;

  font-size: var(--splash-badge-font-size, 0.875rem);

  border: 1px solid var(--splash-badge-border, black);
  background: var(--splash-badge-background, white);
  color: var(--splash-badge-color, black);

  padding: 2px;
  min-height: 2rem;

  box-sizing: border-box;
}

.splash-text-refresh {
  background: var(--splash-badge-button-bg, black);
  color: var(--splash-badge-button-color, white);

  border: none;
  border-radius: 3px;

  padding: 2px 6px;
  margin-right: 0.4rem;

  cursor: pointer;
}

.splash-text-message {
  white-space: nowrap;
}
  
.splash-text-refresh,
.splash-text-message {
  font: inherit;
}`;
    let shadow = badge.attachShadow({ mode: "open" });
    let container = document.createElement("div");
    container.classList.add("splash-badge-container");
    function generateRandomSplash() {
      let random = splashes[Math.floor(Math.random() * splashes.length)];
      textmsg.innerText = random;
    }
    shadow.appendChild(style);
    if (button) {
      button.addEventListener("click", generateRandomSplash);
      button.textContent="#"
      container.appendChild(button);
    };
    container.appendChild(textmsg);
    shadow.appendChild(container);
    for (const [key, value] of Object.entries(configobj)) {
      if (!key.startsWith("css-")) continue;

      badge.style.setProperty("--splash-badge-" + key.slice(4), value);
    }
  }
});
