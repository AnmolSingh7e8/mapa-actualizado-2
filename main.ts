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
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    Abrir_Cofre()
})
function Abrir_Cofre() {
    
    ubicacion = personaje.tilemapLocation()
    columna = ubicacion.column
    fila = ubicacion.row
    if (ultima_direccion == "arriba" && personaje.tileKindAt(TileDirection.Top, assets.tile`
        cofre_abajo
        `)) {
        tiles.setTileAt(tiles.getTileLocation(columna, fila - 1), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "abajo" && personaje.tileKindAt(TileDirection.Bottom, assets.tile`
            cofre_abajo
            `)) {
        tiles.setTileAt(tiles.getTileLocation(columna, fila + 1), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "izquierda" && personaje.tileKindAt(TileDirection.Left, assets.tile`
        cofre_abajo
        `)) {
        tiles.setTileAt(tiles.getTileLocation(columna - 1, fila), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    } else if (ultima_direccion == "derecha" && personaje.tileKindAt(TileDirection.Right, assets.tile`
            cofre_abajo
            `)) {
        tiles.setTileAt(tiles.getTileLocation(columna + 1, fila), assets.tile`
                cofre_arriba
                `)
        cofre_abierto = true
    }
    
    if (cofre_abierto) {
        municion_actual += municion_actual + 15
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
    for (let index = 0; index < 20; index++) {
        enemigo = sprites.create(assets.image`
            enemigo1
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`
            transparency16
            `)
        lista_npcs.push(enemigo)
        enemigo.follow(personaje, 30)
    }
    npcs_vivos = lista_npcs.length
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_der
            `, 200, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(personaje, assets.animation`
            animado_abajo
            `, 200, true)
})
let moviendo = false
let cofre_abierto = false
let fila = 0
let columna = 0
let ubicacion : tiles.Location = null
let npcs_vivos = 0
let kills = 0
let personaje : Sprite = null
let ultima_direccion = ""
let municion_actual = 0
let arma_actual = 0
let partida_activa = false
let vida_jugador = 100
municion_actual = 150
let radio_tormenta = 200
let centro_tormenta_x = 160
let centro_tormenta_y = 120
let tiempo_siguiente_cierre = 30
let en_bus = true
ultima_direccion = "derecha"
tiles.setCurrentTilemap(tilemap`
    mapa
    `)
personaje = sprites.create(assets.image`
    personaje
    `, SpriteKind.Player)
let autobus = sprites.create(assets.image`
    autobus
    `, SpriteKind.Player)
scene.cameraFollowSprite(personaje)
controller.moveSprite(personaje, 100, 100)
tiles.placeOnRandomTile(personaje, assets.tile`
    myTile6
    `)
info.setScore(0)
info.setLife(vida_jugador)
spawnear_npcs()
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
