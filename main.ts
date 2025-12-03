namespace SpriteKind {
    export const BalaEnemiga = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(proyectil2: Sprite, enemigo2: Sprite) {
    
    sprites.destroy(proyectil2)
    sprites.destroy(enemigo2, effects.fire, 200)
    kills += 1
    npcs_vivos += 0 - 1
    info.changeScoreBy(1)
    if (npcs_vivos == 0) {
        game.splash("VICTORY ROYALE!", "Kills: " + ("" + ("" + kills)))
        game.over(true)
    }
    
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_arriba
            `, 200, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BalaEnemiga, function on_on_overlap2(jugador: Sprite, bala_mala: Sprite) {
    sprites.destroy(bala_mala)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-10)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    Abrir_Cofre()
})
function Abrir_Cofre() {
    
    ubicacion = personaje.tilemapLocation()
    col = ubicacion.column
    fila = ubicacion.row
    if (ultima_direccion == "arriba" && personaje.tileKindAt(TileDirection.Top, assets.tile`
        cofre_abajo
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila - 1), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "abajo" && personaje.tileKindAt(TileDirection.Bottom, assets.tile`
            cofre_abajo
            `)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila + 1), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "izquierda" && personaje.tileKindAt(TileDirection.Left, assets.tile`
        cofre_abajo
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col - 1, fila), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "derecha" && personaje.tileKindAt(TileDirection.Right, assets.tile`
            cofre_abajo
            `)) {
        tiles.setTileAt(tiles.getTileLocation(col + 1, fila), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    }
    
    if (ultima_direccion == "arriba" && personaje.tileKindAt(TileDirection.Top, assets.tile`
        myTile23
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila - 1), assets.tile`
                cofre_abierto_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "abajo" && personaje.tileKindAt(TileDirection.Bottom, assets.tile`
        myTile23
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila + 1), assets.tile`
                cofre_abierto_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "izquierda" && personaje.tileKindAt(TileDirection.Left, assets.tile`
        myTile23
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col - 1, fila), assets.tile`
                cofre_abierto_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "derecha" && personaje.tileKindAt(TileDirection.Right, assets.tile`
        myTile23
        `)) {
        tiles.setTileAt(tiles.getTileLocation(col + 1, fila), assets.tile`
                cofre_abierto_arriba
                `)
        cofre_abierto = true
    }
    
    if (cofre_abierto) {
        municion_actual += 30
        game.splash("Cofre abierto!", "+30 municion")
        cofre_abierto = false
    } else {
        game.splash("No hay cofre")
    }
    
}

function disparar() {
    let proyectil: Sprite;
    
    if (municion_actual > 0) {
        municion_actual += 0 - 1
        proyectil = sprites.createProjectileFromSprite(assets.image`
            proyectil1
            `, personaje, 0, 0)
        if (ultima_direccion == "arriba") {
            proyectil.setVelocity(0, -150)
        } else if (ultima_direccion == "abajo") {
            proyectil.setVelocity(0, 150)
        } else if (ultima_direccion == "izquierda") {
            proyectil.setVelocity(-150, 0)
        } else if (ultima_direccion == "derecha") {
            proyectil.setVelocity(150, 0)
        }
        
        proyectil.setFlag(SpriteFlag.AutoDestroy, true)
        proyectil.lifespan = 2000
    }
    
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    disparar()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_izq
            `, 200, true)
})
function spawnear_npcs() {
    let enemigo: Sprite;
    
    let lista_npcs : Sprite[] = []
    while (index < 5) {
        enemigo = sprites.create(assets.image`
            enemigo1
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`
            myTile6
            `)
        enemigo.follow(personaje, 40)
        lista_npcs.push(enemigo)
        index += 1
    }
    index = 0
    while (index < 5) {
        enemigo = sprites.create(assets.image`
            enemigo2
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`
            myTile8
            `)
        lista_npcs.push(enemigo)
        index += 1
    }
    index = 0
    while (index < 5) {
        enemigo = sprites.create(assets.image`
            enemigo3
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`
            myTile8
            `)
        enemigo.setVelocity(50, 0)
        enemigo.setBounceOnWall(true)
        lista_npcs.push(enemigo)
        index += 1
    }
    npcs_vivos = lista_npcs.length
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_der
            `, 200, true)
})
function Abrir_Cofre3() {
    
    ubicacion = personaje.tilemapLocation()
    col = ubicacion.column
    fila = ubicacion.row
    if (cofre_abierto) {
        municion_actual += 30
        game.splash("Cofre abierto!", "+30 municion")
        cofre_abierto = false
    } else {
        game.splash("No hay cofre")
    }
    
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_abajo
            `, 200, true)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed_bus() {
    
    if (en_bus) {
        personaje.setPosition(autobus.x, autobus.y)
        controller.moveSprite(personaje, 100, 100)
        scene.cameraFollowSprite(personaje)
        sprites.destroy(autobus, effects.trail, 500)
        en_bus = false
    }
    
})
game.onUpdate(function on_update_bus() {
    
    if (en_bus) {
        if (autobus.x < -60 || autobus.x > scene.screenWidth() * 16 + 60 || autobus.y < -60 || autobus.y > scene.screenHeight() * 16 + 60) {
            personaje.setPosition(autobus.x, autobus.y)
            controller.moveSprite(personaje, 100, 100)
            scene.cameraFollowSprite(personaje)
            sprites.destroy(autobus)
            en_bus = false
        }
        
    }
    
})
function iniciar_ruta_autobus() {
    let y: number;
    let x: number;
    
    en_bus = true
    let ruta = randint(1, 4)
    if (ruta == 1) {
        y = randint(20, scene.screenHeight() * 16 - 20)
        autobus.setPosition(-40, y)
        autobus.setVelocity(60, 0)
    } else if (ruta == 2) {
        y = randint(20, scene.screenHeight() * 16 - 20)
        autobus.setPosition(scene.screenWidth() * 16 + 40, y)
        autobus.setVelocity(-60, 0)
    } else if (ruta == 3) {
        x = randint(20, scene.screenWidth() * 16 - 20)
        autobus.setPosition(x, -40)
        autobus.setVelocity(0, 60)
    } else if (ruta == 4) {
        x = randint(20, scene.screenWidth() * 16 - 20)
        autobus.setPosition(x, scene.screenHeight() * 16 + 40)
        autobus.setVelocity(0, -60)
    }
    
    scene.cameraFollowSprite(autobus)
}

let moviendo = false
let index = 0
let cofre_abierto = false
let fila = 0
let col = 0
let ubicacion : tiles.Location = null
let npcs_vivos = 0
let kills = 0
let personaje : Sprite = null
let ultima_direccion = ""
let municion_actual = 0
let partida_activa = false
let arma_actual = 0
let vida_jugador = 100
municion_actual = 150
let radio_tormenta = 200
let centro_tormenta_x = 160
let centro_tormenta_y = 120
let tiempo_siguiente_cierre = 30
let en_bus = true
let autobus : Sprite = null
ultima_direccion = "derecha"
personaje = sprites.create(assets.image`
    personaje
    `, SpriteKind.Player)
scene.cameraFollowSprite(personaje)
controller.moveSprite(personaje, 100, 100)
tiles.setCurrentTilemap(tilemap`
    mapa
    `)
tiles.placeOnRandomTile(personaje, assets.tile`
    myTile8
    `)
info.setScore(0)
info.setLife(vida_jugador)
spawnear_npcs()
autobus = sprites.create(assets.image`
    autobus
`, SpriteKind.Player)
controller.moveSprite(personaje, 0, 0)
autobus.setPosition(-40, 40)
autobus.setVelocity(60, 0)
scene.cameraFollowSprite(autobus)
game.onUpdate(function on_on_update() {
    
    moviendo = controller.down.isPressed() || (controller.left.isPressed() || (controller.up.isPressed() || controller.right.isPressed()))
    if (controller.up.isPressed()) {
        ultima_direccion = "arriba"
    } else if (controller.down.isPressed()) {
        ultima_direccion = "abajo"
    } else if (controller.left.isPressed()) {
        ultima_direccion = "izquierda"
    } else if (controller.right.isPressed()) {
        ultima_direccion = "derecha"
    }
    
    if (!moviendo) {
        animation.stopAnimation(animation.AnimationTypes.All, personaje)
    }
    
})
game.onUpdateInterval(1000, function on_update_interval() {
    let vx: number;
    let vy: number;
    let bala: Sprite;
    for (let enemigo22 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (randint(0, 100) < 15) {
            vx = personaje.x - enemigo22.x
            vy = 0
            bala = sprites.createProjectileFromSprite(assets.image`
                proyectil1
                `, enemigo22, vx, vy)
            bala.setKind(SpriteKind.BalaEnemiga)
            bala.lifespan = 3000
        }
        
    }
})
iniciar_ruta_autobus()
