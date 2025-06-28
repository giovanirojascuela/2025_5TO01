# Curso: Taller de Aplicación con Machine Learning

¡Bienvenidos al Taller de Aplicación con Machine Learning! Este repositorio contiene toda la información necesaria para las exposiciones sobre aplicaciones de algoritmos de Machine Learning.

---

## 1. Exposiciones de Aplicaciones de Machine Learning

### Objetivo de la Exposición

Cada estudiante (o grupo, si se organizan así) seleccionará un algoritmo de Machine Learning y presentará un caso de uso real donde dicho algoritmo es aplicado, destacando su funcionamiento, la lógica detrás del análisis de datos, el proceso de creación del modelo, y cómo este modelo se utilizaría en una aplicación real para resolver un problema específico.

**Duración Sugerida:** Aproximadamente 10-15 minutos por exposición.

### Pautas Detalladas para la Exposición

#### Paso 1: Selección del Algoritmo y Caso de Uso

* **Elijan un Algoritmo:** Puede ser cualquier algoritmo de ML visto en clase (Regresión, Clasificación, Clustering, Reducción de Dimensionalidad, o Redes Neuronales básicas con Keras).
* **Identifiquen un Caso de Uso Real:** Piensen en una aplicación práctica donde ese algoritmo sea fundamental y que les apasione.
* **Investiguen:** Profundicen en cómo el algoritmo se aplica en ese contexto, buscando ejemplos, datasets públicos, y posibles desafíos o consideraciones éticas.

#### Paso 2: Estructura Sugerida de la Exposición

1.  **Título de la Exposición y Presentador(es):**
    * Nombre del Algoritmo y su Aplicación Específica.
    * Nombres de los estudiantes.

2.  **Introducción al Problema:**
    * **Definición:** ¿Cuál es el problema que se busca resolver con Machine Learning?
    * **Importancia:** ¿Por qué este problema es relevante o impactante en el mundo real?
    * **Rol de ML:** ¿Cómo el Machine Learning puede aportar una solución o una mejora significativa?

3.  **Descripción del Dataset y Contexto del Análisis de Datos:**
    * **Fuente y Estructura:** Mencionen la fuente del dataset (ej., Kaggle) y describan brevemente su estructura (número de filas/columnas, tipo de datos).
    * **Contexto para el Análisis:** Expliquen el propósito de explorar este dataset para su problema.
        * **Preguntas Clave:** ¿Qué preguntas se harían al dataset para entender el problema? (Ej., ¿cuáles son las características más influyentes? ¿Cómo se distribuyen los datos? ¿Existen valores atípicos o faltantes?)
        * **Variables Clave:** Identifiquen las características (features) que usarían y la variable objetivo (target).
        * **Preparación Inicial:** Mencionen los pasos iniciales de pre-procesamiento que serían necesarios (ej., manejo de valores nulos, conversión de tipos de datos, etc.).

4.  **El Algoritmo: Concepto, Funcionamiento y Contexto del Modelo:**
    * **¿Qué es?:** Definición clara y concisa del algoritmo.
    * **¿Cómo funciona?:** Explicación intuitiva y conceptual (eviten fórmulas matemáticas complejas a menos que sean esenciales para la comprensión).
    * **Justificación:** ¿Por qué este algoritmo es el más adecuado para el problema y el tipo de datos que tienen?
    * **Arquitectura (si es Keras):** Si usan TensorFlow Keras, pueden describir la arquitectura básica de la red (número de capas, neuronas, funciones de activación).

5.  **Implementación y Pipeline Básico del Modelo:**
    * **Flujo General:** Describan los pasos generales del pipeline de Machine Learning que seguirían:
        * **Carga de Datos:** Con `pandas`.
        * **Pre-procesamiento Específico:** Detallen transformaciones clave (ej., escalado numérico con `scikit-learn`, codificación One-Hot de categóricas).
        * **División de Datos:** Cómo se dividirían los datos en conjuntos de entrenamiento y prueba/validación.
        * **Construcción/Entrenamiento:** Breve descripción de cómo se instancia y entrena el modelo (ej., `model.fit()` en Keras o `model.train()` en scikit-learn). Mencionen consideraciones como `epochs` y `batch_size` si usan Keras.
    * **Fragmentos de Código (Opcional pero recomendado):** Mostrar pequeños y cruciales fragmentos de código Python que ilustren los pasos principales (NO el código completo).

