from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pandas as pd

# Carga de datos (reemplaza esto con tus datos)
# Supongamos que tienes un archivo CSV con los datos históricos
data = pd.read_excel('modelo_entrenado.xlsx')
puntaje_maximo = 5

data['Dif_PHP'] = data['Habilidad_PHP'] - data['Requisito_PHP'] 
data['Dif_SO'] = data['Habilidad_SO']- data['Requisito_SO']
data['Dif_Grafico'] = data['Habilidad_Grafico'] - data['Requisito_Grafico']


# cantidad de habilidades - requisitos que puedan ser negativas
cantidad_Dif = 1 
data['Cantidad_Dif_Negativas'] = (data[['Dif_PHP', 'Dif_SO', 'Dif_Grafico']] < 0).sum(axis=1)

# umbral de diferencia para que sea considerado apto
umbal_diferencia = -1 
data['Umbral'] = ((data['Dif_PHP'] >= umbal_diferencia) & (data['Dif_SO'] >= umbal_diferencia) & (data['Dif_Grafico'] >= umbal_diferencia)).astype(int)

# calidad esperada minima para que sea considerado apto tomado de data['Prom_Resultado_Anterior']
resultado_anterior_min = 3 


trabajo_minimo = 1
data['Carga'] = data['Horas_Asignadas'] - data['Horas_Asignadas'].mean()
data['Completada'] = data['Horas_Completada'] - data['Horas_Completada'].mean()
data['Trabajo'] = data['Carga'] + (data['Completada']-(data['Completada']*(data['Urgencia']/puntaje_maximo)))


criterios = (data['Cantidad_Dif_Negativas'] <= cantidad_Dif) & \
            (data['Umbral'] == 1) & \
            (data['Prom_Resultado_Anterior'] >= resultado_anterior_min) & \
            (data['Trabajo'] < trabajo_minimo) 

# Crea una nueva columna que indique si la asignación es óptima o no
data['Asignacion_Optima'] = criterios


# División de datos en características (X) y objetivo (y)
X = data[['Cantidad_Dif_Negativas','Umbral','Prom_Resultado_Anterior','Trabajo']]  # Características
y = data['Asignacion_Optima']  # Objetivo

# División de datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)

# Creación y entrenamiento del modelo de regresión logística
model = LogisticRegression()
model.fit(X_train, y_train)

# Predicción en el conjunto de prueba
predictions = model.predict(X_test)

# Evaluación del modelo
accuracy = accuracy_score(y_test, predictions)
print(f"Precisión del modelo: {accuracy}")





	

requisitos_tarea = {'Requisito_PHP': 3, 'Requisito_SO': 4, 'Requisito_Grafico': 5, 'Urgencia': 3}

# Supongamos que tienes una lista de usuarios con sus habilidades
usuarios = [
    {'name': 'Usuario1', 'Habilidad_PHP': 4, 'Habilidad_SO': 3, 'Habilidad_Grafico': 5,'Prom_Resultado_Anterior': 3,'Horas_Asignadas': 3,'Horas_Completada': 3},
    {'name': 'Usuario2', 'Habilidad_PHP': 2, 'Habilidad_SO': 5, 'Habilidad_Grafico': 2,'Prom_Resultado_Anterior': 4,'Horas_Asignadas': 3,'Horas_Completada': 3},
]


datos_usuarios = []
for usuario in usuarios:
    dif_php = usuario['Habilidad_PHP'] - requisitos_tarea['Requisito_PHP']
    dif_so = usuario['Habilidad_SO'] - requisitos_tarea['Requisito_SO']
    dif_grafico = usuario['Habilidad_Grafico'] - requisitos_tarea['Requisito_Grafico']

    cantidad_dif_negativas = (dif_php < 0) + (dif_so < 0) + (dif_grafico < 0)

    umbal_diferencia = -1 
    if dif_php >= umbal_diferencia and dif_so >= umbal_diferencia and dif_grafico >= umbal_diferencia:
        umbral = 1  
    else:
        umbral = 0  

    media_horas_asignadas = sum(usr['Horas_Asignadas'] for usr in usuarios) / len(usuarios)
    media_horas_completadas = sum(usr['Horas_Completada'] for usr in usuarios) / len(usuarios)

    carga = usuario['Horas_Asignadas'] - media_horas_asignadas
    completada = usuario['Horas_Completada'] - media_horas_completadas

    trabajo = carga + (completada - (completada * (requisitos_tarea['Urgencia'] / puntaje_maximo)))

    datos_usuarios.append([cantidad_dif_negativas, umbral, usuario['Prom_Resultado_Anterior'], trabajo])


datos_usuarios_df = pd.DataFrame(datos_usuarios, columns=['Cantidad_Dif_Negativas', 'Umbral', 'Prom_Resultado_Anterior', 'Trabajo'])

# Predecir la idoneidad de los usuarios utilizando el modelo entrenado
predicciones = model.predict(datos_usuarios_df)

usuarios_mas_idoneos = [usuarios[i] for i, prediccion in enumerate(predicciones) if prediccion == 1]


for usuario in predicciones:
    print(f"{usuario}")
