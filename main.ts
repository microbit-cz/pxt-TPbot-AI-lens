//declaring variables
let mode = 0
let blockSettings = false

//inputs
input.onButtonPressed(Button.A, function () {
    if (!blockSettings && mode > 0) {
        mode--
        control.inBackground(function () {
            music.playTone(Note.CSharp, music.beat(BeatFraction.Eighth))
        })
    }

})

input.onButtonPressed(Button.B, function () {
    if (!blockSettings && mode < 2) {
        mode++
        control.inBackground(function () {
            music.playTone(Note.B5, music.beat(BeatFraction.Eighth))
        })
    }

})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (!blockSettings) {
        blockSettings = true
        switch (mode) {
            case 0:
                control.inBackground(function () {
                    music.playMelody("C D E F G A A A ", 500)
                })
                flash("U")
                body()
                break;
            case 1:
                control.inBackground(function () {
                    music.playMelody("C D E F G A A A ", 500)
                })
                flash("K")
                body()
                break;
            case 2:
                control.inBackground(function () {
                    music.playMelody("C D E F G A A A ", 500)
                })
                flash("T")
                body()
                break;
        }
    }
})

input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    TPBot.stopCar()
    blockSettings = false
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 120)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
    switch (mode) {
        case 0:
            control.inBackground(function () {
                music.playMelody("A A A G F E D C ", 500)
            })
            flash("U")
            control.reset()
            break;
        case 1:
            control.inBackground(function () {
                music.playMelody("A A A G F E D C ", 500)
            })
            flash("K")
            control.reset()
            break;
        case 2:
            control.inBackground(function () {
                music.playMelody("A A A G F E D C ", 500)
            })
            flash("T")
            control.reset()
            break;
    }
})

//after start
TPBot.headlightRGB(250, 0, 0)
TPBot.stopCar()
settings()

/**
 * Body of the program
 */
function body() {
    switch (mode) {
        case 0:
            //mode "Uklízeč" looks for the ball and catch it
            TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 240)
            PlanetX_AILens.switchfunc(PlanetX_AILens.FuncList.Ball)
            //turnRound(40)
            //turnRound(95)
            //turnRound(150)
            riding()
            break;
        case 1:
            //ready for more modes
            //idea for mode - "Kartičkář" looks for cards on the ground and then completes the tasks on them
            break;
        case 2:
            //ready for more modes
            //idea for mode - "Tanečník" dance to the rhythm of clapping
            break;
    }
}