6.  **Resultados, Métricas de Evaluación y Uso en la Aplicación:**
    * **Evaluación del Modelo:**
        * **Métricas Relevantes:** ¿Cómo se evaluaría el rendimiento del modelo en este problema? Mencionen la(s) métrica(s) adecuada(s) (ej., Accuracy, Precision, Recall, F1-score para clasificación; MAE, RMSE, R² para regresión).
        * **Resultados Esperados:** Presenten resultados esperados o simulados, destacando qué indicarían esos valores sobre la eficacia del modelo.
    * **Uso en la Aplicación Real:**
        * **Generación de Predicciones:** ¿Cómo se usaría el modelo entrenado para hacer predicciones sobre nuevos datos no vistos?
        * **Impacto y Valor:** Expliquen cómo estas predicciones generarían valor o resolverían el problema inicial. Por ejemplo, ¿ayudaría a tomar mejores decisiones, a automatizar procesos, o a optimizar recursos?
        * **Ejemplo Práctico:** Si es posible, den un ejemplo concreto de una predicción del modelo y cómo se interpretaría en el contexto de su aplicación.

7.  **Conclusiones y Futuras Direcciones:**
    * **Resumen:** Recapitulación de la importancia del algoritmo para el problema.
    * **Ventajas y Desventajas:** Discutan las principales ventajas y limitaciones del algoritmo elegido en el contexto de su aplicación.
    * **Mejoras Futuras:** Sugieran posibles mejoras, extensiones o investigaciones futuras para el proyecto.

8.  **Preguntas y Respuestas (Q&A).**

#### Paso 3: Consejos Clave para una Exposición Exitosa

* **Claridad y Simplicidad:** Expliquen los conceptos de forma que la audiencia (sus compañeros y el profesor) pueda entenderlos fácilmente. Eviten la jerga excesiva o explíquenla.
* **Visualizaciones:** Utilicen gráficos (de datos, de resultados, conceptuales) para hacer la exposición más atractiva y fácil de comprender. `matplotlib` y `seaborn` son excelentes para esto.
* **No Lean Diapositivas:** Las diapositivas son un apoyo visual. Hablen sobre el contenido, no lo lean textualmente.
* **Practiquen:** Ensaya la exposición varias veces para controlar el tiempo y sentirse seguros con el contenido.
* **Enfoque en la Aplicación:** Aunque expliquen el algoritmo, el hilo conductor debe ser siempre cómo resuelve el problema real que identificaron.
* **Opcional (Punto Extra):** Si tienen tiempo y la infraestructura lo permite, una pequeña demostración en vivo de un modelo entrenado haciendo una predicción puede ser muy impactante.

### Criterios de Evaluación para las Exposiciones

La exposición será evaluada en base a:

* **Claridad y Comprensión (25%):** ¿Se explica el concepto y la aplicación de forma clara y fácil de entender para una audiencia no experta?
* **Profundidad Técnica y Contexto (30%):** ¿Se abordan correctamente el algoritmo, el análisis de datos, la creación del modelo y las métricas de evaluación? ¿Se demuestra una comprensión sólida del "por qué" detrás de cada paso?
* **Relevancia y Uso en la Aplicación (25%):** ¿La aplicación elegida demuestra una comprensión real del problema y cómo el ML no solo lo resuelve, sino que genera valor o impacto?
* **Organización y Flujo (10%):** ¿La presentación sigue una estructura lógica y el tiempo se gestiona adecuadamente?
* **Habilidades de Presentación (10%):** ¿Se proyecta confianza, se interactúa con la audiencia y se usan las diapositivas de manera efectiva?

---

## 2. Temas de Exposición Sugeridos con Datasets y Enlaces

A continuación, se presentan 21 temas diferentes. Cada estudiante deberá seleccionar uno de ellos para su exposición. Para cada tema, se incluye un contexto específico sobre el análisis de datos, la creación del modelo y cómo se aplicaría en una situación práctica.

1.  **Regresión Lineal Simple: Predicción del precio de la vivienda.**
    * **Dataset:** [House Prices - Advanced Regression Techniques (Kaggle)](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques)
    * **Contexto de Análisis de Datos:** Explorar la relación entre variables como el área habitable, número de habitaciones, ubicación y el precio. Identificar características influyentes y posibles correlaciones.
    * **Creación del Modelo:** Entrenar un modelo de regresión lineal para aprender la relación entre las características de la vivienda y su precio. Se pueden considerar transformaciones simples a las características si la relación no es lineal.
    * **Uso en la Aplicación:** Predecir el precio de mercado de nuevas propiedades, lo que puede ser útil para compradores, vendedores o agentes inmobiliarios para valoraciones rápidas y justas.

