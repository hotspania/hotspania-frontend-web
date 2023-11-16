let urls = {
    url: "",
    urlimages: "",
};

if(!window.location.href.includes("localhost")){
    
    urls = {
        url:'http://localhost:3500/web/',
        urlimages:'http://localhost:3500/api/',
    }

} else {

    urls = {
        url:'https://api.hotspania.es/web/',
        urlimages:"https://api.hotspania.es/api/", 
    }
}

export const Global = urls;