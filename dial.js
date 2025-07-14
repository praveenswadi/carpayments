/*  ==========================================================================
    Dial
    ========================================================================== */

    // Register GSAP plugins
    gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin);

    var loanAmount = 25000; // Default loan amount
    var monthlyPayment;
    var maxRotation = 179.6;
    var rotationSnap = 360/100; // snap to 1% increments
    var initEasing = "power4.inOut";
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
    var $loanSlider = $('#loanAmountSlider');
    var $loanValue = $('.loan-amount-value');
    var dialTL = gsap.timeline();
    
    gsap.set('.results__dial', {
        visibility: 'visible'
    });
    
    gsap.set([$trackPerc,$circOuter,$circTrack], {
            transformOrigin: '50% 50%',
            drawSVG: '0% 0%'
        });
    
    gsap.set($drag, {
            transformOrigin:"50% 259", // set rotationY to the center of the dial
            rotation: 0
        })
    
    gsap.set($dialMarkers, {
            transformOrigin:"50% 209" // set rotationY to the center of the dial
            // rotation: 0
        })
    
    $dragPadHit.hover(
        function() {
            gsap.to($dragPad, 0.4, {
                transformOrigin:"center center",
                scale: 1.2,
                ease: "elastic.out(0.9, 0.3)"
            });
        }, function() {
            gsap.to($dragPad, 0.2, {
                scale: 1
            });
        }
    );
    
    
        dialTL.to($circTrack, 0.8, {
            drawSVG: '0% 100%',
            ease: "power4.inOut"
        })

        .to($circOuter, 0.8, {
            drawSVG: '0% 100%',
            ease: "power4.inOut"
        }, "-=0.6")

        .to($dialMarkers, 0.8, {
            rotation: function(i) { return 180 - 36*i; },
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.4")

        .from($dialMarkerNums, 0.8, {
            autoAlpha: 0,
            x: 20,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.6")

        .from($dragLine, 0.3, {
            scaleY: 0,
            transformOrigin: "0% 100%",
            ease: "power2.in"
        }, "-=1.2")

        .from($dragInner, 0.5, {
            scale: 0,
            y: 20,
            transformOrigin: "center center",
            ease: "elastic.out(0.9, 0.3)"
        }, "-=0.9")

        .from($resultsText, 0.8, {
            autoAlpha: 0,
            y: 20,
            ease: "power2.out",
            stagger: 0.1
        }, "-=1.4")

        .to($trackPerc, 0.8, {
            drawSVG: '0% 0%', // animate to the default 1% (start position)
            ease: "power4.inOut"
        }, "-=0.4")

        .to($drag, 0.8, {
            rotation: 0, // animate to the default 1% (start position)
            ease: "power4.inOut",
            onUpdate: function() {
                dragUpdate();
            },
            onComplete: function() {
                console.log('Animation complete, calling dragUpdate');
                dragUpdate();
            }
        }, "-=1.0");
    
    
    Draggable.create($drag, {
        type:"rotation",
        inertia:true,
        bounds:{ maxRotation:maxRotation, minRotation:0 },
        snap:function(endValue) { 
            return Math.round(endValue / rotationSnap) * rotationSnap;
        },
        onDrag:dragUpdate,
        onThrowUpdate:dragUpdate
    })
    
    // Loan amount slider event listener
    $loanSlider.on('input', function() {
        loanAmount = parseInt($(this).val());
        $loanValue.text('$' + loanAmount.toLocaleString());
        dragUpdate(); // Recalculate payment
    });
    
    function dragUpdate() {
        var val = gsap.getProperty($drag[0], "rotation");
        console.log('dragUpdate called - rotation:', val, 'maxRotation:', maxRotation);
        
        // Map rotation (0-179.6 degrees) to APR (1-7%)
        var aprRate = 1 + (val/maxRotation) * 6; // 1% at 0deg, 7% at maxRotation
        aprRate = Math.round(aprRate * 10) / 10; // Round to 1 decimal place
        
        // Clamp APR rate
        if(aprRate > 7) {
            aprRate = 7;
        }
        else if(aprRate < 1){
            aprRate = 1;
        }
        
        // Calculate monthly car payment
        // P = loan amount, r = monthly interest rate, n = number of payments (60 months = 5 years)
        var monthlyRate = aprRate / 12 / 100; // Convert APR to monthly decimal rate
        var numPayments = 60; // 5 years
        
        if (monthlyRate === 0) {
            monthlyPayment = loanAmount / numPayments; // If 0% APR
        } else {
            monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        }
        
        monthlyPayment = Math.round(monthlyPayment);
        
        console.log('Calculated APR:', aprRate, '% for loan amount:', loanAmount, 'Monthly payment:', monthlyPayment);
        
        $perc.text(aprRate);
        // Map rotation to drawSVG percentage 
        // Since maxRotation is 179.6 degrees (half circle), we need to map to 50% of the SVG path
        var drawPercentage = (val/maxRotation) * 50; // 0-50% instead of 0-100%
        console.log('Draw percentage:', drawPercentage);
        
        gsap.set($trackPerc, {
            drawSVG: '0% '+ drawPercentage +'%'
        });
        $saving.text(monthlyPayment.toLocaleString('en', {maximumSignificantDigits : 21}));
    }
    
    console.clear();