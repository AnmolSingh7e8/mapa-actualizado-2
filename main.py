@namespace
class SpriteKind:
    BalaEnemiga = SpriteKind.create()

def on_on_overlap(proyectil2, enemigo2):
    global kills, npcs_vivos
    sprites.destroy(proyectil2)
    sprites.destroy(enemigo2, effects.fire, 200)
    kills += 1
    npcs_vivos += 0 - 1
    info.change_score_by(1)
    if npcs_vivos == 0:
        game.splash("VICTORY ROYALE!", "Kills: " + ("" + str(kills)))
        game.over(True)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_up_pressed():
    animation.run_image_animation(personaje,
        assets.animation("""
            animado_arriba
            """),
        200,
        True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap2(jugador, bala_mala):
    sprites.destroy(bala_mala)
    scene.camera_shake(4, 500)
    info.change_life_by(-10)
sprites.on_overlap(SpriteKind.player, SpriteKind.BalaEnemiga, on_on_overlap2)

def on_b_pressed():
    Abrir_Cofre()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def Abrir_Cofre():
    global ubicacion, col, fila, cofre_abierto, municion_actual
    ubicacion = personaje.tilemap_location()
    col = ubicacion.column
    fila = ubicacion.row
    if ultima_direccion == "arriba" and personaje.tile_kind_at(TileDirection.TOP, assets.tile("""
        cofre_abajo
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col, fila - 1),
            assets.tile("""
                cofre_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "abajo" and personaje.tile_kind_at(TileDirection.BOTTOM,
        assets.tile("""
            cofre_abajo
            """)):
        tiles.set_tile_at(tiles.get_tile_location(col, fila + 1),
            assets.tile("""
                cofre_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "izquierda" and personaje.tile_kind_at(TileDirection.LEFT, assets.tile("""
        cofre_abajo
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col - 1, fila),
            assets.tile("""
                cofre_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "derecha" and personaje.tile_kind_at(TileDirection.RIGHT,
        assets.tile("""
            cofre_abajo
            """)):
        tiles.set_tile_at(tiles.get_tile_location(col + 1, fila),
            assets.tile("""
                cofre_arriba
                """))
        cofre_abierto = True
    if ultima_direccion == "arriba" and personaje.tile_kind_at(TileDirection.TOP, assets.tile("""
        myTile23
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col, fila - 1),
            assets.tile("""
                cofre_abierto_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "abajo" and personaje.tile_kind_at(TileDirection.BOTTOM, assets.tile("""
        myTile23
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col, fila + 1),
            assets.tile("""
                cofre_abierto_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "izquierda" and personaje.tile_kind_at(TileDirection.LEFT, assets.tile("""
        myTile23
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col - 1, fila),
            assets.tile("""
                cofre_abierto_arriba
                """))
        cofre_abierto = True
    elif ultima_direccion == "derecha" and personaje.tile_kind_at(TileDirection.RIGHT, assets.tile("""
        myTile23
        """)):
        tiles.set_tile_at(tiles.get_tile_location(col + 1, fila),
            assets.tile("""
                cofre_abierto_arriba
                """))
        cofre_abierto = True
    if cofre_abierto:
        municion_actual += 30
        game.splash("Cofre abierto!", "+30 municion")
        cofre_abierto = False
    else:
        game.splash("No hay cofre")
def disparar():
    global municion_actual
    if municion_actual > 0:
        municion_actual += 0 - 1
        proyectil = sprites.create_projectile_from_sprite(assets.image("""
            proyectil1
            """), personaje, 0, 0)
        if ultima_direccion == "arriba":
            proyectil.set_velocity(0, -150)
        elif ultima_direccion == "abajo":
            proyectil.set_velocity(0, 150)
        elif ultima_direccion == "izquierda":
            proyectil.set_velocity(-150, 0)
        elif ultima_direccion == "derecha":
            proyectil.set_velocity(150, 0)
        proyectil.set_flag(SpriteFlag.AUTO_DESTROY, True)
        proyectil.lifespan = 2000

def on_a_pressed():
    disparar()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    animation.run_image_animation(personaje,
        assets.animation("""
            animado_izq
            """),
        200,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def spawnear_npcs():
    global index, npcs_vivos
    lista_npcs: List[Sprite] = []
    while index < 5:
        enemigo = sprites.create(assets.image("""
            enemigo1
            """), SpriteKind.enemy)
        tiles.place_on_random_tile(enemigo, assets.tile("""
            myTile6
            """))
        enemigo.follow(personaje, 40)
        lista_npcs.append(enemigo)
        index += 1
    index = 0
    while index < 5:
        enemigo = sprites.create(assets.image("""
            enemigo2
            """), SpriteKind.enemy)
        tiles.place_on_random_tile(enemigo, assets.tile("""
            myTile8
            """))
        lista_npcs.append(enemigo)
        index += 1
    index = 0
    while index < 5:
        enemigo = sprites.create(assets.image("""
            enemigo3
            """), SpriteKind.enemy)
        tiles.place_on_random_tile(enemigo, assets.tile("""
            myTile8
            """))
        enemigo.set_velocity(50, 0)
        enemigo.set_bounce_on_wall(True)
        lista_npcs.append(enemigo)
        index += 1
    npcs_vivos = len(lista_npcs)

def on_right_pressed():
    animation.run_image_animation(personaje,
        assets.animation("""
            animado_der
            """),
        200,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def Abrir_Cofre3():
    global ubicacion, col, fila, municion_actual, cofre_abierto
    ubicacion = personaje.tilemap_location()
    col = ubicacion.column
    fila = ubicacion.row
    if cofre_abierto:
        municion_actual += 30
        game.splash("Cofre abierto!", "+30 municion")
        cofre_abierto = False
    else:
        game.splash("No hay cofre")

def on_down_pressed():
    animation.run_image_animation(personaje,
        assets.animation("""
            animado_abajo
            """),
        200,
        True)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_a_pressed_bus():
    global en_bus
    if en_bus:
        personaje.set_position(autobus.x, autobus.y)
        controller.move_sprite(personaje, 100, 100)
        scene.camera_follow_sprite(personaje)
        sprites.destroy(autobus, effects.trail, 500)
        en_bus = False

controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed_bus)

def on_update_bus():
    global en_bus
    if en_bus:
        if autobus.x > scene.screen_width() * 16 + 40:
            personaje.set_position(autobus.x - 20, autobus.y)
            controller.move_sprite(personaje, 100, 100)
            scene.camera_follow_sprite(personaje)
            sprites.destroy(autobus)
            en_bus = False

game.on_update(on_update_bus)




moviendo = False
index = 0
cofre_abierto = False
fila = 0
col = 0
ubicacion: tiles.Location = None
npcs_vivos = 0
kills = 0
personaje: Sprite = None
ultima_direccion = ""
municion_actual = 0
partida_activa = False
arma_actual = 0
vida_jugador = 100
municion_actual = 150
radio_tormenta = 200
centro_tormenta_x = 160
centro_tormenta_y = 120
tiempo_siguiente_cierre = 30
autobus: Sprite = None
en_bus = True
ultima_direccion = "derecha"
personaje = sprites.create(assets.image("""
    personaje
    """), SpriteKind.player)
scene.camera_follow_sprite(personaje)
controller.move_sprite(personaje, 100, 100)
tiles.set_current_tilemap(tilemap("""
    mapa
    """))
tiles.place_on_random_tile(personaje, assets.tile("""
    myTile8
    """))
autobus = sprites.create(assets.image("""autobus"""), SpriteKind.player)

controller.move_sprite(personaje, 0, 0)
autobus.set_position(-40, 40)
autobus.set_velocity(60, 0)
scene.camera_follow_sprite(autobus)

info.set_score(0)
info.set_life(vida_jugador)
spawnear_npcs()

def on_on_update():
    global moviendo, ultima_direccion
    moviendo = controller.down.is_pressed() or (controller.left.is_pressed() or (controller.up.is_pressed() or controller.right.is_pressed()))
    if controller.up.is_pressed():
        ultima_direccion = "arriba"
    elif controller.down.is_pressed():
        ultima_direccion = "abajo"
    elif controller.left.is_pressed():
        ultima_direccion = "izquierda"
    elif controller.right.is_pressed():
        ultima_direccion = "derecha"
    if not (moviendo):
        animation.stop_animation(animation.AnimationTypes.ALL, personaje)
game.on_update(on_on_update)

def on_update_interval():
    for enemigo22 in sprites.all_of_kind(SpriteKind.enemy):
        if randint(0, 100) < 15:
            vx = personaje.x - enemigo22.x
            vy = 0
            bala = sprites.create_projectile_from_sprite(assets.image("""
                proyectil1
                """), enemigo22, vx, vy)
            bala.set_kind(SpriteKind.BalaEnemiga)
            bala.lifespan = 3000
game.on_update_interval(1000, on_update_interval)
