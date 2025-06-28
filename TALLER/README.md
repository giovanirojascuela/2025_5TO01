### Senati
![alt text](https://www.senati.edu.pe/sites/all/themes/senati_theme/img/logo.svg)

# Ejercicio Práctico: Previsión de Ventas de Café con TensorFlow Keras y Flask

## Objetivo

Desarrollar una solución completa en Python para predecir las ventas de café (totales y por tipo), utilizando técnicas de Machine Learning con TensorFlow Keras y disponibilizando esta predicción a través de una API RESTful desarrollada con Flask.

## Contexto

Una cafetería busca optimizar su stock y planificación de producción de café. Han recopilado datos históricos de ventas y necesitan un sistema que prediga las ventas futuras basándose en variables relevantes.

## Datos Proporcionados

Para este ejercicio, utilizarán los siguientes archivos de datos históricos de ventas:

* **`index_1.txt`**: Contiene datos de ventas de `2024-03-01` a `2025-03-22`. Columnas: `date`, `datetime`, `cash_type`, `card`, `money`, `coffee_name`.
* **`index_2.txt`**: Contiene datos de ventas de `2025-02-08` a `2025-03-22`. Columnas: `date`, `datetime`, `cash_type`, `money`, `coffee_name`.

**Consideraciones sobre los Datos:**
* Cada fila representa una transacción individual de una unidad de café. La columna `money` se considera el `precio_unitario` para esa unidad.
* Deberán combinar y pre-procesar ambos archivos.

## Tareas a Realizar

Los estudiantes deberán desarrollar una solución que contemple las siguientes etapas:

### 1. Análisis y Preparación de Datos

* Cargar y unir los datasets `index_1.txt` y `index_2.txt`.
* Realizar Análisis Exploratorio de Datos (EDA) utilizando visualizaciones para entender los patrones.
* **Ingeniería de Características:** Extraer mes, día de la semana, hora del `datetime`. Crear `cantidad_total_vendida_no_dia` (suma de `money` por día). Codificar variables categóricas (e.g., One-Hot Encoding).
* Dividir los datos en conjuntos de entrenamiento y prueba.

### 2. Modelado Predictivo (con TensorFlow Keras)

* Construir y entrenar un modelo de red neuronal (utilizando **TensorFlow Keras**) para prever la `cantidad_total_vendida_no_dia`.
* Construir y entrenar otro modelo (con **TensorFlow Keras**) para prever la `cantidad_vendida` por `coffee_name` (o un enfoque multi-output).
* Evaluar los modelos utilizando métricas de regresión (MAE, MSE, RMSE, R²).

### 3. Serialización del Modelo

* Guardar el/los modelo/s entrenado/s de Keras (en formato `.h5` o `SavedModel`) y los pre-procesadores (escaladores, codificadores de `scikit-learn`) utilizando `pickle` o `joblib`.

### 4. Desarrollo del Backend con Flask

* Crear una aplicación Flask.
* Cargar el/los modelo/s de Keras y los pre-procesadores al iniciar la aplicación.
* Exponer un endpoint POST (`/prever_vendas`) que reciba un JSON con las características de entrada para la predicción.

    * **Ejemplo de JSON de entrada (predicción total):**
        ```json
        {
            "date": "2025-04-01",
            "temperatura_media_c": 25.0,
            "feriado": 0,
            "promocion": 1,
            "evento_local": 0
        }
        ```
    * **Ejemplo de JSON de entrada (predicción por tipo de café):**
        ```json
        {
            "date": "2025-04-01",
            "temperatura_media_c": 25.0,
            "feriado": 0,
            "promocion": 1,
            "evento_local": 0,
            "coffee_name": "Latte"
        }
        ```
* Pre-procesar los datos de entrada en el endpoint usando los objetos guardados.
* Realizar las predicciones y devolverlas como respuesta JSON.
* Incluir un endpoint de "salud" (ej. `/`).

## Requisitos Técnicos

* **Ambiente Virtual:** Crear y activar un entorno virtual (`venv`) para el proyecto e instalar las dependencias ahí.
* **Lenguaje:** Python 3.x
* **Bibliotecas (recordatorio de complementos):**
    * `pandas` (para manipulación de datos)
    * `numpy` (para operaciones numéricas)
    * `tensorflow` y `keras` (para modelado de Deep Learning)
    * `scikit-learn` (para pre-procesamiento de datos, métricas y modelos base)
    * `matplotlib` y `seaborn` (para visualización de datos en EDA)
    * `Flask` (para el backend)
    * `joblib` o `pickle` (para serialización de pre-procesadores)
* **Estructura:** Código organizado en módulos.
* **Documentación:** `README.md` con instrucciones claras para configurar, entrenar y ejecutar.

## Criterios de Evaluación

* Calidad del Código.
* Análisis y Pre-procesamiento de Datos.
* Rendimiento y Selección del Modelo (especialmente el uso de Keras).
* Funcionalidad del Backend.
