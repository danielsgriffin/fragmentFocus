// ==UserScript==
// @name         fragmentFocus
// @namespace    http://tampermonkey.net/
// @description  Sidebar to make text fragments in source links visible
// @author       danielsgriffin
// @match        https://you.com/*
// @match        https://web.dev/articles/text-fragments
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';
    let fragmentFocus = "<span style='font-weight: 600; font-size: 20px;'>Fragment</span><span style='font-weight: 800; font-size: 20px;'>Focus</span>";
    var fragmentDiv = document.createElement("div");
    fragmentDiv.id = "fragment-div";

    Object.assign(fragmentDiv.style, {
        position: "fixed",
        top: "120px",
        right: "18px",
        minHeight: "35px",
        display: "none",
        maxHeight: "1000px",
        overflowY: "auto",
        minWidth: "40px",
        maxWidth: "400px",
        zIndex: "9997"
    });

    var listDiv = document.createElement("div");
    listDiv.id = "list-div"
    Object.assign(listDiv.style, {
        position: "relative",
        backgroundColor: "#F5F5F5",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        overflowY: "auto",
        fontSize: "12px",
        display: "none",
        zIndex: "9998"
    });
    fragmentDiv.appendChild(listDiv)

    var collapseButton = document.createElement("button");
    collapseButton.textContent = ">";
    Object.assign(collapseButton.style, {
        position: "absolute",
        top: "0",
        right: "0",
        cursor: "pointer",
        padding: "5px 10px",
        margin: "5px",
        width: "30px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: "9999"
    });

    fragmentDiv.appendChild(collapseButton);
    var isFragmentDivVisible = false; 

    function toggleFragmentDivVisibility() {
        isFragmentDivVisible = !isFragmentDivVisible; 
        listDiv.style.display = isFragmentDivVisible ? "none" : "block"; 
        collapseButton.textContent = isFragmentDivVisible ? "fF" : ">"; 
    }

    toggleFragmentDivVisibility();
    collapseButton.textContent = "fF"; 

    collapseButton.addEventListener("click", toggleFragmentDivVisibility);  

    function updateLinksList() {
        if (!window.fragmentDivVisibilityToggled) {
            toggleFragmentDivVisibility();
            window.fragmentDivVisibilityToggled = true;
        }
        fragmentDiv.style.display = "block"; 

        document.querySelector('[data-testid="youchat-toggle-web-results-panel"]').addEventListener('click', function () {
            if (!isFragmentDivVisible) {
                toggleFragmentDivVisibility();
            }
        });
        var links = Array.from(document.querySelectorAll('a'))
            .map(link => {
                const href = link.getAttribute("href");
                const textFragment = href.includes(':~:text=') ? decodeURIComponent(href.split(':~:text=')[1]) : 'No fragment';
                const sourceNumber = link.textContent;
                return { link, href, textFragment, sourceNumber };
            })
            .filter(link => link.href && link.href.includes(':~:text=')).filter(link => /^\d+$/.test(link.sourceNumber));

        var sourceMap = links.reduce((acc, { sourceNumber, href, textFragment, link }) => {
            if (!acc[sourceNumber]) {
                acc[sourceNumber] = {
                    sourceHref: href.split('#:~:text=')[0],
                    fragments: []
                };
            }
            acc[sourceNumber].fragments.push({ href, textFragment, link });
            return acc;
        }, {});

        listDiv.innerHTML = '';

        var header = document.createElement("div");
        header.innerHTML = fragmentFocus
        listDiv.append(header)

        var linksList = document.createElement('ol');
        Object.assign(linksList.style, {
            fontSize: '10px',
            paddingLeft: '10px'
        });

        var uniqueTextFragments = new Set(links.map(link => link.textFragment));
        var foundMessage = `Found ${Object.keys(sourceMap).length} sources with ${uniqueTextFragments.size} unique text fragments`;
        var foundMessagePara = document.createElement('p');
        foundMessagePara.textContent = foundMessage;
        Object.assign(foundMessagePara.style, {
            fontSize: '10px',
            padding: '0',
            margin: '0'
        });
        listDiv.appendChild(foundMessagePara);

        Object.values(sourceMap).forEach(function (source, index) {
            var sourceHref = source.sourceHref;
            if (sourceHref) {
                var li = document.createElement('li');
                li.id = `source-${index}`; 
                Object.assign(li.style, {
                    fontSize: '10px',
                    margin: '0',
                    marginTop: "10px"
                });
                var a = document.createElement('a');
                a.href = sourceHref;
                Object.assign(a.style, {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    maxWidth: "250px"
                });
                a.textContent = sourceHref;
                li.appendChild(a);

                let previousFragmentText = '';
                let blockquote;
                
                var textFragmentsMap = {}; 
                links.forEach(link => {
                    const text = link.textFragment;
                    if (textFragmentsMap[text]) {
                        textFragmentsMap[text].count++;
                        textFragmentsMap[text].links.push(link.link);
                    } else {
                        textFragmentsMap[text] = { count: 1, links: [link.link] };
                    }
                });

                source.fragments.forEach(function (fragment, fragIndex) {
                    if (fragment.textFragment !== previousFragmentText) {
                        previousFragmentText = fragment.textFragment;

                        blockquote = document.createElement('blockquote');
                        var fragmentText = document.createTextNode(fragment.textFragment + ' ');
                        blockquote.appendChild(fragmentText);
                        Object.assign(blockquote.style, {
                            fontSize: '18px',
                            margin: '0 0 10px 0',
                            paddingLeft: '5px',
                            borderLeft: '2px solid #ccc'
                        });
                        li.appendChild(blockquote);

                        var fragmentLink = document.createElement('a');
                        fragmentLink.style.fontSize = "12px";
                        fragmentLink.textContent = "[link]";
                        fragmentLink.href = fragment.href;
                        blockquote.appendChild(fragmentLink);

                        
                    }

                    fragment.link.addEventListener('mouseover', function () {
                        li.style.backgroundColor = 'lightgreen'; 
                        blockquote.style.backgroundColor = 'lightgreen'; 
                        li.scrollIntoView({ behavior: "smooth", block: "center" }); 
                    });
                    fragment.link.addEventListener('mouseout', function () {
                        li.style.backgroundColor = ''; 
                        blockquote.style.backgroundColor = ''; 
                    });

                    blockquote.addEventListener('mouseover', function () {
                        fragment.link.style.backgroundColor = 'lightgreen'; 
                        fragment.link.scrollIntoView({ behavior: "smooth", block: "center" }); 
                    });
                    blockquote.addEventListener('mouseout', function () {
                        fragment.link.style.backgroundColor = ''; 
                    });

                    if (textFragmentsMap[fragment.textFragment].count > 1) {
                        var duplicateText = document.createElement('span');
                        duplicateText.style.color = 'red';
                        duplicateText.textContent = 'duplicate';
                        li.appendChild(duplicateText);
                    }
                });
                linksList.appendChild(li);
            }
            listDiv.appendChild(linksList);
        });
    }


    

    var previousLinks = new Set();
    var checkCount = 0;
    var interval = 1000;
    function checkForLinks() {
        try {
            var currentLinks = new Set(Array.from(document.querySelectorAll('a'))
                .map(link => link.getAttribute("href"))
                .filter(href => href && href.includes(':~:text=')));
            if (currentLinks.size > 0 && ![...currentLinks].every(link => previousLinks.has(link))) {
                updateLinksList();
                previousLinks = new Set(currentLinks);
                checkCount = 0; 
            } else if (currentLinks.size > 0) {
                checkCount++;
            }
            if (checkCount >= 3) { 
                return; 
            }
            interval += 500; 
        } catch (error) {
            console.error('Error in checkForLinks: ', error);
        } finally {
            if (checkCount < 3) { 
                setTimeout(checkForLinks, interval); 
            }
        }
    }
    setTimeout(checkForLinks, interval); 

    document.body.appendChild(fragmentDiv);
})();