import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Ejemplo de datos de usuarios y tareas
data = {
    'Habilidad': [1, 2, 3, 4,5,1, 2, 3, 4,5],  
    'Requisito': [3, 3, 3, 3,3,4,4,4,4,4]
}

# Crear un DataFrame de Pandas con los datos
df = pd.DataFrame(data)

# Calcular la diferencia entre habilidades y requisitos
df['Diferencia'] = df['Habilidad'] - df['Requisito']


# Convertir a clases discretas: aprobado (1) y no aprobado (0)
umbral = -0.9 # Podrías ajustar este umbral según tu lógica

df['Clase'] = df['Diferencia'].apply(lambda x: 1 if x >= umbral else 0)

# Usar 'Clase' en lugar de 'Nivel_Aprobacion' como etiquetas
y = df['Clase']
# Dividir los datos en conjuntos de entrenamiento y prueba
X = df[['Habilidad', 'Requisito']]  # Características


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar un modelo de regresión logística
model = LogisticRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)

# Evaluar el modelo
accuracy = accuracy_score(y_test, predictions)
print(f'Precisión del modelo: {accuracy}')


# Crear datos para ser evaluados
nuevos_datos = {
    'Habilidad': [1, 2, 3,4,5],  # Ejemplo de habilidades
    'Requisito': [3, 3, 3,3,3]   # Ejemplo de requisitos
}

# Crear un DataFrame con los nuevos datos
nuevos_df = pd.DataFrame(nuevos_datos)

# Realizar predicciones en los nuevos datos
nuevas_predicciones = model.predict(nuevos_df)

print("Predicciones para los nuevos datos:")
print(nuevas_predicciones)
