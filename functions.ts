// Functions

/**
 * Setting the car mode.
 */
function settings() {
    while (!blockSettings) {
        if (mode < 0) {
            mode = 0
        } else if (mode > 2) {
            mode = 2
        }
        switch (mode) {
            case 0:
                basic.showString("U", 0);
                break;
            case 1:
                basic.showString("K", 0);
                break;
            case 2:
                basic.showString("T", 0);
                break;
        }
        basic.pause(50)
    }
}

/**
 * Flashes any letter on the screen.
 * @param letter Letter to display, eg: L
 */
function flash(letter: string) {
    for (let i = 0; i < 3; i++) {
        basic.clearScreen()
        basic.pause(250)
        basic.showString(letter, 0);
        basic.pause(250)
    }
}

/**
 * Looks for the ball, if 2 of 15 camera images contain ball return true else return false
 * (block the program for 480 ms)
 */
function search() {
    let xBalon = 0
    for (let i = 0; i < 15; i++) {
        PlanetX_AILens.cameraImage()
        if (PlanetX_AILens.checkBall()) {
            xBalon++
        }
    }
    if (xBalon >= 2) {
        return true
    } else {
        return false
    }
}

/**
 * Turn Round the car with servo angle
 * @param servoAngle Angle of the camera servo , eg: 150
 */
function turnRound(uhelServo: number) {
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, uhelServo)
    TPBot.setWheels(30, -50)
    for (let i = 0; i < 15; i++) {
        TPBot.stopCar()
        if (search()) {
            if (search()) {
                approach()
            }
        }
        TPBot.setWheels(30, -50)
        basic.pause(200)
    }
}

/**
 * The car drives forward, and every time it hits an obstacle (line) it turns.
 */
function riding() {
    let count = 0
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 80);
    while (!search()) {
        TPBot.setWheels(40, 40)
        for (let i = 0; i < 15; i++) {
            if ((TPBot.sonarReturn(TPBot.SonarUnit.Centimeters, 600) < 22) || (TPBot.trackLine(TPBot.TrackingState.L_R_line))) {
                if (count < 2) {
                    TPBot.setWheels(-40, -40)
                    basic.pause(750)
                    count++
                    for (let i = 0; i < 5; i++) {
                        TPBot.setWheels(-40, 40)
                        basic.pause(200)
                        TPBot.stopCar()
                        if (search()) {
                            if (search()) {
                                approach()
                            }
                        }
                    }
                } else {
                    TPBot.setWheels(-40, -40)
                    basic.pause(750)
                    count++
                    if (count == 4) {
                        count = 0
                    }
                    for (let i = 0; i < 5; i++) {
                        TPBot.setWheels(40, -40)
                        basic.pause(200)
                        TPBot.stopCar()
                        if (search()) {
                            if (search()) {
                                approach()
                            }
                        }
                    }
                }

            }
            basic.pause(20)
        }
        TPBot.stopCar()
    }
    if (search()) {
        approach()
    }
}


let side = 0   // 0-1 = right 2+ = left
/**
 * Slowly drives forward and catches the ball.
 */
function approach() {
    while (search()) {
        TPBot.setWheels(25, 25)
        basic.pause(150)
        TPBot.stopCar()
    }
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 20)
    if (search()) {
        side = 0
        grab()
    }
    TPBot.setWheels(-30, -30)
    basic.pause(400)
    TPBot.stopCar()
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 80)
    if (side >= 1) {
        for (let i = 0; i < 5; i++) {
            TPBot.setWheels(-100, 32)
            basic.pause(75)
            TPBot.stopCar()
            if (search()) {
                TPBot.setWheels(20, 20)
                basic.pause(150)
                TPBot.stopCar()
                approach()
            }
        }
        TPBot.setWheels(30, -45)
        basic.pause(175)
        side--
        for (let i = 0; i < 5; i++) {
            TPBot.setWheels(30, -100)
            basic.pause(75)
            TPBot.stopCar()
            if (search()) {
                TPBot.setWheels(20, 20)
                basic.pause(150)
                TPBot.stopCar()
                approach()
            }
        }
        TPBot.setWheels(-45, 30)
        basic.pause(200)
        side = 0
        approach()
    } else {
        for (let i = 0; i < 5; i++) {
            TPBot.setWheels(30, -100)
            basic.pause(75)
            TPBot.stopCar()
            if (search()) {
                TPBot.setWheels(20, 20)
                basic.pause(150)
                TPBot.stopCar()
                approach()
            }
        }
        TPBot.setWheels(-45, 30)
        basic.pause(175)
        side++
        for (let i = 0; i < 5; i++) {
            TPBot.setWheels(-100, 32)
            basic.pause(75)
            TPBot.stopCar()
            if (search()) {
                TPBot.setWheels(20, 20)
                basic.pause(150)
                TPBot.stopCar()
                approach()
            }
        }
    }
    TPBot.setWheels(30, -45)
    basic.pause(200)
    side = 0
    approach()
}

/**
 * Grab the ball
 */
function grab() {
    TPBot.setWheels(20, 20)
    basic.pause(200)
    TPBot.stopCar()
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S2, 150)
    TPBot.setServo(TPBot.ServoTypeList.S360, TPBot.ServoList.S1, 20)
    if (search()) {
        if (search()) {
            TPBot.setWheels(40, -40)
            while (true) {
                music.playMelody("A D F A B - E B ", 500)
                //celebration
            }

        }
    }
}

