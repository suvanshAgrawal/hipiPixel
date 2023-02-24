window.addEventListener("popstate", () => {
  console.log("url changed");
});
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function generateUUID() {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return uuid;
}

function init(clientID) {
  let cookieId = getCookie("hipiAdsId") || null;
  if (!cookieId) {
    cookieId = generateUUID();
    document.cookie = `adsId=${cookieId}; path=/; SameSite=None; Secure;`;
    const iframe = document.createElement("iframe");
    const body = document.querySelector("body");
    iframe.src = "https://www.hipi.co.in/feed/for-you";
    iframe.style.display = "none";
    body.append(iframe);
    iframe.onload = function () {
      iframe.contentWindow.postMessage(
        {
          event: "pixelAdsId",
          msg: cookieId
        },
        "https://preprod.hipi.co.in"
      );
    };
  }
  window.toTrackHipi = function toTrack() {};
}

window.hipiInit = init;
