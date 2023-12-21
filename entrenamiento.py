from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np




usuarios = [
    {'Usuario': '1', 'PHP': 4, 'SO': 4, 'Grafico': 4},
    {'Usuario': '2', 'PHP': 2, 'SO': 3, 'Grafico': 2},
]

tarea = {'PHP': 3, 'SO': 3, 'Grafico': 3}


""" # Convertir los datos a un DataFrame (pandas)
df_usuarios = pd.DataFrame(usuarios)

# Características (X) y Objetivo (y)
X = df_usuarios[['PHP', 'SO', 'Grafico']]
y = df_usuarios['Usuario']

# Inicializar el modelo de regresión lineal
modelo = LinearRegression()

# Entrenar el modelo
modelo.fit(X, y)


prediccion = modelo.predict([list(tarea.values())])
usuario_optimo = df_usuarios.loc[df_usuarios.index[prediccion.argmax()]]['Usuario']

print(f"El usuario óptimo para la tarea es: {usuario_optimo}") """

# Convertir los datos a matrices numpy para facilitar los cálculos
usuarios_habilidades = np.array([[u['PHP'], u['SO'], u['Grafico']] for u in usuarios])
tarea_habilidades = np.array([tarea['PHP'], tarea['SO'], tarea['Grafico']])

usuarios_cumplen_requisitos = []
for i, usuario in enumerate(usuarios_habilidades):
    if all(usuario >= tarea_habilidades):
        usuarios_cumplen_requisitos.append(usuarios[i])

print("Usuarios que cumplen los requisitos de la tarea:")
for usuario in usuarios_cumplen_requisitos:
    print(usuario['Usuario'])


# Calcular la distancia euclidiana entre la tarea y las habilidades de cada usuario
distancias = np.linalg.norm(usuarios_cumplen_requisitos - tarea_habilidades, axis=1)

# Encontrar el usuario más cercano a la tarea
usuario_optimo = usuarios[np.argmin(distancias)]

print(f"El usuario óptimo para la tarea es: {usuario_optimo['Usuario']}")