import "../scss/main.scss";
import Bgm from "./bgm";

/* ========================= */
/* = Copyright (c) NullDev = */
/* ========================= */

/**
 * Strip all links from the page and add target="_blank" and rel="noopener"
 */
const stripLinks = function(){
    document.querySelectorAll("a").forEach(function(link){
        if (link.host && link.host !== window.location.host){
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener");
        }
    });
};

(() => {
    const bgm = new Bgm("canvas#bg");
    document.addEventListener("DOMContentLoaded", function(){
        bgm.init();
        document.querySelector('a[href="/wiki"]')?.addEventListener("click", function(e){
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert("Soon!");
        });

        stripLinks();
    });
})();
