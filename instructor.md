
# Flujo de Trabajo Git para el Instructor

Este flujo es para ti, instructor, para fusionar eficientemente múltiples ramas de estudiantes a la rama `main` sin tener que cambiarse de rama constantemente.

### 1. Preparación del Instructor (en tu máquina)

Asegúrate de que tu repositorio local esté actualizado y que todas las ramas de los estudiantes estén disponibles.

```bash
# 1.1. Asegúrate de estar en la rama 'main' (donde fusionarás)
git checkout main #  Cambia a tu rama principal

# 1.2. Actualiza tu rama 'main' local con la remota para tener la base más reciente
git pull origin main #  Trae los últimos cambios de 'main' desde GitHub

# 1.3. Asegúrate de tener todas las ramas de los estudiantes disponibles localmente
git fetch --all #  Descarga toda la información de ramas y commits de todos los remotos
# Nota: 'git fetch --all' solo trae la información, no crea ramas locales.
# Para ver todas las ramas remotas disponibles: git branch -r
```

---

### 2. Fusión Masiva de Ramas de Estudiantes a 'main' (Método Eficiente)

Este método te permite fusionar una rama de estudiante a `main` desde la rama `main` misma, sin necesidad de hacer `checkout` a cada rama de estudiante.

```bash
# Asegúrate de estar en la rama 'main'
git checkout main

# Para CADA rama de estudiante que quieras fusionar:
# Ejemplo para estudiante 'gio':
git merge gio #  Fusiona la rama 'gio' (local) en la rama 'main' (actual)
# Repite este comando por cada rama de estudiante (ej. 'estudiante_2', 'estudiante_3', etc.)
# git merge estudiante_2
# git merge estudiante_3

# Si hay conflictos, Git te lo notificará. Deberás resolverlos manualmente.
# Después de resolver conflictos:
# git add .
# git commit -m "Resolución de conflictos y fusión de rama X"

# Una vez que todas las ramas deseadas estén fusionadas localmente en 'main'
git push origin main #  Sube los cambios fusionados a la rama 'main' en GitHub
```

**Consideraciones para el Instructor:**

* **Conflictos:** Si varios estudiantes trabajaron en las mismas líneas de código, habrá conflictos de fusión. Git te guiará para resolverlos. Este es el paso más manual.
* **Recomendación:** Considera hacer `git pull origin <nombre_rama_estudiante>` antes de `git merge <nombre_rama_estudiante>` si los estudiantes están haciendo `push` frecuentemente, para asegurarte de que tu rama local del estudiante esté actualizada antes de fusionarla a `main`. Sin embargo, `git fetch --all` ya te trae la información de los commits más recientes.
* **Automatización Avanzada:** Para proyectos con MUCHAS ramas y si tienes un proceso de CI/CD, podrías explorar scripts o herramientas que automaticen la creación de Pull Requests y su fusión, pero para un laboratorio, el `git merge <rama>` repetido suele ser el más directo.

---