2.  **Regresión Logística: Predicción de abandono de clientes (Churn) en una empresa de telecomunicaciones.**
    * **Dataset:** [Telco Customer Churn (Kaggle)](https://www.kaggle.com/datasets/blastchar/telco-customer-churn)
    * **Contexto de Análisis de Datos:** Analizar el comportamiento del cliente, servicios contratados, facturación, y otros atributos demográficos para identificar patrones que lleven al abandono. Examinar la proporción de "churners" y "no-churners".
    * **Creación del Modelo:** Entrenar un modelo de regresión logística para clasificar si un cliente es propenso a abandonar la empresa. Esto implica predecir una probabilidad binaria (sí/no churn).
    * **Uso en la Aplicación:** Identificar proactivamente a los clientes en riesgo de abandono para que la empresa pueda ofrecerles promociones o mejoras de servicio y así retenerlos.

3.  **Árboles de Decisión (Clasificación): Diagnóstico de enfermedades (ej., diabetes).**
    * **Dataset:** [Diabetes Prediction Dataset (Kaggle)](https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset/data)
    * **Contexto de Análisis de Datos:** Examinar factores como la glucosa, presión arterial, IMC, edad, etc., para encontrar umbrales y combinaciones de características que indiquen la presencia de la enfermedad. Visualizar la distribución de estas características.
    * **Creación del Modelo:** Entrenar un árbol de decisión que aprenda reglas claras para clasificar a los pacientes como diabéticos o no diabéticos. La naturaleza del árbol permite entender qué factores son más importantes en el diagnóstico.
    * **Uso en la Aplicación:** Ayudar a los profesionales de la salud a identificar a pacientes de alto riesgo para pruebas adicionales o tratamientos preventivos. La interpretabilidad del árbol es clave aquí.

4.  **Árboles de Decisión (Regresión): Predicción de la demanda diaria de un producto específico en un supermercado.**
    * **Dataset:** [Store Sales Forecasting Dataset (Kaggle)](https://www.kaggle.com/datasets/tanayatipre/store-sales-forecasting-dataset)
    * **Contexto de Análisis de Datos:** Investigar la relación entre la fecha, día de la semana, promociones, festivos y la cantidad de producto vendido. Buscar patrones estacionales o tendencias.
    * **Creación del Modelo:** Entrenar un árbol de decisión para predecir la cantidad numérica de unidades que se venderán de un producto en un día dado.
    * **Uso en la Aplicación:** Optimizar el inventario del supermercado, reducir el desperdicio de productos perecederos y asegurar que haya suficiente stock para satisfacer la demanda de los clientes.

5.  **Random Forest (Clasificación): Detección de fraude en transacciones con tarjeta de crédito.**
    * **Dataset:** [Credit Card Fraud Detection (Kaggle)](https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud)
    * **Contexto de Análisis de Datos:** Los datos suelen estar desequilibrados (pocas transacciones fraudulentas). El análisis se enfocaría en las características que diferencian las transacciones fraudulentas de las legítimas, a menudo transformadas por privacidad.
    * **Creación del Modelo:** Entrenar un Random Forest para identificar transacciones fraudulentas. La fortaleza del Random Forest reside en su capacidad para manejar datos desequilibrados y encontrar patrones complejos.
    * **Uso en la Aplicación:** En sistemas de seguridad bancaria, el modelo alertaría sobre transacciones sospechosas en tiempo real, permitiendo a los bancos bloquearlas o contactar al cliente para verificación, minimizando pérdidas financieras.

6.  **Random Forest (Regresión): Previsión del consumo de energía en edificios.**
    * **Dataset:** [Energy Consumption Prediction (Kaggle)](https://www.kaggle.com/datasets/itsrohithere/energy-consumption-prediction)
    * **Contexto de Análisis de Datos:** Explorar cómo variables como la temperatura exterior, la hora del día, el tipo de edificio y el número de ocupantes afectan el consumo de energía. Identificar picos y valles de consumo.
    * **Creación del Modelo:** Entrenar un Random Forest para predecir la cantidad numérica de energía consumida.
    * **Uso en la Aplicación:** Ayudar a los administradores de edificios a optimizar el uso de HVAC (calefacción, ventilación y aire acondicionado), reducir costos energéticos y planificar mantenimientos preventivos.

7.  **Support Vector Machine (SVM) - Clasificación: Clasificación de correos electrónicos como "spam" o "no spam".**
    * **Dataset:** [Spam Detection Dataset (Kaggle)](https://www.kaggle.com/datasets/smayanj/spam-detection-dataset)
    * **Contexto de Análisis de Datos:** Pre-procesar el texto de los correos para extraer características (ej., frecuencia de palabras, longitud del correo, uso de mayúsculas). Analizar qué palabras o patrones son más comunes en correos spam.
    * **Creación del Modelo:** Entrenar un SVM que encuentre el "hiperplano óptimo" para separar correos legítimos de spam. Los SVM son efectivos en espacios de alta dimensión (como los generados por el texto).
    * **Uso en la Aplicación:** Integrar el modelo en un filtro de correo electrónico para clasificar automáticamente los mensajes entrantes, mejorando la experiencia del usuario al reducir el spam en su bandeja de entrada.

8.  **K-Nearest Neighbors (KNN) - Clasificación: Reconocimiento de dígitos escritos a mano.**
    * **Dataset:** [MNIST Dataset (Kaggle)](https://www.kaggle.com/datasets/hojjatk/mnist-dataset)
    * **Contexto de Análisis de Datos:** Las imágenes son pequeñas (28x28 píxeles), cada píxel es una característica. El análisis se centra en cómo las diferencias en los patrones de píxeles (distancia entre imágenes) se correlacionan con la identidad del dígito.
    * **Creación del Modelo:** Implementar un clasificador KNN donde un nuevo dígito se clasifica basándose en los dígitos más "cercanos" en el conjunto de entrenamiento.
    * **Uso en la Aplicación:** Sistemas de reconocimiento óptico de caracteres (OCR) para digitalizar documentos, automatizar el procesamiento de formularios o incluso en interfaces de usuario que aceptan entrada de escritura a mano.

9.  **K-Means Clustering: Segmentación de clientes para personalizar campañas de marketing.**
    * **Dataset:** [Customer Segmentation Data (Kaggle)](https://www.kaggle.com/datasets/ravalsmit/customer-segmentation-data)
    * **Contexto de Análisis de Datos:** Analizar características como la edad, ingresos, comportamiento de compra, historial de productos vistos, etc., para encontrar grupos naturales de clientes sin etiquetas predefinidas.
    * **Creación del Modelo:** Aplicar K-Means para agrupar a los clientes en 'k' segmentos distintos. La tarea principal es determinar un número óptimo de clústeres.
    * **Uso en la Aplicación:** Permitir a las empresas diseñar estrategias de marketing más efectivas y personalizadas para cada segmento de clientes, mejorando la retención y las ventas al dirigirse a las necesidades específicas de cada grupo.

10. **Naive Bayes: Análisis de sentimiento en reseñas de películas o tweets.**
    * **Dataset:** [Movie Reviews Dataset with Sentiment Labels (Kaggle)](https://www.kaggle.com/datasets/thedevastator/movie-reviews-dataset-with-sentiment-labels)
    * **Contexto de Análisis de Datos:** Pre-procesar el texto (tokenización, eliminación de stopwords) y extraer características basadas en la frecuencia de las palabras. El análisis busca qué palabras son más indicativas de un sentimiento positivo o negativo.
    * **Creación del Modelo:** Entrenar un clasificador Naive Bayes (a menudo Multinomial Naive Bayes para texto) que asume independencia entre las palabras para predecir el sentimiento de una reseña.
    * **Uso en la Aplicación:** Monitorear la opinión pública sobre productos o servicios, analizar el feedback de clientes a gran escala, o clasificar reseñas de películas para sistemas de recomendación.

11. **Principal Component Analysis (PCA): Reducción de dimensionalidad para visualizar datos de cáncer.**
    * **Dataset:** [Breast Cancer Dataset [Wisconsin Diagnostic UCI] (Kaggle)](https://www.kaggle.com/datasets/abhinavmangalore/breast-cancer-dataset-wisconsin-diagnostic-uci)
    * **Contexto de Análisis de Datos:** El dataset tiene muchas características. El análisis se enfoca en cómo estas características se combinan para explicar la mayor varianza en los datos y cómo se pueden reducir a 2 o 3 componentes para visualización.
    * **Creación del Modelo:** Aplicar PCA para transformar el dataset de alta dimensión a un espacio de menor dimensión (ej., 2 o 3 componentes principales) que capture la mayor parte de la información.
    * **Uso en la Aplicación:** Facilitar la visualización de datos complejos en medicina para identificar patrones o la separación entre tipos de células (malignas/benignas), ayudando en la comprensión de los datos y como pre-procesamiento para otros modelos.

12. **TensorFlow Keras (Red Neuronal Densa - Clasificación): Clasificación de imágenes básicas (ej., ropa).**
    * **Dataset:** [Fashion MNIST (Kaggle Competitions)](https://www.kaggle.com/competitions/uw-ee596-cv)
    * **Contexto de Análisis de Datos:** Las imágenes son datos de píxeles. El análisis implica entender cómo la red neuronal "aprende" los patrones visuales para distinguir entre diferentes artículos de ropa. Visualizar algunas imágenes y sus etiquetas.
    * **Creación del Modelo:** Construir y entrenar una Red Neuronal Densa (ANN) con TensorFlow Keras. Definir la arquitectura (capas de entrada, ocultas, salida), funciones de activación y optimizador.
    * **Uso en la Aplicación:** Clasificación automática de imágenes en catálogos de moda, sistemas de inventario o incluso en aplicaciones de compra donde los usuarios pueden buscar artículos tomando una foto.

13. **TensorFlow Keras (Red Neuronal Densa - Regresión): Predicción del salario de un empleado basado en años de experiencia y nivel educativo.**
    * **Dataset:** [Employee Salary Prediction (Kaggle)](https://www.kaggle.com/datasets/dipkorimon/employee-salary-prediction)
    * **Contexto de Análisis de Datos:** Explorar la relación entre variables como la experiencia laboral, el nivel de educación, el puesto y el salario. Visualizar tendencias y distribuciones.
    * **Creación del Modelo:** Construir y entrenar una Red Neuronal Densa (ANN) con TensorFlow Keras para predecir un valor numérico (el salario).
    * **Uso en la Aplicación:** Ayudar a las empresas a establecer rangos salariales justos, a los profesionales de RRHH a negociar ofertas de empleo o a los individuos a entender su potencial de ingresos en el mercado laboral.

14. **XGBoost (Clasificación): Predicción de la rotación (fuga) de empleados en una empresa.**
    * **Dataset:** [Employee Attrition Classification Dataset (Kaggle)](https://www.kaggle.com/datasets/stealthtechnologies/employee-attrition-dataset)
    * **Contexto de Análisis de Datos:** Investigar factores como la satisfacción laboral, el desempeño, las horas extra, el salario y la distancia al trabajo para entender por qué los empleados abandonan la empresa.
    * **Creación del Modelo:** Entrenar un modelo XGBoost, que es conocido por su alta precisión y capacidad para manejar características complejas, para clasificar si un empleado es propenso a la rotación.
    * **Uso en la Aplicación:** Permitir a las empresas identificar a los empleados en riesgo de irse y tomar medidas proactivas para retener el talento valioso, como ofrecer programas de desarrollo, mejoras salariales o cambios de rol.

15. **XGBoost (Regresión): Predicción de la calidad del aire (ej., niveles de PM2.5) en una ciudad.**
    * **Dataset:** [Air Quality and Pollution Assessment (Kaggle)](https://www.kaggle.com/datasets/mujtabamatin/air-quality-and-pollution-assessment)
    * **Contexto de Análisis de Datos:** Analizar cómo variables meteorológicas (temperatura, humedad, velocidad del viento), hora del día y día de la semana afectan los niveles de contaminantes. Identificar patrones estacionales o diarios.
    * **Creación del Modelo:** Entrenar un modelo XGBoost para predecir los niveles numéricos de contaminantes atmosféricos.
    * **Uso en la Aplicación:** Desarrollar sistemas de alerta temprana de mala calidad del aire para las autoridades y el público, ayudando a proteger la salud pública y a implementar medidas de control de la contaminación.

16. **DBSCAN (Clustering): Detección de anomalías o intrusiones en registros de seguridad de red.**
    * **Dataset:** [Network Intrusion Detection (Kaggle)](https://www.kaggle.com/datasets/amankumar255/network-intrusion-detection)
    * **Contexto de Análisis de Datos:** Analizar las características de las conexiones de red (duración, bytes, protocolos, etc.) para identificar comportamientos que se desvían de lo "normal" y no forman clústeres densos.
    * **Creación del Modelo:** Aplicar DBSCAN para identificar clústeres densos de conexiones normales. Los puntos que no pertenecen a ningún clúster denso se considerarán anomalías o intrusiones.
    * **Uso en la Aplicación:** Monitorear redes informáticas para detectar actividades sospechosas o ataques cibernéticos en tiempo real, mejorando la seguridad y permitiendo una respuesta rápida ante amenazas.

17. **Regresión Polinomial: Modelado de la relación entre la dosis de un fármaco y su efecto en el cuerpo.**
    * **Dataset:** [Drug-Drug Interactions (Kaggle)](https://www.kaggle.com/datasets/mghobashy/drug-drug-interactions)
    * **Contexto de Análisis de Datos:** Si bien este dataset es sobre interacciones, se puede adaptar el concepto para simular una relación dosis-respuesta. El análisis se centraría en cómo el efecto (una variable numérica) cambia de forma no lineal con el aumento de la dosis.
    * **Creación del Modelo:** Entrenar un modelo de regresión polinomial para capturar la curvatura en la relación entre la dosis y la respuesta observada.
    * **Uso en la Aplicación:** En farmacología, para modelar y predecir el efecto de un medicamento a diferentes dosis, ayudando a determinar la dosis óptima y segura para pacientes.

18. **Agrupamiento Jerárquico: Agrupación de documentos o artículos de noticias por temas similares.**
    * **Dataset:** [News Category Dataset (Kaggle)](https://www.kaggle.com/datasets/rmisra/news-category-dataset)
    * **Contexto de Análisis de Datos:** Pre-procesar el texto de los artículos (limpieza, tokenización, vectorización como TF-IDF). El análisis busca la similitud semántica entre los documentos para agruparlos en jerarquías de temas.
    * **Creación del Modelo:** Aplicar el agrupamiento jerárquico para construir un dendrograma que muestre cómo los artículos se agrupan en clusters de temas, desde los más específicos a los más generales.
    * **Uso en la Aplicación:** Organizar grandes volúmenes de información, como archivos de noticias o documentos legales, en categorías significativas para facilitar la búsqueda, el resumen y la navegación.

19. **Autoencoders (con Keras): Detección de anomalías en transacciones financieras o datos de sensores.**
    * **Dataset:** [Anomaly Detection with Unsupervised Learning (Kaggle)](https://www.kaggle.com/code/jiedong00/anomaly-detection-with-unsupervised-learning)
    * **Contexto de Análisis de Datos:** Los autoencoders son excelentes para datos donde las anomalías son raras. El análisis se centra en aprender la representación comprimida de los datos "normales".
    * **Creación del Modelo:** Construir y entrenar un Autoencoder con TensorFlow Keras. El modelo intentará reconstruir sus propias entradas. Las anomalías tendrán un "error de reconstrucción" mucho mayor.
    * **Uso en la Aplicación:** Identificar transacciones bancarias fraudulentas, fallos en equipos industriales (a través de datos de sensores) o patrones inusuales en cualquier tipo de datos donde las anomalías sean raras pero significativas.

20. **Algoritmos de Asociación (Apriori/FP-Growth): Análisis de Cestas de Compra para identificar productos que se compran juntos frecuentemente.**
    * **Dataset:** [Market Basket Analysis (Kaggle)](https://www.kaggle.com/code/krishnaprasad2608/market-basket-analysis)
    * **Contexto de Análisis de Datos:** Analizar las transacciones individuales para identificar qué combinaciones de productos aparecen juntas con mayor frecuencia, buscando reglas como "si el cliente compra A, también compra B".
    * **Creación del Modelo:** Implementar algoritmos como Apriori o FP-Growth para descubrir reglas de asociación, con métricas como soporte, confianza y lift.
    * **Uso en la Aplicación:** Sugerir colocación de productos en tiendas, crear ofertas de paquetes ("compra X y Y"), o desarrollar sistemas de recomendación de "clientes que compraron esto, también compraron aquello" en e-commerce.

21. **Series Temporales (Modelo ARIMA simple o Keras con LSTM básico): Predicción del precio de una criptomoneda o acción.**
    * **Dataset:** [Bitcoin Historical Data (Kaggle)](https://www.kaggle.com/datasets/swaptr/bitcoin-historical-data)
    * **Contexto de Análisis de Datos:** Analizar la tendencia, estacionalidad y autocorrelación en los precios históricos. Identificar patrones a lo largo del tiempo que puedan indicar movimientos futuros del precio.
    * **Creación del Modelo:** Entrenar un modelo de series temporales (ej., ARIMA o una red LSTM simple con Keras) para predecir el precio futuro de la criptomoneda/acción basándose en su historial.
    * **Uso en la Aplicación:** Informar decisiones de inversión (aunque con la advertencia de que los mercados son volátiles y las predicciones no son garantías), análisis de riesgos o desarrollo de estrategias de trading automatizado.

---
