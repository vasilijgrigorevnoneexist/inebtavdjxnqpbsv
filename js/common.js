




var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
  },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
  },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
  },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
  },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
  },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
  },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
  },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
  },
        {
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
  },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Internet Explorer",
            versionSearch: "MSIE"
  },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
  },
        {
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
  }
  ],
    dataOS: [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
  },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
  },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
  },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
  }
  ]

};
BrowserDetect.init();

/*if (!(BrowserDetect.browser == 'Safari')) {*/
    /*$(".transform3d_block").hover3d({
        selector: ".transform3d_block_childe",
        sensitivity: 30
    });*/


    if (!(BrowserDetect.browser == 'Safari')) {
        $('.mocup_fs').attr('data-aos','flip-left');
    };

    AOS.init();

    
    document.body.innerHTML = document.body.innerHTML + '<svg id="svg"></svg>';
    



    /*--------------------
    SETTINGS
    --------------------*/
    let settings = {
        amplitudeX: 119,
        amplitudeY: 44,
        lines: 30,
        hueStartColor: 38,
        saturationStartColor: 100,
        lightnessStartColor: 100,
        hueEndColor: 238,
        saturationEndColor: 66,
        lightnessEndColor: 80,
        smoothness: 3,
        offsetX: 10,
        fill: true,
        crazyness: true
    }
    
    
    /*
    window.onscroll = function() {
        
    }*/


    /*--------------------
    VARS
    --------------------*/
    let svg = document.getElementById('svg'),
        winW = window.innerWidth,
        winH = window.innerHeight,
        Colors = [],
        Paths = [],
        Mouse = {
            x: winW / 2,
            y: winH / 2
        },
        overflow,
        startColor,
        endColor,
        gui;

    

    
    /*--------------------
    PATH
    --------------------*/
    class Path {
        constructor(y, fill, offsetX) {
            this.rootY = y;
            this.fill = fill;
            this.offsetX = offsetX;
        };

        createRoot() {
            this.root = [];
            let offsetX = this.offsetX;
            let x = -overflow + offsetX;
            let y = 0;
            let rootY = this.rootY;
            let upSideDown = 0;

            this.root.push({
                x: x,
                y: rootY
            });

            while (x < winW) {
                let value = Math.random() > 0.5 ? 1 : -1;

                // Crazyness
                if (settings.crazyness) {
                    x += parseInt((Math.random() * settings.amplitudeX / 2) + (settings.amplitudeX / 2));
                    y = (parseInt((Math.random() * settings.amplitudeY / 2) + (settings.amplitudeY / 2)) * value) + rootY;
                } else {
                    // Geometric
                    upSideDown = !upSideDown;
                    value = (upSideDown == 0) ? 1 : -1;

                    x += settings.amplitudeX;
                    y = settings.amplitudeY * value + rootY;
                }

                this.root.push({
                    x: x,
                    y: y
                });
            };

            this.root.push({
                x: winW + overflow,
                y: rootY
            });
        };

        createCircles() {
            const fill = '#fff';
            this.root.forEach(function (key, obj) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('r', 1);
                circle.setAttribute('cx', key.x);
                circle.setAttribute('cy', key.y);
                circle.setAttribute('fill', 'rgba(255, 255, 255, .3)');
                svg.appendChild(circle);
            })
        };

        createPath() {
            const root = this.root;
            const fill = this.fill;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', fill);
            path.setAttribute('stroke', fill);
            path.setAttribute('class', 'wave');
            svg.appendChild(path);
            if (settings.fill) {
                svg.setAttribute('class', 'path');
            } else {
                svg.setAttribute('class', 'stroke');
            }

            // first & second points
            let d = `M -${overflow} ${winH + overflow}`;
            d += ` L ${root[0].x} ${root[0].y}`;

            // magic points
            for (let i = 1; i < this.root.length - 1; i++) {
                let prevPoint = root[i - 1];
                let actualPoint = root[i];
                let diffX = (actualPoint.x - prevPoint.x) / settings.smoothness;
                let x1 = prevPoint.x + diffX;
                let x2 = actualPoint.x - diffX;
                let x = actualPoint.x;
                let y1 = prevPoint.y;
                let y2 = actualPoint.y;
                let y = actualPoint.y;

                d += ` C ${x1} ${y1}, ${x2} ${y2}, ${x} ${y}`;
            }

            // Second last
            const reverseRoot = root.reverse();
            d += ` L ${reverseRoot[0].x} ${reverseRoot[0].y}`;
            root.reverse();

            // Last point
            d += ` L ${winW + overflow} ${winH + overflow}`;

            // Close path
            d += ` Z`;

            path.setAttribute('d', d);
            /*console.log(d);*/
            
            /*all for d end*/
        };

        createLines() {
            const root = this.root;
            const fill = this.fill;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', fill);
            path.classList.add('path');
            svg.appendChild(path);

            // first & second points
            let d = `M -${overflow} ${winH + overflow}`;
            d += ` L ${root[0].x} ${root[0].y}`;

            // Magic points
            for (let i = 1; i < root.length - 1; i++) {
                d += ` L ${root[i].x} ${root[i].y}`;
            }

            // Second last & last points
            const reverseRoot = root.reverse();
            d += ` L ${reverseRoot[0].x} ${reverseRoot[0].y}`;
            d += ` L ${winW + overflow} ${winH + overflow}`;
            root.reverse();

            // Close path
            d += ` Z`;

            path.setAttribute('d', d);
        };
    };


    /*--------------------
    INIT
    --------------------*/
    function init() {
        // Overflow
        overflow = Math.abs(settings.lines * settings.offsetX);

        // Colors
        startColor = `hsl(${settings.hueStartColor}, ${settings.saturationStartColor}%, ${settings.lightnessStartColor}%)`;
        endColor = `hsl(${settings.hueEndColor}, ${settings.saturationEndColor}%, ${settings.lightnessEndColor}%)`;
        Colors = chroma.scale([startColor, endColor]).mode('lch').colors(settings.lines + 2);

        // Reset
        Paths = [];
        document.body.removeChild(svg);
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('id', 'svg');
        document.body.appendChild(svg);

        // Background
        if (settings.fill) {
            svg.style.backgroundColor = Colors[0];
        } else {
            svg.style.backgroundColor = '#000';
        }

        // Lines
        for (let i = 0; i < settings.lines + 1; i++) {
            let rootY = parseInt(winH / settings.lines * i);
            const path = new Path(rootY, Colors[i + 1], settings.offsetX * i);
            Paths.push(path);
            path.createRoot();
        }
        Paths.forEach(function (path) {
            path.createPath();
        });
    };

    $(document).ready(function() {
          init();
    });
    
    



    /*--------------------
    WIN RESIZE
    --------------------*/
    window.addEventListener('resize', function () {
        winW = window.innerWidth;
        winH = window.innerHeight;
        init();
    });


    function smooth_scroll_effect (a) {
        /*var settings = {
            amplitudeX: amplitudeX + 1,
            amplitudeY: amplitudeY + 1,
            lines: 30,
            hueStartColor: 208,
            saturationStartColor: 66,
            lightnessStartColor: 50,
            hueEndColor: 38,
            saturationEndColor: 18,
            lightnessEndColor: 50,
            smoothness: 3,
            offsetX: -3,
            fill: false,
            crazyness: false
        }*/
        if (a.lines<50) {
            /*a.lines = a.lines + 1;*/
            /*a.amplitudeY = a.amplitudeY + 0.03;
            a.amplitudeX = a.amplitudeX + 0.03;*/
            a.offsetX = a.offsetX + 0.2;
        } else {
            a.lines = def_lines + 0;
            /*a.amplitudeY = def_amplitudeY;
            a.amplitudeX = def_amplitudeX;*/
        }
        a.offsetX = a.offsetX + 0.001;
        
        if (a.offsetX > 720) {
            a.offsetX = -3;
        }
        
        init();
    }

    function start() {
      smooth_scroll_effect (settings)
      setTimeout(start, 30);
    
    }
    
    
    /*start();*/
   /* window.onscroll = function() {
        smooth_scroll_effect (settings);
    }*/

/*};*/


