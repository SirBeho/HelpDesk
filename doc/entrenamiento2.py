def calcular_idoneidad(usuario, requisitos):
    dif_php = max(0, usuario['Habilidad_PHP'] - requisitos['Requisito_PHP'])
    dif_so = max(0, usuario['Habilidad_SO'] - requisitos['Requisito_SO'])
    dif_grafico = max(0, usuario['Habilidad_Grafico'] - requisitos['Requisito_Grafico'])
    
    idoneidad_php = 1 - (dif_php / requisitos['Requisito_PHP']) if requisitos['Requisito_PHP'] != 0 else 1
    idoneidad_so = 1 - (dif_so / requisitos['Requisito_SO']) if requisitos['Requisito_SO'] != 0 else 1
    idoneidad_grafico = 1 - (dif_grafico / requisitos['Requisito_Grafico']) if requisitos['Requisito_Grafico'] != 0 else 1
    
    # Calcula un promedio de idoneidad entre las habilidades requeridas
    idoneidad = (idoneidad_php + idoneidad_so + idoneidad_grafico) / 3
    
    return idoneidad


usuarios = [
    {'Usuario': 'Usuario1', 'Habilidad_PHP': 4, 'Habilidad_SO': 3, 'Habilidad_Grafico': 5},
    {'Usuario': 'Usuario2', 'Habilidad_PHP': 2, 'Habilidad_SO': 5, 'Habilidad_Grafico': 2},
    {'Usuario': 'Usuario3', 'Habilidad_PHP': 3, 'Habilidad_SO': 4, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario4', 'Habilidad_PHP': 5, 'Habilidad_SO': 2, 'Habilidad_Grafico': 4},
    {'Usuario': 'Usuario5', 'Habilidad_PHP': 3, 'Habilidad_SO': 3, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario6', 'Habilidad_PHP': 4, 'Habilidad_SO': 4, 'Habilidad_Grafico': 4},
    {'Usuario': 'Usuario7', 'Habilidad_PHP': 2, 'Habilidad_SO': 3, 'Habilidad_Grafico': 2},
    {'Usuario': 'Usuario8', 'Habilidad_PHP': 3, 'Habilidad_SO': 2, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario9', 'Habilidad_PHP': 5, 'Habilidad_SO': 5, 'Habilidad_Grafico': 4},
    {'Usuario': 'Usuario10', 'Habilidad_PHP': 3, 'Habilidad_SO': 4, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario11', 'Habilidad_PHP': 4, 'Habilidad_SO': 3, 'Habilidad_Grafico': 2},
    {'Usuario': 'Usuario12', 'Habilidad_PHP': 2, 'Habilidad_SO': 2, 'Habilidad_Grafico': 4},
    {'Usuario': 'Usuario13', 'Habilidad_PHP': 3, 'Habilidad_SO': 3, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario14', 'Habilidad_PHP': 5, 'Habilidad_SO': 4, 'Habilidad_Grafico': 5},
    {'Usuario': 'Usuario15', 'Habilidad_PHP': 3, 'Habilidad_SO': 2, 'Habilidad_Grafico': 2},
    {'Usuario': 'Usuario16', 'Habilidad_PHP': 4, 'Habilidad_SO': 5, 'Habilidad_Grafico': 3},
    {'Usuario': 'Usuario17', 'Habilidad_PHP': 2, 'Habilidad_SO': 3, 'Habilidad_Grafico': 4},
    {'Usuario': 'Usuario18', 'Habilidad_PHP': 3, 'Habilidad_SO': 4, 'Habilidad_Grafico': 2},
    {'Usuario': 'Usuario19', 'Habilidad_PHP': 5, 'Habilidad_SO': 2, 'Habilidad_Grafico': 5},
    {'Usuario': 'Usuario20', 'Habilidad_PHP': 3, 'Habilidad_SO': 3, 'Habilidad_Grafico': 3},
]

requisitos_tarea = {'Requisito_PHP': 3, 'Requisito_SO': 4, 'Requisito_Grafico': 4}

for usuario in usuarios:
    usuario['Idoneidad'] =round(1-calcular_idoneidad(usuario, requisitos_tarea),4)


# Ordenar usuarios por su idoneidad de mayor a menor
usuarios_ordenados = sorted(usuarios, key=lambda x: x['Idoneidad'], reverse=True)

# Imprimir usuarios ordenados por idoneidad
for usuario in usuarios_ordenados:
    print(f"Usuario: {usuario['Usuario']}, Idoneidad: {usuario['Idoneidad']}")
