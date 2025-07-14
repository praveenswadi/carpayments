/*  ==========================================================================
    Dial
    ========================================================================== */

    // Register GSAP plugins
    gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin);

    var loanAmount = 25000; // Default loan amount
    var loanTermYears = 3; // Default loan term (3-6 years)
    var monthlyPayment;
    var maxRotationAPR = 179.6; // APR handle rotation (1%-7%)
    var maxRotationTerm = 179.6; // Term handle rotation (3-6 years)
    var rotationSnapAPR = 360/100; // snap to 1% increments
    var rotationSnapTerm = 360/100; // snap to year increments
    var initEasing = "power4.inOut";
    var $circOuter = $('.results__dial-outer');
    var $circTrack = $('.results__dial-track');
    var $trackPerc = $('.results__dial-track-perc');
    var $dialMarkersAPR = $('.results__dial-marker');
    var $dialMarkerNumsAPR = $('.results__dial-percent-text text');
    var $dialMarkersTerm = $('.results__dial-marker-term');
    var $dialMarkerNumsTerm = $('.results__dial-term-text text');
    var $dragAPR = $('.results__dial-drag-apr');
    var $dragTerm = $('.results__dial-drag-term');
    var $dragPad = $('.results__dial-drag-pad');
    var $dragPadTerm = $('.results__dial-drag-pad-term');
    var $dragPadHit = $('.results__dial-drag-hit');
    var $dragPadHitTerm = $('.results__dial-drag-hit-term');
    var $dragLine = $('.results__dial-drag-line');
    var $dragLineTerm = $('.results__dial-drag-line-term');
    var $dragInner = $('.results__dial-drag-inner');
    // var $precText = $('.results__dial-perc-text');
    var $resultsText = $('.results__text');
    var $perc = $('.results__dial-perc');
    var $term = $('.results__dial-term');
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
    
    gsap.set($dragAPR, {
            transformOrigin:"50% 259", // set rotation to the center of the dial for APR
            rotation: 0
        })
    
    gsap.set($dragTerm, {
            transformOrigin:"50% 259", // set rotation to the center of the dial for loan term
            rotation: -150 // Start at 11 o'clock (3 years)
        })
    
    gsap.set($dialMarkersAPR, {
            transformOrigin:"50% 209" // set rotation to the center of the dial
            // rotation: 0
        })
    
    gsap.set($dialMarkersTerm, {
            transformOrigin:"50% 209" // set rotation to the center of the dial
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
    
    $dragPadHitTerm.hover(
        function() {
            gsap.to($dragPadTerm, 0.4, {
                transformOrigin:"center center",
                scale: 1.2,
                ease: "elastic.out(0.9, 0.3)"
            });
        }, function() {
            gsap.to($dragPadTerm, 0.2, {
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

        .to($dialMarkersAPR, 0.8, {
            rotation: function(i) { return 180 - 36*i; },
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.4")

        .to($dialMarkersTerm, 0.8, {
            rotation: function(i) { 
                // Position markers for loan terms: 3yr, 4yr, 5yr, 6yr
                // From 11 o'clock (-150°) to 7 o'clock (210°) anti-clockwise
                var positions = [-150, -105, -60, -15]; // degrees for each term
                return positions[i] || -150;
            },
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.2")

        .from($dialMarkerNumsAPR, 0.8, {
            autoAlpha: 0,
            x: 20,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.6")

        .from($dialMarkerNumsTerm, 0.8, {
            autoAlpha: 0,
            x: -20,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.4")

        .from($dragLine, 0.3, {
            scaleY: 0,
            transformOrigin: "0% 100%",
            ease: "power2.in"
        }, "-=1.2")

        .from($dragLineTerm, 0.3, {
            scaleY: 0,
            transformOrigin: "0% 100%",
            ease: "power2.in"
        }, "-=1.0")

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

        .to($dragAPR, 0.8, {
            rotation: 0, // animate to the default 1% (start position)
            ease: "power4.inOut",
            onUpdate: function() {
                dragUpdate();
            },
            onComplete: function() {
                console.log('Animation complete, calling dragUpdate');
                dragUpdate();
            }
        }, "-=1.0")

        .to($dragTerm, 0.8, {
            rotation: -150, // animate to the default 3 years (11 o'clock)
            ease: "power4.inOut",
            onUpdate: function() {
                dragUpdate();
            },
            onComplete: function() {
                console.log('Term animation complete, calling dragUpdate');
                dragUpdate();
            }
        }, "-=1.0");
    
    
    Draggable.create($dragAPR, {
        type:"rotation",
        inertia:true,
        bounds:{ maxRotation:maxRotationAPR, minRotation:0 },
        snap:function(endValue) { 
            return Math.round(endValue / rotationSnapAPR) * rotationSnapAPR;
        },
        onDrag:dragUpdate,
        onThrowUpdate:dragUpdate
    })

    Draggable.create($dragTerm, {
        type:"rotation",
        inertia:true,
        bounds:{ maxRotation:-15, minRotation:-150 }, // 11 o'clock to 7 o'clock
        snap:function(endValue) { 
            // Snap to positions that give whole year values with existing calculation
            // Based on: loanTermYears = 3 + ((termVal - (-150)) / 135) * 3
            var snapPositions = [-150, -105, -60, -15]; // Results in 3, 4, 5, 6 years
            var closest = snapPositions[0];
            var minDistance = Math.abs(endValue - snapPositions[0]);
            
            for (var i = 1; i < snapPositions.length; i++) {
                var distance = Math.abs(endValue - snapPositions[i]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = snapPositions[i];
                }
            }
            return closest;
        },
        onDrag:dragUpdate,
        onThrowUpdate:dragUpdate
    })
    
    // Loan amount slider event listener
    $loanSlider.on('input', function() {
        loanAmount = parseInt($(this).val());
        $loanValue.text('$' + loanAmount.toLocaleString());
        dragUpdate(); // Recalculate payment
        updatePaymentTable(); // Update payment table
    });
    
    function dragUpdate() {
        var aprVal = gsap.getProperty($dragAPR[0], "rotation");
        var termVal = gsap.getProperty($dragTerm[0], "rotation");
        console.log('dragUpdate called - APR rotation:', aprVal, 'Term rotation:', termVal);
        
        // Map APR rotation (0-179.6 degrees) to APR (1-7%)
        var aprRate = 1 + (aprVal/maxRotationAPR) * 6; // 1% at 0deg, 7% at maxRotation
        
        // Map term rotation (-150 to -15 degrees) to loan terms (3-6 years)
        // -150deg = 3 years, -105deg = 4 years, -60deg = 5 years, -15deg = 6 years
        var termRange = -15 - (-150); // 135 degrees total range
        var termProgress = (termVal - (-150)) / termRange; // 0 to 1
        loanTermYears = 3 + (termProgress * 3); // 3 to 6 years
        
        console.log('Term calculation: termVal=', termVal, 'termRange=', termRange, 'termProgress=', termProgress, 'loanTermYears=', loanTermYears);
        
        aprRate = Math.round(aprRate * 10) / 10; // Round to 1 decimal place
        loanTermYears = Math.round(loanTermYears); // Round to whole numbers only
        
        // Clamp APR rate
        if(aprRate > 7) {
            aprRate = 7;
        }
        else if(aprRate < 1){
            aprRate = 1;
        }
        
        // Clamp loan term
        if(loanTermYears > 6) {
            loanTermYears = 6;
        }
        else if(loanTermYears < 3){
            loanTermYears = 3;
        }
        
        // Calculate monthly car payment
        // P = loan amount, r = monthly interest rate, n = number of payments
        var monthlyRate = aprRate / 12 / 100; // Convert APR to monthly decimal rate
        var numPayments = loanTermYears * 12; // Convert years to months
        
        if (monthlyRate === 0) {
            monthlyPayment = loanAmount / numPayments; // If 0% APR
        } else {
            monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        }
        
        monthlyPayment = Math.round(monthlyPayment);
        
        console.log('Calculated APR:', aprRate, '% | Loan term:', loanTermYears, 'years | Loan amount:', loanAmount, '| Monthly payment:', monthlyPayment);
        
        $perc.text(aprRate);
        $term.text(Math.round(loanTermYears)); // Update the center term display
        // Map APR rotation to drawSVG percentage 
        // Since maxRotationAPR is 179.6 degrees (half circle), we need to map to 50% of the SVG path
        var drawPercentage = (aprVal/maxRotationAPR) * 50; // 0-50% instead of 0-100%
        console.log('Draw percentage:', drawPercentage);
        
        gsap.set($trackPerc, {
            drawSVG: '0% '+ drawPercentage +'%'
        });
        $saving.text(monthlyPayment.toLocaleString('en', {maximumSignificantDigits : 21}));
        updatePaymentTable(); // Update payment table when values change
    }
    
    function updatePaymentTable() {
        var aprVal = gsap.getProperty($dragAPR[0], "rotation");
        var aprRate = 1 + (aprVal/maxRotationAPR) * 6; // Current APR
        aprRate = Math.round(aprRate * 10) / 10; // Round to 1 decimal place
        
        // Clamp APR rate
        if(aprRate > 7) aprRate = 7;
        else if(aprRate < 1) aprRate = 1;
        
        var monthlyRate = aprRate / 12 / 100; // Convert APR to monthly decimal rate
        var terms = [3, 4, 5, 6]; // Available loan terms
        
        for (var i = 0; i < terms.length; i++) {
            var term = terms[i];
            var numPayments = term * 12; // Convert years to months
            var monthlyPayment;
            
            if (monthlyRate === 0) {
                monthlyPayment = loanAmount / numPayments; // If 0% APR
            } else {
                monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
            }
            
            monthlyPayment = Math.round(monthlyPayment);
            var totalPaid = monthlyPayment * numPayments;
            var totalInterest = totalPaid - loanAmount;
            
            // Update table cells
            $('.payment-' + term).text('$' + monthlyPayment.toLocaleString());
            $('.total-' + term).text('$' + totalPaid.toLocaleString());
            $('.interest-' + term).text('$' + totalInterest.toLocaleString());
        }
    }
    
    console.clear();
    
    // Initialize the payment table on page load
    updatePaymentTable();