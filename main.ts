namespace SpriteKind {
    export const BalaEnemiga = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (proyectil2, enemigo2) {
    sprites.destroy(proyectil2)
    sprites.destroy(enemigo2, effects.fire, 200)
    kills += 1
    npcs_vivos += 0 - 1
    info.changeScoreBy(1)
    if (npcs_vivos == 0) {
        game.splash("VICTORY ROYALE!", "Kills: " + ("" + kills))
        game.over(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BalaEnemiga, function (jugador, bala_mala) {
    sprites.destroy(bala_mala)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-10)
})
function Abrir_Cofre () {
    ubicacion = personaje.tilemapLocation()
    col = ubicacion.column
    fila = ubicacion.row
    if (ultima_direccion == "arriba" && personaje.tileKindAt(TileDirection.Top, assets.tile`cofre_abajo`)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila - 1), assets.tile`cofre_arriba`)
        cofre_abierto = true
    } else if (ultima_direccion == "abajo" && personaje.tileKindAt(TileDirection.Bottom, assets.tile`cofre_abajo`)) {
        tiles.setTileAt(tiles.getTileLocation(col, fila + 1), assets.tile`cofre_arriba`)
        cofre_abierto = true
    } else if (ultima_direccion == "izquierda" && personaje.tileKindAt(TileDirection.Left, assets.tile`cofre_abajo`)) {
        tiles.setTileAt(tiles.getTileLocation(col - 1, fila), assets.tile`cofre_arriba`)
        cofre_abierto = true
    } else if (ultima_direccion == "derecha" && personaje.tileKindAt(TileDirection.Right, assets.tile`cofre_abajo`)) {
        tiles.setTileAt(tiles.getTileLocation(col + 1, fila), assets.tile`cofre_arriba`)
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
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    personaje,
    assets.animation`animado_abajo`,
    200,
    true
    )
})
function disparar () {
    let proyectil: Sprite;
if (municion_actual > 0) {
        municion_actual += 0 - 1
        proyectil = sprites.createProjectileFromSprite(assets.image`proyectil1`, personaje, 0, 0)
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    personaje,
    assets.animation`animado_der`,
    200,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    personaje,
    assets.animation`animado_izq`,
    200,
    true
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    disparar()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    Abrir_Cofre()
})
function spawnear_npcs () {
    let lista_npcs: Sprite[] = []
    let enemigo: Sprite;
while (index < 5) {
        enemigo = sprites.create(assets.image`enemigo1`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`myTile6`)
        enemigo.follow(personaje, 40)
        lista_npcs.push(enemigo)
        index += 1
    }
    index = 0
    while (index < 5) {
        enemigo = sprites.create(assets.image`enemigo2`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`myTile8`)
        lista_npcs.push(enemigo)
        index += 1
    }
    index = 0
    while (index < 5) {
        enemigo = sprites.create(assets.image`enemigo3`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemigo, assets.tile`myTile8`)
        enemigo.setVelocity(50, 0)
        enemigo.setBounceOnWall(true)
        lista_npcs.push(enemigo)
        index += 1
    }
    npcs_vivos = lista_npcs.length
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    personaje,
    assets.animation`animado_arriba`,
    200,
    true
    )
})
let moviendo = false
let index = 0
let cofre_abierto = false
let fila = 0
let col = 0
let ubicacion: tiles.Location = null
let npcs_vivos = 0
let kills = 0
let personaje: Sprite = null
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
personaje = sprites.create(assets.image`personaje`, SpriteKind.Player)
scene.cameraFollowSprite(personaje)
controller.moveSprite(personaje, 100, 100)
tiles.setCurrentTilemap(tilemap`mapa`)
tiles.placeOnRandomTile(personaje, assets.tile`myTile8`)
info.setScore(0)
info.setLife(vida_jugador)
spawnear_npcs()
game.onUpdate(function () {
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
    if (!(moviendo)) {
        animation.stopAnimation(animation.AnimationTypes.All, personaje)
    }
})
game.onUpdateInterval(1000, function () {
    let vx: number;
let vy: number;
let bala: Sprite;
for (let enemigo22 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (randint(0, 100) < 15) {
            vx = personaje.x - enemigo22.x
            bala = sprites.createProjectileFromSprite(assets.image`proyectil1`, enemigo22, vx, vy)
            bala.setKind(SpriteKind.BalaEnemiga)
            bala.lifespan = 3000
        }
    }
})
