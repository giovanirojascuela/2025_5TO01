### Senati
![alt text](https://www.senati.edu.pe/sites/all/themes/senati_theme/img/logo.svg)

Flujo de Trabajo Git para GitHub (Markdown)
1. Configuración Inicial (Única Vez)
Bash

# Generar clave SSH (si es la primera vez)
ssh-keygen -t ed25519 -C "tu_correo@example.com"

# Iniciar agente SSH y añadir clave
Get-Service ssh-agent | Set-Service -StartupType Manual
ssh-agent
ssh-add C:\Users\TU_USUARIO\.ssh\id_ed25519

# Configurar usuario y email globalmente
git config --global user.email "giovanirojascuela@gmail.com"
git config --global user.name "Gio"
2. Clonar Repositorio Existente
Bash

# Clona el repositorio a tu máquina local
git clone git@github.com:giovanirojascuela/2025_5TO01.git

# Entra en la carpeta del proyecto
cd 2025_5TO01
3. Crear y Cambiar a una Nueva Rama
Bash

# Crea una nueva rama y cámbiate a ella
git checkout -b nueva-rama-desarrollo

# Si la rama ya existe y solo quieres cambiarte
git checkout nombre-de-rama-existente
4. Ciclo de Desarrollo Básico (Trabajar y Enviar Cambios)
Bash

# Verifica el estado de tus archivos
git status

# Añade todos los cambios al área de staging
git add .

# Confirma los cambios con un mensaje descriptivo
git commit -m "Descripción concisa de los cambios"

# Envía tus cambios a la rama remota
git push origin tu-rama-actual
5. Sincronización de Ramas
5.1. Actualizar tu Rama Local 'main' con la Rama Remota 'main'
Este flujo asegura que tu versión local de la rama principal (main) esté completamente al día con lo que hay en el servidor (GitHub).

Bash

# Cambia a la rama principal (main)
git checkout main

# Descarga los últimos cambios de 'main' desde el remoto (sin fusionar automáticamente)
git fetch origin

# Fusiona los cambios descargados de 'origin/main' en tu rama local 'main'
git merge origin/main

# Alternativa más directa para actualizar y fusionar
# git pull origin main
5.2. Actualizar tu Rama de Trabajo ('gio') con la Rama Local 'main'
Este flujo te permite traer las últimas actualizaciones de la rama main (que ya has sincronizado localmente) a tu rama de desarrollo (gio), para evitar conflictos futuros y trabajar con la base de código más reciente.

Bash

# Asegúrate de estar en tu rama de trabajo (por ejemplo, 'gio')
git checkout gio

# Fusiona los cambios de la rama local 'main' en tu rama actual ('gio')
git merge main

# Resuelve los conflictos si los hay (Git te guiará)

# Envía los cambios fusionados (y resueltos) a tu rama remota 'gio'
git push origin gio
6. Deshacer Cambios
Deshacer Cambios Locales No Añadidos (Unstaged)
Bash

# Descarta cambios en un archivo específico
git checkout -- nombre-del-archivo.txt

# Descarta todos los cambios en el directorio de trabajo (con precaución)
git reset --hard HEAD
Deshacer Cambios del Área de Staging (Unstage)
Bash

# Mueve un archivo del staging de vuelta al área de trabajo
git reset HEAD nombre-del-archivo.txt

# Mueve todos los archivos del staging de vuelta al área de trabajo
git reset HEAD .
Deshacer el Último Commit (Local)
Bash

# Crea un nuevo commit que revierte los cambios del último commit (seguro para commits ya enviados)
git revert HEAD

# Deshace el último commit y mueve los cambios al área de staging (solo si no has hecho push)
git reset --soft HEAD~1

# Deshace el último commit y descarta los cambios (solo si no has hecho push y quieres perder los cambios)
git reset --hard HEAD~1
7. Borrar Archivos o Carpetas del Repositorio
Bash

# Eliminar un archivo del control de versiones (lo mantiene localmente, pero lo remueve de Git)
git rm --cached nombre-del-archivo.txt

# Eliminar un archivo del control de versiones y del disco local
git rm nombre-del-archivo.txt

# Eliminar una carpeta del control de versiones
git rm -r nombre-de-la-carpeta/

# Después de usar 'git rm', recuerda hacer un commit y push
git commit -m "Eliminado archivo/carpeta X"
git push origin tu-rama-actual
8. Ver Historial y Ramas
Bash

# Muestra el historial de commits
git log

# Muestra un historial más conciso y gráfico
git log --oneline --graph --all

# Muestra todas las ramas locales y remotas
git branch -av
9. Manejo de Tags (Etiquetas)
Bash

# Crear un tag ligero
git tag v1.0.0

# Crear un tag anotado (recomendado)
git tag -a v1.0.0 -m "Versión 1.0.0 lista para producción"

# Listar todos los tags
git tag

# Enviar tags al repositorio remoto
git push origin --tags

# Eliminar un tag local
git tag -d v1.0.0

# Eliminar un tag remoto
git push origin :refs/tags/v1.0.0

=======
### Lista de Participantes
1. Jose Luis Mamani Choque 1314313
2. andres alanoca parizaca
3. Edson Juvenal Pilco Condori
4. Diethmar Emerson Velez Guimaraes 1517672
5. Alexandra Hancco Vargas
6. **Sandra Vanessa Mamani Chambi**
7. **Claudio Emerson Vilca Calcina**
8. Elver Mamani Quispe -el pedri 
9. Cristhian Cc. A.
10. saduc soncco quispe
11. Renato Fabrizio Gonzales Olazabal 1462350
