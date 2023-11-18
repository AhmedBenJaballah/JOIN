// Überprüfe, ob die aktuelle URL "board.html" enthält
if (window.location.href.includes("board.html")) {
    // Ändere die Bedingung der Media Query auf 1400px
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @media(max-width:1400px){
            #sidebar{
                height:50px;
                width: 100vw !important;
                border: none;
                border-top: 1px solid #ccc;
                flex-direction: row;
                position: fixed;
                bottom: 0;
                background-color: white;
                z-index: 100;
            }
            #policy{
                display: none;
            }
            #menu img{
                margin-right: 0px;
            }
            #menu {
                text-decoration: none;
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;  
                margin-top: 0px;
            }
            #menu a{
                text-decoration: none;
                color: #42526E; 
                width: 160px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center; 
                flex-direction: column;
                padding-left: 0px;
            }
            #sidebar a:hover:not(#policy a){
                background-color: transparent;
                color: #337aec;
                border-radius: 0px;
            }
        }
    `;
    document.head.appendChild(styleTag);
}
