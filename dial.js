/*  ==========================================================================
    Dial
    ========================================================================== */

    var tCost = 8501373;
    var hhCost = tCost * 0.5;;
    var decreaseScale = 0.006; // per 1%
    var savings;
    var maxRotation = 179.6;
    var rotationSnap = 360/100; // snap to 1% increments
    var initEasing = Power4.easeInOut;
    var $circOuter = $('.results__dial-outer');
    var $circTrack = $('.results__dial-track');
    var $trackPerc = $('.results__dial-track-perc');
    var $dialMarkers = $('.results__dial-marker');
    var $dialMarkerNums = $('.results__dial-percent-text text');
    var $drag = $('.results__dial-drag');
    var $dragPad = $('.results__dial-drag-pad');
    var $dragPadHit = $('.results__dial-drag-hit');
    var $dragLine = $('.results__dial-drag-line');
    var $dragInner = $('.results__dial-drag-inner');
    // var $precText = $('.results__dial-perc-text');
    var $resultsText = $('.results__text');
    var $perc = $('.results__dial-perc');
    // var $effectText = $('.results__dial-effect');
    // var $savingText = $('.results__dial-results');
    var $saving = $('.results__dial-saving');
    var dialTL = new TimelineMax();
    
    TweenMax.set('.results__dial', {
        visibility: 'visible'
    });
    
    TweenMax.set([$trackPerc,$circOuter,$circTrack], {
            transformOrigin: '50% 50%',
            drawSVG: '0% 0%'
        });
    
    TweenMax.set($drag, {
            transformOrigin:"50% 259", // set rotationY to the center of the dial
            rotation: 0
        })
    
    TweenMax.set($dialMarkers, {
            transformOrigin:"50% 209" // set rotationY to the center of the dial
            // rotation: 0
        })
    
    $dragPadHit.hover(
        function() {
            TweenMax.to($dragPad, 0.4, {
                transformOrigin:"center center",
                scale: 1.2,
                ease: Elastic.easeOut.config(0.9, 0.3)
            });
        }, function() {
            TweenMax.to($dragPad, 0.2, {
                scale: 1
            });
        }
    );
    
    
    dialTL.to($circTrack, 0.8, {
            drawSVG: '0% 100%',
            ease: initEasing
        })
    
        .to($circOuter, 0.8, {
            drawSVG: '0% 100%',
            ease: initEasing
        }, "-=0.6")
    
        .staggerTo($dialMarkers, 0.8, {
            cycle: {
                rotation: function(i) { return 180 - 36*i; }
            },
            ease: Power2.easeOut
        }, 0.1, "-=0.4")
    
        .staggerFrom($dialMarkerNums, 0.8, {
            autoAlpha: 0,
            x: 20,
            ease: Power2.easeOut
        }, 0.1, "-=0.6")
    
        .from($dragLine, 0.3, {
            scaleY: 0,
            transformOrigin: "0% 100%",
            ease: Power2.easeIn
        }, "-=1.2")
    
        .from($dragInner, 0.5, {
            scale: 0,
            y: 20,
            transformOrigin: "center center",
            ease: Elastic.easeOut.config(0.9, 0.3)
        }, "-=0.9")
    
        .staggerFrom($resultsText, 0.8, {
            autoAlpha: 0,
            y: 20,
            ease: Power2.easeOut
        }, 0.1, "-=1.4")
    
        .to($trackPerc, 0.8, {
            drawSVG: '0% 10%', // animate to the default 10%
            ease: initEasing
        }, "-=0.4")
    
        .to($drag, 0.8, {
            rotation: 36, // animate to the default 10%
            ease: initEasing,
            onUpdate: function() {
                dragUpdate();
            }
        }, "-=1.0");
    
    
    Draggable.create($drag, {
        type:"rotation",
        throwProps:true,
        bounds:{ maxRotation:maxRotation, minRotation:0 },
        snap:function(endValue) { 
            return Math.round(endValue / rotationSnap) * rotationSnap;
        },
        onDrag:dragUpdate,
        onThrowUpdate:dragUpdate
    })
    
    function dragUpdate() {
        var val = ($drag[0]._gsTransform.rotation);
        var percentage = Math.round((val/180)*100/2);
        savings = Math.round(percentage * decreaseScale * tCost); // 1% savings = 0.006 x total infections cost
        if(savings < 0) {
            savings = 0;
        }
        if(percentage > 50) {
            percentage = 50;
        }
        else if(percentage < 0){
            percentage = "0";
        }
        $perc.text(percentage);
        TweenMax.set($trackPerc, {
            drawSVG: '0% '+ val/180*100/2 +'%'
        });
        $saving.text(savings.toLocaleString('en', {maximumSignificantDigits : 21})); // change! Locale not massively compatible yet especially on mobile
    }
    
    console.clear();