### Senati
![alt text](https://www.senati.edu.pe/sites/all/themes/senati_theme/img/logo.svg)

# Flujo de Trabajo Git para GitHub

### 1. Configuración Inicial (Única Vez)

```bash
ssh-keygen -t ed25519 -C "tu_correo@example.com"    #  Generar clave SSH (si es la primera vez)
Get-Service ssh-agent | Set-Service -StartupType Manual #  Iniciar agente SSH
ssh-agent                                             #  Asegurar que el agente SSH esté corriendo
ssh-add C:\Users\TU_USUARIO\.ssh\id_ed25519           #  Añadir clave SSH al agente

git config --global user.email "giovanirojascuela@gmail.com" #  Configurar email globalmente
git config --global user.name "Gio"                          #  Configurar nombre globalmente
```

---

### 2. Clonar Repositorio Existente

```bash
git clone git@github.com:giovanirojascuela/2025_5TO01.git    #  Clona el repositorio a tu máquina local
cd 2025_5TO01                                              #  Entra en la carpeta del proyecto
```

---

### 3. Crear y Cambiar a una Nueva Rama

```bash
git checkout -b nueva-rama-desarrollo  #  Crea una nueva rama y cámbiate a ella
git checkout nombre-de-rama-existente  #  Si la rama ya existe, solo cámbiate a ella
```

---

### 4. Ciclo de Desarrollo Básico (Trabajar y Enviar Cambios)

```bash
git status                                   #  Verifica el estado actual de tus archivos
git add .                                    #  Añade todos los cambios al área de staging
git commit -m "Descripción concisa de los cambios" #  Confirma los cambios con un mensaje claro
git push origin tu-rama-actual               #  Envía tus cambios a la rama remota
```

---

### 5. Sincronización de Ramas

#### 5.1. Actualizar tu Rama Local 'main' con la Rama Remota 'main'

Este flujo asegura que tu versión local de la rama principal (`main`) esté completamente al día con lo que hay en el servidor (GitHub).

```bash
git checkout main         #  Cambia a la rama principal (main)
git fetch origin          #  Descarga los últimos cambios de 'main' desde el remoto (sin fusionar automáticamente)
git merge origin/main     #  Fusiona los cambios descargados de 'origin/main' en tu rama local 'main'
#  Alternativa para actualizar y fusionar en un solo paso: git pull origin main
```

---

#### 5.2. Actualizar tu Rama de Trabajo ('gio') con la Rama Local 'main'

Este flujo te permite traer las últimas actualizaciones de la rama `main` (que ya has sincronizado localmente) a tu rama de desarrollo (`gio`), para evitar conflictos futuros y trabajar con la base de código más reciente.

```bash
git checkout gio          #  Asegúrate de estar en tu rama de trabajo (ej. 'gio')
git merge main            #  Fusiona los cambios de la rama local 'main' en tu rama actual ('gio')
#  Resuelve los conflictos si los hay (Git te guiará durante el proceso)
git push origin gio       #  Envía los cambios fusionados (y resueltos) a tu rama remota 'gio'
```

---

### 6. Deshacer Cambios

#### 6.1. Deshacer Cambios Locales No Añadidos (Unstaged)

```bash
git checkout -- nombre-del-archivo.txt #  Descarta cambios en un archivo específico
git reset --hard HEAD                  #  Descarta todos los cambios en el directorio de trabajo (¡con precaución!)
```

#### 6.2. Deshacer Cambios del Área de Staging (Unstage)

```bash
git reset HEAD nombre-del-archivo.txt  #  Mueve un archivo del staging de vuelta al área de trabajo
git reset HEAD .                       #  Mueve todos los archivos del staging de vuelta al área de trabajo
```

#### 6.3. Deshacer el Último Commit (Local)

```bash
git revert HEAD         #  Crea un nuevo commit que revierte los cambios del último (seguro si ya hiciste push)
git reset --soft HEAD~1 #  Deshace el último commit y mueve los cambios al staging (¡solo si NO has hecho push!)
git reset --hard HEAD~1 #  Deshace el último commit y descarta los cambios (¡solo si NO has hecho push y quieres perderlos!)
```

---

### 7. Borrar Archivos o Carpetas del Repositorio

```bash
git rm --cached nombre-del-archivo.txt #  Eliminar un archivo del control de versiones (lo mantiene localmente)
git rm nombre-del-archivo.txt          #  Eliminar un archivo del control de versiones y del disco local
git rm -r nombre-de-la-carpeta/        #  Eliminar una carpeta del control de versiones (recursivo)

git commit -m "Eliminado archivo/carpeta X" #  Después de usar 'git rm', recuerda hacer commit
git push origin tu-rama-actual              #  Y luego push para reflejar los cambios en el remoto
```

---

### 8. Ver Historial y Ramas

```bash
git log                            #  Muestra el historial de commits
git log --oneline --graph --all    #  Muestra un historial más conciso y gráfico de todas las ramas
git branch -av                     #  Muestra todas las ramas locales y remotas
```

---

### 9. Manejo de Tags (Etiquetas)

```bash
git tag v1.0.0                      #  Crear un tag ligero
git tag -a v1.0.0 -m "Versión 1.0.0 lista para producción" #  Crear un tag anotado (recomendado, con mensaje)

git tag                             #  Listar todos los tags locales
git push origin --tags              #  Enviar todos los tags locales al repositorio remoto

git tag -d v1.0.0                   #  Eliminar un tag local
git push origin :refs/tags/v1.0.0   #  Eliminar un tag remoto
```

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
