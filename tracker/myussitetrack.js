addScript("https://usmeds.shop/utility/websiteTrackerPhpFiles/userInfoStorer.js",fn);
function addScript(url,fn){
  var elem=document.createElement("script");
  elem.src=url;
  elem.addEventListener("load",fn);
  document.body.insertAdjacentElement("beforeend",elem);
}

function fn(){
    console.log("came")
    new udatalog();
}